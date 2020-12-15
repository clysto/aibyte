import Link from 'next/link';
import routes from '../_content/routes';

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
          <a className="text-sm text-gray-800 block">{childRoute.name}</a>
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
      <footer className="bg-white border-t">
        <div className="flex py-4 container mx-auto">{footerSections}</div>
      </footer>
    </div>
  );
}
