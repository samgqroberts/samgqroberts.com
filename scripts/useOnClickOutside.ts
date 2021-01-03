import { RefObject, useEffect } from 'react';

/**
 * Hook that will execute the given callback if user clicks or touches outside
 * of the given ref(s).
 */
export default function useOnClickOutside(
  onClickOutside: (event: MouseEvent) => void,
  ref: RefObject<Node>,
  ...addlRefs: RefObject<Node>[]
): void {
  const refs = [ref].concat(addlRefs);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const withinSomeRef = refs.some(
        (ref) =>
          ref.current && ref.current.contains((event?.target as Node) || null)
      );
      if (!withinSomeRef) {
        onClickOutside(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, refs);
}
