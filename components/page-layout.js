import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '../components/breadcrumbs';
import { AiFillCaretRight } from 'react-icons/ai';
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
        className={cx('flex items-stretch', {
          ['bg-blue-800']: routeSelf && routeSelf.path === route.path,
          ['text-white']: routeSelf && routeSelf.path === route.path,
        })}
      >
        <div
          className={cx('flex items-center py-1 w-8 justify-center', {
            ['bg-blue-900']: routeSelf && routeSelf.path === route.path,
          })}
        >
          <AiFillCaretRight
            className={cx({
              ['hidden']: !(routeSelf && routeSelf.path === route.path),
            })}
          />
        </div>
        <span className="px-2 py-1">{route.name}</span>
      </a>
    </Link>
  ));

  return (
    <div className="container mx-auto" style={{ minHeight: '75vh' }}>
      <div className="h-32 my-4 bg-gray-800">{/* 标题广告图 */}</div>
      <div className="flex my-4">
        <div className="w-64 mr-4 flex-shrink-0">
          <div className="bg-white">
            <div className="text-xl font-bold text-center p-2 bg-blue-800 text-white">
              <Link href={route1th.href}>{route1th.name}</Link>
            </div>
            <div className="divide-y border-t-2 border-b-2 border-blue-900">
              {sidebarItems}
            </div>
          </div>
          <div className="bg-gray-800 h-32 mt-4">{/* 侧边栏广告图 */}</div>
        </div>
        <div className="flex-1 bg-white overflow-hidden">
          <div className="bg-gray-100 border-t-2 border-blue-900 px-4 py-2 flex items-center">
            <div className="text-xl font-bold">{routeSelf.name}</div>
            <div className="flex-1"></div>
            <div>
              <span className="text-sm">您的位置：</span>
              <Breadcrumbs slug={slug} names={routeNames} />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
