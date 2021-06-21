import classNames from 'classnames';
import Image from 'next/image';
import { useRef, useState } from 'react';

import MenuIcon from '../MenuIcon';
import useOnClickOutside from '../useOnClickOutside';
import styles from './page.module.css';

/**
 * Responsive container for context and navigation links.
 * On small screens, will display as a "top navbar" at the top of the screen, above the content.
 *   In this case, will hide links within an expandable "nav menu."
 * On larger screens, will display as a "left sidebar" to the left of the content.
 */
const NavBar: React.FC = () => {
  const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);

  const navMenuWrapperRef = useRef<HTMLElement>(null);
  const menuIconWrapperRef = useRef<SVGSVGElement>(null);
  useOnClickOutside(
    () => setNavMenuOpen(false),
    navMenuWrapperRef,
    // include the menu icon itself, to avoid case where clicking menu icon
    // triggers this onClickOutside, closing the menu, then the menu icon click
    // registers, opening the menu again.
    menuIconWrapperRef
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.headshotContainer}>
        <a href="/">
          <Image src="/headshot.png" alt="In fact, me!" unsized />
        </a>
      </div>
      <MenuIcon
        ref={menuIconWrapperRef}
        className={styles.menuIcon}
        onClick={() => setNavMenuOpen(!navMenuOpen)}
      />
      <nav
        ref={navMenuWrapperRef}
        className={classNames(styles.navMenu, {
          [styles.menuOpen]: navMenuOpen
        })}
      >
        <ul>
          <li className={styles.homeLink}>
            <a href="/">Home</a>
          </li>
          <hr />
          <li>
            <a href="https://twitter.com/samgqroberts">
              <span className={styles.domain}>twitter.com</span>
              <span className={styles.slash}>/</span>
              <span className={styles.samgqroberts}>samgqroberts</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/samgqroberts">
              <span className={styles.domain}>github.com</span>
              <span className={styles.slash}>/</span>
              <span className={styles.samgqroberts}>samgqroberts</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/samgqroberts">
              <span className={styles.domain}>linkedin.com</span>
              <span className={styles.slash}>/</span>
              <span className={styles.samgqroberts}>samgqroberts</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
