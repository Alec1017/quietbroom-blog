import React from 'react'
import { Link } from 'gatsby'

import '../stylesheets/main.scss';

function Layout(props) {
  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1 className='layout__header--large'>
        <Link className='layout__link--large' to={'/'}>
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3 className='layout__header--small'>
        <Link className='layout__link--small' to={'/'}>
          {title}
        </Link>
      </h3>
    )
  }

  return (
    <div className='layout'>
      {header}
      {children}
    </div>
  );
}

export default Layout;
