import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import placeholderImage from "../../assets/open-book.svg";
import classes from "./LazyImage.module.scss";
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
        <div className={classes["book__cover"]}>
          <img src={src} alt={alt} height={230} width={100} loading="lazy" />
        </div>
      : <div className={classes["book__placeholder"]}>
          <img
            src={placeholderImage}
            alt="placeholder"
            height={230}
            width={100}
            loading="lazy"
          />
        </div>
      }
    </div>
  );
}

export default LazyImage;
