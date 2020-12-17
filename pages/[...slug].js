import routes, { travelRoutes, allComponents } from '../_content/routes';
import PageLayout from '../components/page-layout';
import HTMLContent from '../components/html-content';
import { getPageContent, getArticleContent, getAllArticles } from '../lib/api';

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
    }
  });
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

  let innerHTML = null;
  let component = null;
  let componentProps = null;

  if (routeSelf.articles && slug.length > routeSelf.slug.length) {
    // 超过三级页面
    innerHTML = (await getArticleContent(routeSelf, slug[slug.length - 1]))
      .content;
  } else {
    // 不超过三级页面
    if (routeSelf.jsx && routeSelf.component) {
      component = routeSelf.component;
      // 存在动态子页面
      if (routeSelf.articles) {
        const articles = getAllArticles(routeSelf);
        componentProps = { articles };
      }
    } else if (routeSelf.content) {
      innerHTML = await getPageContent(routeSelf.content);
    }
  }

  if (routeSelf.redirect) {
    const redirectSlug = routeSelf.redirect.split('/').filter((s) => s);
    return await getStaticProps({ params: { slug: redirectSlug } });
  }

  return {
    props: {
      slug,
      routeSelf,
      innerHTML,
      component,
      route1th,
      componentProps,
    },
  };
}
