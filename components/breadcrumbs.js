import React from 'react';
import PropTypes from 'proptypes';
import Link from 'next/link';

export default function Breadcrumbs({ slug, names }) {
  names = names || slug;
  return (
    <div className="inline-block">
      <Link href="/">
        <a>
          <span className="underline">首页</span>
        </a>
      </Link>
      {slug.map((s, index) => (
        <Link key={s} href={'/' + slug.slice(0, index + 1).join('/')}>
          <a>
            <span>{' / '}</span>
            <span className="underline">{names[index]}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

Breadcrumbs.propTypes = {
  slug: PropTypes.arrayOf(PropTypes.string),
  names: PropTypes.arrayOf(PropTypes.string),
};
