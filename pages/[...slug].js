import routes, {
  travelRoutes,
  allComponents,
  getRouteName,
} from '../_content/routes';
import PageLayout from '../components/page-layout';
import HTMLContent from '../components/html-content';
import { getPageContent, getAllArticles, getArticleContent } from '../lib/api';
import { route } from 'next/dist/next-server/server/router';

const components = allComponents();

export default function Main(props) {
  let Page;
  if (props.component) {
    Page = components[props.component];
  }
  return (
    <PageLayout
      route1th={props.route1th}
      routeSelf={props.routeSelf}
      slug={props.slug}
      routeNames={props.routeNames}
    >
      {Page ? (
        <Page {...props.componentProps} />
      ) : (
        <HTMLContent innerHTML={props.innerHTML || ''} />
      )}
    </PageLayout>
  );
}

export function getStaticPaths() {
  let paths = [];
  travelRoutes(routes, (r) => {
    paths.push(r.href);
    if (r.articles) {
      const articles = getAllArticles(r);
      for (let article of articles) {
        paths.push(article.href);
      }
      if (r.pageSize) {
        for (let i = 1; i <= Math.ceil(articles.length / r.pageSize); i++) {
          paths.push(r.href + '/' + i);
        }
      }
    }
  });
  // DEBUG print all path
  // paths.forEach((p) => console.log(p));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  // 一级路由
  const route1th = routes.find((r) => r.path === slug[0]);
  // 二级路由
  const route2th = route1th.children
    ? route1th.children.find((r) => r.path === slug[1])
    : null;
  // 本级路由
  const routeSelf = route2th || route1th;

  if (routeSelf.redirect) {
    const redirectSlug = routeSelf.redirect.split('/').filter((s) => s);
    return await getStaticProps({ params: { slug: redirectSlug } });
  }

  let innerHTML = null;
  let component = null;
  let componentProps = null;

  if (routeSelf.articles) {
    // 该页面为文章页面或文章索引页面
    if (routeSelf.pageSize) {
      // 分页渲染
      const pageQuery = slug.length > 2 ? slug[2] : '1';
      const articleQuery = slug.length > 3 ? slug[3] : undefined;
      if (articleQuery) {
        // 文章页面
        innerHTML = (await getArticleContent(routeSelf, articleQuery)).content;
      } else {
        // 文章索引页面
        const pageIndex = parseInt(pageQuery);
        const start = (pageIndex - 1) * routeSelf.pageSize;
        const end = pageIndex * routeSelf.pageSize;
        component = routeSelf.component;
        const articles = getAllArticles(routeSelf, start, end);
        componentProps = {
          articles,
          nextHref: '/' + routeSelf.slug.join('/') + '/' + (pageIndex + 1),
          preHref: '/' + routeSelf.slug.join('/') + '/' + (pageIndex - 1),
        };
      }
    } else {
      // 没有分页
      const articleQuery = slug.length > 2 ? slug[2] : undefined;
      if (articleQuery) {
        // 文章页面
        innerHTML = (await getArticleContent(routeSelf, articleQuery)).content;
      } else {
        // 文章索引页面
        component = routeSelf.component;
        const articles = getAllArticles(routeSelf);
        componentProps = { articles };
      }
    }
  } else {
    innerHTML = await getPageContent(routeSelf.content);
  }

  // if (routeSelf.articles && slug.length > routeSelf.slug.length) {
  //   // 超过三级页面
  //   innerHTML = (await getArticleContent(routeSelf, slug[slug.length - 1]))
  //     .content;
  // } else {
  //   // 不超过三级页面
  //   if (routeSelf.jsx && routeSelf.component) {
  //     component = routeSelf.component;
  //     // 存在动态子页面
  //     if (routeSelf.articles) {
  //       const articles = getAllArticles(routeSelf);
  //       componentProps = { articles };
  //     }
  //   } else if (routeSelf.content) {
  //     innerHTML = await getPageContent(routeSelf.content);
  //   }
  // }

  const routeNames = slug.map((_, index) => {
    return getRouteName(routes, slug.slice(0, index + 1));
  });

  return {
    props: {
      slug,
      routeNames,
      routeSelf,
      innerHTML,
      component,
      route1th,
      componentProps,
    },
  };
}
