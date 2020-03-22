import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from './link';
import React, { Children } from 'react';

const ActiveLink = ({ children, activeClassName = 'active', ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    pathname === props.href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
