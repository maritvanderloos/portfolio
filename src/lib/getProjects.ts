import fs from 'fs';
import type { ImageMetadata } from 'astro';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface ProjectData {
  slug: string;             // The folder name
  title: string;            // We’ll use folder name as title
  descriptionHtml: string;  // Contents from description.md
  cover: string;            // Path to the cover image
  images: string[];         // Array of other images
  year: string;
}

const projectsDir = path.join(process.cwd(), 'src', 'projects');

export function getProjects(): ProjectData[] {
  console.debug('Getting projects');
  // Read all items (subfolders) inside `projects/`
  const directories = fs.readdirSync(projectsDir, { withFileTypes: true })
    // Keep only directories
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return directories.map((dir) => {
    const projectPath = path.join(projectsDir, dir);

    // 1. Find cover image (assumes cover is named `cover.jpg` or `cover.png`, etc.)
    //    You could also handle multiple extensions if you like.
    const possibleCoverNames = fs.readdirSync(projectPath)
      .filter((file) => file.startsWith('cover.'));
    const coverFile = possibleCoverNames.length
      ? path.join(import.meta.env.BASE_URL, 'projects', dir, possibleCoverNames[0])
      : '/placeholder-cover.jpg';  // fallback if no cover is found
    // const coverFile = path.join(projectPath, 'cover.jpg');
    // console.debug("Cover file is", coverFile, import.meta.glob(coverFile));
    // const projectPath = path.join(projectPath, '**/*.{jpg,jpeg,png,gif,webp}');
    // const _images = import.meta.glob<{default: ImageMetadata}>(path.join(projectPath, '/*.{jpg,jpeg,png,gif,webp}'));
    // console.debug("Images are", _images);
    // import(coverFile).then((image) => {
    //   console.debug("Image is", image);
    // });


    // 2. Read and parse `description.md`
    const descriptionPath = path.join(projectPath, 'description.md');
    const descriptionMarkdown = fs.readFileSync(descriptionPath, 'utf-8');
    // const descriptionHtml = marked.parse(descriptionMarkdown);

    const matterResult = matter(descriptionMarkdown);
    const { data, content } = matterResult;
    // console.debug("Data is", data, "and content is", content);

    // 3. Gather all images that aren’t `cover.*` or `description.md`
    const images = fs.readdirSync(projectPath)
      .filter((file) =>
        file !== 'description.md' &&
        !file.startsWith('cover.')
      )
      .map((file) => path.join(import.meta.env.BASE_URL, 'projects', dir, file));

    // console.debug("Images are", images);

    return {
      slug: dir,
      title: data.title,
      year: data.year,
      description: content,
      descriptionHtml: marked.parse(content),
      // cover: coverFile,
      // images,
    };
  });
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return getProjects().find((project) => project.slug === slug);
}
