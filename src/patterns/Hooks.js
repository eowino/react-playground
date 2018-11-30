import React, { useState, useEffect } from 'react';

type IUseResizer = {
  innerWidth: number,
  innerWidth: number,
  scrollY: number,
};

export default function useResizer(): IUseResizer {
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight);
  const [scrollY, setScrollY] = useState(() => window.scrollY);
  let listener;

  useEffect(() => {
    listener = window.addEventListener('resize', e => {
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

export function HookConsumer(props) {
  const { innerWidth, innerHeight, scrollY } = useResizer();
  return (
    <>
      <p>Inner Width: {innerWidth}</p>
      <p>Inner Height: {innerHeight}</p>
      <p>ScrollY: {scrollY}</p>
    </>
  );
}
