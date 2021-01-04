import { forwardRef } from 'react';

/**
 * Google Material icon encoded as a react `<svg />`
 *
 * source: https://material.io/resources/icons/?icon=menu&style=baseline
 */
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = forwardRef(
  function MenuIcon(props, ref) {
    return (
      <svg
        {...{ ref }}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    );
  }
);
export default MenuIcon;
