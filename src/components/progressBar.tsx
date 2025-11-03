import React, { useState, useEffect, useMemo } from "react";

/**
 * ScrollProgressBar component displays a progress bar indicating scroll position
 */
const ScrollProgressBar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercentage(scrolled);
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressBarStyle = useMemo(
    () => ({
      width: `${scrollPercentage}%`,
      transform: `scaleX(${scrollPercentage / 100}) translateZ(0px)`,
    }),
    [scrollPercentage]
  );

  return (
    <div
      className="progress-bar transition-all"
      style={progressBarStyle}
      role="progressbar"
      aria-valuenow={Math.round(scrollPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    />
  );
};

export default ScrollProgressBar;
