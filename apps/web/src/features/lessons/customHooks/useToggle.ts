import { useState } from 'react';

const useToggle = () => {
  const [isOpen, setIsOPen] = useState(false);
  function open() {
    setIsOPen(true);
  }
  function close() {
    setIsOPen(false);
  }
  function toggle() {
    setIsOPen((prevValue) => !prevValue);
  }
  return { open, close, toggle, isOpen };
};

export default useToggle;
