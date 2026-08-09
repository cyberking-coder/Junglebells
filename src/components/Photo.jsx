import { useState } from "react";
import ForestBackdrop from "./ForestBackdrop";

/**
 * Photograph with a drawn-canopy floor underneath. If the remote image is
 * unreachable (offline build, blocked network) the SVG scene carries the
 * frame on its own instead of leaving a black rectangle.
 */
export default function Photo({
  src,
  alt = "",
  className = "",
  depth = 0.6,
  motionImg: MotionImg,
  style,
  ...rest
}) {
  const [ok, setOk] = useState(true);
  const Img = MotionImg ?? "img";

  return (
    <>
      <ForestBackdrop depth={depth} />
      {ok && (
        <Img
          src={src}
          alt={alt}
          style={style}
          onError={() => setOk(false)}
          className={className}
          {...rest}
        />
      )}
    </>
  );
}
