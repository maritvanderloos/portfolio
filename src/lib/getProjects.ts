import fs from 'fs';
import type { ImageMetadata } from 'astro';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface ProjectData {
  slug: string;             // The folder name
  title: string;            // We’ll use folder name as title
  descriptionHtml: string;  // Contents from description.md
  cover: () => Promise<ImageMetadata>;            // Path to the cover image
  images: (() => Promise<ImageMetadata>)[];         // Array of other images
  year: string;
}

const projectsDir = path.join(process.cwd(), 'src', 'projects');
const allImages = import.meta.glob<{ default: ImageMetadata }>(`/src/projects/**/**.*{jpg,jpeg,png,gif,webp}`);

export function getProjects(): ProjectData[] {
  console.debug('Getting projects');
  console.debug(">> Found a total of", Object.keys(allImages).length, "images");
  // Read all items (subfolders) inside `projects/`
  const directories = fs.readdirSync(projectsDir, { withFileTypes: true })
    // Keep only directories
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return directories.map((dir: string) => {
    const projectPath = path.join(projectsDir, dir);

    const projectKeyPrefix = `/src/projects/${dir}`;
    const coverKey = `${projectKeyPrefix}/cover`;
    const coverEntry = Object.entries(allImages).find(([key, value]) => key.includes(coverKey));
    if (!coverEntry) {
      console.error("Cover image not found for", dir);
      throw new Error("Cover image not found for " + dir);
    }
    const cover = coverEntry![1];
    const descriptionPath = path.join(projectPath, 'description.md');
    const descriptionMarkdown = fs.readFileSync(descriptionPath, 'utf-8');

    const matterResult = matter(descriptionMarkdown);
    const { data, content } = matterResult;
    const images = Object.entries(allImages).filter(([key, value]) => key.includes(projectKeyPrefix)).map(([key, value]) => value);

    return {
      slug: dir,
      title: data.title,
      year: data.year,
      description: content,
      descriptionHtml: marked.parse(content),
      cover,
      images,
    };
  });
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return getProjects().find((project) => project.slug === slug);
}
