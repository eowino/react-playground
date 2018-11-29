import React, { useState, useLayoutEffect } from 'react';

export default function useResizer() {
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight);
  const [scrollY, setScrollY] = useState(() => window.scrollY);
  let listener;

  useLayoutEffect(() => {
    window.addEventListener('resize', e => {
      const window = e.target;
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
      setScrollY(window.scrollY);
    });

    return () => window.removeEventListener('resize', listener);
  });

  return {
    innerHeight,
    innerWidth,
    scrollY,
  };
}
