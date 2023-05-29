import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useViewport from '../utils/useViewport';

interface NavItemProps {
  verb: string;
  link: string;
}

/**
 * Returns a link to a page
 * @param props NavItemsProps
 * @returns HTMLElement
 */
function NavItem(props: NavItemProps) {
  const {
    verb,
    link
  } = props;

  var c = require('classnames');
  const loc = useLocation();
  const { width } = useViewport();
  const isMdBp = width < 970;

  return (
    <div className={c({
      "pr-2": true,
      "pt-1": !isMdBp,
      "pt-2": isMdBp,
      })}
    >
      <Link
      className={c({
        "text-link": loc.pathname === link,
        "text-tertiary hover:text-link hover:underline": loc.pathname !== link,
          })}
          to={link}
      >
        {verb}
      </Link>
    </div>
  )
}

export default NavItem;
