import classNames from 'classnames';
import Image from 'next/image';
import { useRef, useState } from 'react';

import styles from '../styles/general.module.css';
import MenuIcon from './MenuIcon';
import useOnClickOutside from './useOnClickOutside';

const Menu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navWrapperRef = useRef<HTMLElement>(null);
  const menuIconWrapperRef = useRef<SVGSVGElement>(null);
  useOnClickOutside(
    () => setMenuOpen(false),
    navWrapperRef,
    // include the menu icon itself, to avoid case where clicking menu icon
    // triggers this onClickOutside, closing the menu, then the menu icon click
    // registers, opening the menu again.
    menuIconWrapperRef
  );

  return (
    <div className={styles.menuContainer}>
      <div className={styles.headshotContainer}>
        <a href="/" className={styles.headshotLink}>
          <Image src="/headshot.png" alt="In fact, me!" unsized />
        </a>
      </div>
      <MenuIcon
        ref={menuIconWrapperRef}
        className={styles.menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <nav
        ref={navWrapperRef}
        className={classNames(styles.nav, { [styles.menuOpen]: menuOpen })}
      >
        <ul className={styles.navMenu}>
          <li className={styles.homeLink}>
            <a href="/">Home</a>
          </li>
          <hr />
          <li>
            <a href="https://twitter.com/samgqroberts">
              twitter.com/samgqroberts
            </a>
          </li>
          <li>
            <a href="https://github.com/samgqroberts">
              github.com/samgqroberts
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/samgqroberts">
              linkedin.com/in/samgqroberts
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Menu;
