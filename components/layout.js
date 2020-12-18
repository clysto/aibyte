import Link from 'next/link';
import routes from '../_content/routes';
import Image from 'next/image';

export default function Layout({ children }) {
  const navItems = routes.map((route) => (
    <div key={route.name} className="relative group flex">
      <Link href={route.href}>
        <a className="flex items-center px-4 py-2 hover:bg-gray-100">
          {route.name}
        </a>
      </Link>
      <div className="group absolute hidden group-hover:block shadow-2xl rounded bg-gray-700 w-32 text-white top-16">
        {route.children.map((childRoute) => (
          <Link key={childRoute.name} href={childRoute.href}>
            <a className="block px-4 py-2 hover:bg-gray-900 last:rounded-b first:rounded-t">
              {childRoute.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  ));

  const footerSections = routes.map((route) => (
    <div key={route.name} className="mr-8">
      <h2 className="text-lg font-bold">{route.name}</h2>
      {route.children.map((childRoute) => (
        <Link key={childRoute.name} href={childRoute.href}>
          <a className="hover:text-green-700 text-sm text-gray-800 block">
            {childRoute.name}
          </a>
        </Link>
      ))}
    </div>
  ));

  return (
    <div>
      <header className="bg-white shadow-lg">
        <div className="container mx-auto flex h-16">
          <div className="flex items-center justify-center font-mono font-bold text-xl">
            AiByte
          </div>
          <div className="flex-1"></div>
          <div className="flex">
            <Link href="/">
              <a className="flex items-center px-4 py-2 hover:bg-gray-100">
                主页
              </a>
            </Link>
            {navItems}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-white border-t border-b">
        <div className="flex container mx-auto pt-6 pb-2">
          <div className="flex ">{footerSections}</div>
          <div className="flex-1"></div>
          <div>
            <Image src="/qrcode.svg" width={100} height={100}></Image>
          </div>
        </div>
        <div className="text-center py-6 px-2 text-gray-600 text-sm leading-6">
          <div>Copyright © 2017 南京农业大学 版权所有 All Rights Reserved</div>
          <div>苏ICP备11055736号-3 苏公网安备32010202010029号</div>
        </div>
      </footer>
    </div>
  );
}
