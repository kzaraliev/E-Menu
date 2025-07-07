import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Ако posts папката не съществува, създай я
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  // Вземи имената на файловете под /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Премахни ".md" от името на файла за да получиш id
      const id = fileName.replace(/\.md$/, '');

      // Прочети markdown файла като string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Използвай gray-matter за да парсираш post metadata секцията
      const matterResult = matter(fileContents);

      // Комбинирай данните с id
      return {
        id,
        fileName,
        ...matterResult.data,
        content: matterResult.content,
      };
    });

  // Сортирай постовете по дата
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Използвай gray-matter за да парсираш post metadata секцията
  const matterResult = matter(fileContents);

  // Използвай remark за да конвертираш markdown към HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Комбинирай данните с id и contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function generateBlogSitemap() {
  const posts = getSortedPostsData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  return posts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
} 