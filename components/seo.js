import React from 'react';
import Head from 'next/head';

function SEO({ description, title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}

export default SEO;
