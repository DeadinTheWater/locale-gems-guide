import { useState, useEffect } from "react";

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

/** Tries alternate jpg/jpeg extension if the original fails to load. */
const FallbackImage = ({ src, onError, ...props }: FallbackImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
  }, [src]);
  const handleError = () => {
    if (triedFallback) return;
    setTriedFallback(true);

    if (currentSrc.endsWith(".jpg")) {
      setCurrentSrc(currentSrc.replace(/\.jpg$/, ".jpeg"));
    } else if (currentSrc.endsWith(".jpeg")) {
      setCurrentSrc(currentSrc.replace(/\.jpeg$/, ".jpg"));
    }
  };

  return <img {...props} src={currentSrc} onError={handleError} />;
};

export default FallbackImage;
