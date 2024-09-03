import React from "react";

const getSpotlightImage = (src: string, width): string => {
  const url = new URL("https://prism.spotlight.agilesvcs.com/v1/proxy"!);
  const params = {
    width: String(width),
    resize: "RATIO",
    format: "WEBP",
    quality: "1",
    image: src,
  };
  const urlParams = new URLSearchParams(params as Record<string, string>);
  url.search = urlParams.toString();
  return url.toString();
};

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const width = props.width || 208;
  delete props.width;
  return <img {...props} src={getSpotlightImage(props.src!, width)} />;
};

export default Image;
