export const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>,
  setZoomStyle: React.Dispatch<React.SetStateAction<{ backgroundPosition: string }>>,
  setHighlightStyle: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>
) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = e.pageX - left;
  const y = e.pageY - top;

  const xPercent = (x / width) * 100;
  const yPercent = (y / height) * 100;

  setZoomStyle({ backgroundPosition: `${xPercent}% ${yPercent}%` });

  setHighlightStyle({
    top: y - 100,
    left: x - 100,
  });
};
