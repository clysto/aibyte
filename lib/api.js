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

export function getAllArticles(route, start, end) {
  start = start || 0;
  end = end || Infinity;
  const pageSize = route.pageSize;
  const files = fs
    .readdirSync(join(CONTENT_DIR, route.articles))
    .filter((p, index) => extname(p) === '.md' && index >= start && index < end)
    .map((p, index) => {
      index = start + index;
      const data = getMetaData(route, p.replace(/.md$/, ''));
      const info = {
        date: data.date.toJSON(),
        title: data.title || p.replace(/.md$/, ''),
        href: route.href + '/' + p.replace(/.md$/, ''),
      };
      if (pageSize) {
        info.page = Math.floor(index / pageSize) + 1;
        info.href = route.href + '/' + info.page + '/' + p.replace(/.md$/, '');
      }
      return info;
    });
  return files;
}

export function getAllArticlesLength(route) {
  return fs.readdirSync(join(CONTENT_DIR, route.articles)).length;
}
