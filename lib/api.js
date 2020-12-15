import fs from 'fs';
import remark from 'remark';
import * as matter from 'gray-matter';
import { join, extname } from 'path';
import html from 'remark-html';

const CONTENT_DIR = join(process.cwd(), '_content');

export async function getPageContent(pagePath) {
  const markdown = fs.readFileSync(join(CONTENT_DIR, pagePath));
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function getArticleContent(route, filename) {
  const markdown = fs.readFileSync(
    join(CONTENT_DIR, route.articles, filename + '.md')
  );
  const { content, data } = matter(markdown);

  const result = await remark().use(html).process(content);
  return { content: result.toString(), data };
}

function getMetaData(route, filename) {
  const buf = fs.readFileSync(
    join(CONTENT_DIR, route.articles, filename + '.md')
  );
  return matter(buf).data;
}

export function getAllArticles(route) {
  const files = fs
    .readdirSync(join(CONTENT_DIR, route.articles))
    .filter((p) => extname(p) === '.md')
    .map((p) => {
      const data = getMetaData(route, p.replace(/.md$/, ''));
      return {
        date: data.date.toJSON(),
        title: data.title || p.replace(/.md$/, ''),
        href: route.href + '/' + p.replace(/.md$/, ''),
      };
    });
  return files;
}
