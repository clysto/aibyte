import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '../components/breadcrumbs';
import cx from 'classnames';

export default function PageLayout({
  slug,
  routeSelf,
  route1th,
  children,
  routeNames,
}) {
  const sidebarItems = route1th.children.map((route) => (
    <Link key={route.name} href={route.href}>
      <a
        className={cx('px-4 py-1 block', {
          ['bg-blue-200']: routeSelf && routeSelf.path === route.path,
        })}
      >
        {route.name}
      </a>
    </Link>
  ));

  return (
    <div className="container mx-auto">
      <div className="h-32 my-4 bg-gray-800">{/* 标题广告图 */}</div>
      <div className="flex my-4">
        <div className="w-72 mr-4 flex-shrink-0">
          <div className="bg-white">
            <div className="text-xl font-bold text-center p-2 bg-blue-500 text-white">
              <Link href={route1th.href}>{route1th.name}</Link>
            </div>
            <div>{sidebarItems}</div>
          </div>
          <div className="bg-gray-800 h-32 mt-4">{/* 侧边栏广告图 */}</div>
        </div>
        <div className="flex-1 bg-white overflow-hidden">
          <div className="bg-blue-200 px-4 py-2 flex items-center">
            <div className="text-xl">{routeSelf.name}</div>
            <div className="flex-1"></div>
            <div>
              您的位置： <Breadcrumbs slug={slug} names={routeNames} />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
