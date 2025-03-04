// import fs from 'fs';
// import Bun from 'bun';
import type { ImageMetadata } from 'astro';
// import path from 'path';
// import matter from 'gray-matter';
import { marked } from 'marked';

export interface CategoryData {
  slug: string;
  title: string;
}

interface ProjectDataFrontmatter {
  title: string;
  year: string;
}

export type ProjectData = {
  slug: string;             // The folder name
  descriptionHtml: string;  // Contents from description.md
  covers: (() => Promise<{ default: ImageMetadata }>)[];            // Path to the cover image
  images: (() => Promise<{ default: ImageMetadata }>)[];         // Array of other images
  category: CategoryData;
} & ProjectDataFrontmatter;

// const projectsDir = path.join(process.cwd(), 'src', 'projects');
const allImages = import.meta.glob<{ default: ImageMetadata }>(`/src/projects/**/**.*{jpg,jpeg,png,gif,webp,JPG,JPEG}`);
const allProjects = import.meta.glob(`/src/projects/**/description.md`);
const allCategories = import.meta.glob(`/src/projects/**/category.md`);


export const categoryData = (await Promise.all(Object.entries(allCategories).map(async ([key, value]) => {
  const data = (await value()) as { frontmatter: { title: string, order: number } };
  const slug = key.split('/').slice(-2, -1)[0];
  console.debug("Category", data.frontmatter);
  return {
    slug,
    title: data.frontmatter.title,
    order: data.frontmatter.order ?? 0,
  };
}))).sort((a, b) => a.order - b.order);

console.debug("All projects");
export const projectData: Promise<ProjectData[]> = (Promise.all(Object.entries(allProjects).map(async ([key, value]) => {
  const data = (await value()) as { frontmatter: ProjectDataFrontmatter, rawContent: () => string };
  // console.debug("> >", data.rawContent().trim());
  const categorySlug = key.split('/').slice(-3, -2)[0];
  const slug = key.split('/').slice(-2, -1)[0];
  console.debug("Project", data.frontmatter);

  const projectKeyPrefix = `/src/projects/${categorySlug}/${slug}`;

  const images = Object.entries(allImages).filter(([key, value]) => key.includes(projectKeyPrefix)).map(([key, value]) => value);
  const covers = Object.entries(allImages).filter(([key, value]) => key.includes(`${projectKeyPrefix}/cover`) || key.includes(`${projectKeyPrefix}/_cover`)).map(([key, value]) => value);
  return {
    slug,
    title: data.frontmatter.title,
    year: data.frontmatter.year,
    order: data.frontmatter.order ?? 99999,
    category: categoryData.find((category) => category.slug === categorySlug)!,
    descriptionHtml: await marked.parse(data.rawContent().replaceAll("", "").trim()),
    images,
    covers,
  };
}))).then(p => p.sort((a, b) => a.order-b.order));

console.debug("Category data", categoryData);
console.debug("Project data", projectData);
// console.debug("All projects", allProjects);
// console.debug("All categories", allCategories);

export async function getProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  return (await projectData).find((project) => project.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categoryData.find((category) => category.slug === slug);
}

export async function getProjectsByCategory(categorySlug: string): Promise<ProjectData[]> {
  console.log('gettingproject by slug', categorySlug)
  return (await projectData).filter((project) => project.category.slug === categorySlug);
}

console.debug("All projects", projectData);