import type {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  MutableRefObject,
} from "react";
import { forwardRef } from "react";

const Image = forwardRef<
  HTMLElement | MutableRefObject<HTMLImageElement>,
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>(({ alt = "Initial", ...rest }, ref) => {
  return (
    <img
      ref={ref as MutableRefObject<HTMLImageElement>}
      alt={alt}
      style={{
        cursor: "pointer",
      }}
      {...rest}
    />
  );
});

Image.displayName = "Image";

export default Image;
