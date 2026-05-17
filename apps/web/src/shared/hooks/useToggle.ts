import { useCallback, useState } from 'react';

export const useToggle = (initial: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { open, close, toggle, isOpen };
};
