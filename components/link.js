import React from 'react';
import NextJsLink from 'next/link';

const assetPrefix = process.env.BACKEND_URL;

const Link = ({ href, ...rest }) => (
  <NextJsLink href={href} as={`${assetPrefix}${href}`} {...rest} />
);

export default Link;
