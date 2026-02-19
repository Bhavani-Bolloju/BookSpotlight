import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import classes from "./LazyImage.module.scss";
import placeholderImage from "../../assets/book-open.svg";
interface LazyImageProps {
  src: string;
  alt: string;
}

function LazyImage({ src, alt }: LazyImageProps) {
  const { ref, inView } = useInView({
    threshold: 0.6,
    delay: 1000,
    triggerOnce: true
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className={classes["book__image"]}>
      {isLoading ?
        <img src={src} alt={alt} height={230} width={100} loading="lazy" />
      : <img
          src={placeholderImage}
          alt="placeholder"
          height={230}
          width={100}
          loading="lazy"
        />
      }
    </div>
  );
}

export default LazyImage;
