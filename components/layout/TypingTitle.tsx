"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type TypingTitleProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function TypingTitle({
  as: Component = "h2",
  children,
  className = "",
  id,
}: TypingTitleProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      id={id}
      ref={ref}
      className={`typing-title ${isVisible ? "is-visible" : ""} ${className}`}
    >
      <span className="typing-title__content">{children}</span>
    </Component>
  );
}
