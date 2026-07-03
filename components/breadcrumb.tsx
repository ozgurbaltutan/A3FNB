import Link from "next/link";
import type { NavigationItem } from "@/lib/types";

export function Breadcrumb({ items }: { items: NavigationItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="type-p3">
      <ol className="flex flex-wrap items-center gap-2 text-ink">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-ink">{item.label}</span>
              ) : (
                <Link className="premium-focus hover:text-teal" href={item.href}>
                  {item.label}
                </Link>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
