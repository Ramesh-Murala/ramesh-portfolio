import { useEffect, useState } from "react";

/** Slim top scroll progress bar */
export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div
        className="h-full origin-left transition-transform duration-100"
        style={{
          width: "100%",
          background: "#5eead4",
          transform: `scaleX(${p / 100})`,
        }}
      />
    </div>
  );
}
