import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface ProjectData {
  slug: string;             // The folder name
  title: string;            // We’ll use folder name as title
  descriptionHtml: string;  // Contents from description.md
  cover: string;            // Path to the cover image
  images: string[];         // Array of other images
}

// Adjust if your 'projects' folder is located elsewhere
const projectsDir = path.join(process.cwd(), 'projects');

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
      ? path.join('/projects', dir, possibleCoverNames[0])
      : '/placeholder-cover.jpg';  // fallback if no cover is found

    // 2. Read and parse `description.md`
    const descriptionPath = path.join(projectPath, 'description.md');
    const descriptionMarkdown = fs.readFileSync(descriptionPath, 'utf-8');
    const descriptionHtml = marked.parse(descriptionMarkdown);

    // 3. Gather all images that aren’t `cover.*` or `description.md`
    const images = fs.readdirSync(projectPath)
      .filter((file) =>
        file !== 'description.md' &&
        !file.startsWith('cover.')
      )
      .map((file) => path.join('/projects', dir, file));

    return {
      slug: dir,
      title: dir,
      descriptionHtml,
      cover: coverFile,
      images
    };
  });
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return getProjects().find((project) => project.slug === slug);
}
