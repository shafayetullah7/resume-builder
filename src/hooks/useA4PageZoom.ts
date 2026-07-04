import { useEffect, useState, type RefObject } from 'react';

export const A4_WIDTH_MM = 210;

const HORIZONTAL_PADDING_PX = 32;

export function useA4PageZoom(containerRef: RefObject<HTMLElement | null>): number {
  const [pageZoom, setPageZoom] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateZoom = () => {
      const available = container.clientWidth - HORIZONTAL_PADDING_PX;
      const probe = document.createElement('div');
      probe.style.width = `${A4_WIDTH_MM}mm`;
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      document.body.appendChild(probe);
      const pageWidthPx = probe.getBoundingClientRect().width;
      document.body.removeChild(probe);
      if (pageWidthPx > 0) {
        setPageZoom(Math.min(1, available / pageWidthPx));
      }
    };

    updateZoom();
    const observer = new ResizeObserver(updateZoom);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  return pageZoom;
}
