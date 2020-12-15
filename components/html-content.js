import React from 'react';
import style from '../styles/markdown.module.css';

export default function HTMLContent({ innerHTML }) {
  return (
    <div
      className={style.markdown + ' px-4 py-2'}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  );
}
