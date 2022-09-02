import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
  title: string;
  className?: string;
};
export const AppLink: FC<Props> = ({ href, title, className }) => {
  return (
    <div className={`${!className ? '' : className}`}>
      <Link href={`${href}`}>
        <a className="text-blue-800 hover:text-blue-700" rel="noopener noreferrer">
          {title}
        </a>
      </Link>
    </div>
  );
};
