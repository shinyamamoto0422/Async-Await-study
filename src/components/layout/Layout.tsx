import Link from 'next/link';
import { FC, ReactNode } from 'react';

const items = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
  { href: '/exception', label: 'Exception' },
  { href: '/explanation', label: 'Explanation' },
  { href: '/compare', label: 'Compare' },
  { href: '/PromiseChain', label: 'PromiseChain' },
  { href: 'AsyncFunction', label: 'AsyncFunction' },
];

const NavBar = () => {
  return (
    <nav className="z-10 w-screen bg-gray-800">
      <div className="flex h-12 items-center pl-4">
        <div className="flex space-x-1 text-sm">
          {items.map(({ href, label }) => {
            return (
              <Link href={href} key={href}>
                <a className="rounded px-3 py-2 text-gray-300 hover:bg-gray-700">{label}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-100 px-4 py-2">{children}</main>
    </div>
  );
};
