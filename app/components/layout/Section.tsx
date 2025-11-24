// components/layout/Section.tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx("page-section", className)}>
      <div className="page-container">{children}</div>
    </section>
  );
}
