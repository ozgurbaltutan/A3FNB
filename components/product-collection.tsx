import { clsx } from "clsx";
import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui";

export function ProductCollection({
  title,
  text,
  children,
  className,
  headerClassName,
}: {
  title: ReactNode;
  text: ReactNode | readonly ReactNode[];
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <div className={clsx("product-collection", className)}>
      <SectionHeader className={headerClassName} text={text} title={title} />
      <div className="product-collection__content">{children}</div>
    </div>
  );
}
