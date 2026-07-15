import Link from "next/link";
import { clsx } from "clsx";
import type { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "light"
  | "darkOutline"
  | "mediaPrimary"
  | "mediaSecondary"
  | "text"
  | "textLight";
type ButtonSize = "small" | "default" | "large";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  outline: "button-outline",
  light: "button-light",
  darkOutline: "button-dark-outline",
  mediaPrimary: "button-media-primary",
  mediaSecondary: "button-media-secondary",
  text: "button-text",
  textLight: "button-text-light",
};

const buttonSizes: Record<ButtonSize, string> = {
  small: "min-h-10 px-4",
  default: "min-h-12 px-5",
  large: "min-h-14 px-7",
};

export function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={clsx(
        "button-base premium-focus type-button inline-flex items-center justify-center gap-2 border",
        buttonStyles[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "button-base premium-focus type-button inline-flex items-center justify-center gap-2 border",
        buttonStyles[variant],
        buttonSizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[var(--page-max)] px-[var(--gutter)]", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "paper",
  spacing = "default",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "ink" | "teal";
  spacing?: "default" | "compact";
  /** @deprecated Prefer the explicit tone prop. */
  muted?: boolean;
}) {
  const resolvedTone = muted && tone === "paper" ? "surface" : tone;

  return (
    <section
      className={clsx(
        "design-section",
        spacing === "compact" ? "design-section--compact" : "design-section--default",
        resolvedTone === "paper" && "bg-paper text-ink",
        resolvedTone === "surface" && "bg-surface text-ink",
        resolvedTone === "ink" && "surface-ink bg-ink text-surface",
        resolvedTone === "teal" && "bg-teal text-surface",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  text,
  tone = "light",
  className,
}: {
  title: ReactNode;
  text?: ReactNode | readonly ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const paragraphs = Array.isArray(text) ? text : text === undefined ? [] : [text];

  return (
    <div className={clsx("section-header", tone === "dark" && "section-header--dark", className)}>
      <h2 className="type-section">{title}</h2>
      {paragraphs.length ? (
        <div className="section-header__copy">
          {paragraphs.map((paragraph, index) => <p className="type-section-lead" key={index}>{paragraph}</p>)}
        </div>
      ) : null}
    </div>
  );
}

export function Heading({
  level = 2,
  children,
  className,
}: {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as const;
  const style = level === 1 ? "type-h1" : level === 2 ? "type-h2" : "type-h3";
  return <Tag className={clsx(style, className)}>{children}</Tag>;
}

export function Paragraph({
  children,
  size = "p2",
  className,
}: {
  children: ReactNode;
  size?: "p1" | "p2" | "p3";
  className?: string;
}) {
  return <p className={clsx(`type-${size}`, className)}>{children}</p>;
}

export function Card({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={clsx(
        "a3-card surface-card p-7",
        className,
      )}
    >
      {children}
    </article>
  );
}

export function TextInput({
  label,
  name,
  type = "text",
  required,
  placeholder,
  helperText,
  autoComplete,
  defaultValue,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  autoComplete?: string;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="type-p3 font-medium text-ink">
        {label}
        {required ? <span className="text-teal"> *</span> : null}
      </span>
      <input
        className="premium-focus min-h-12 w-full min-w-0 rounded-[var(--radius-control)] border border-border bg-surface px-4 text-ink"
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
      {helperText ? <span className="type-micro text-ink/65">{helperText}</span> : null}
    </label>
  );
}

export function SelectInput({
  label,
  name,
  options,
  required,
  helperText,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  helperText?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="type-p3 font-medium text-ink">
        {label}
        {required ? <span className="text-teal"> *</span> : null}
      </span>
      <select
        className="premium-focus min-h-12 w-full min-w-0 rounded-[var(--radius-control)] border border-border bg-surface px-4 text-ink"
        name={name}
        required={required}
        defaultValue={value === undefined ? "" : undefined}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {helperText ? <span className="type-micro text-ink/65">{helperText}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  name,
  required,
  placeholder,
  helperText,
  rows,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  rows?: number;
}) {
  return (
    <label className="grid min-w-0 gap-2 md:col-span-2">
      <span className="type-p3 font-medium text-ink">
        {label}
        {required ? <span className="text-teal"> *</span> : null}
      </span>
      <textarea
        className="premium-focus min-h-36 w-full min-w-0 rounded-[var(--radius-control)] border border-border bg-surface px-4 py-3 text-ink"
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
      />
      {helperText ? <span className="type-micro text-ink/65">{helperText}</span> : null}
    </label>
  );
}

export function Checkbox({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <label className="flex items-start gap-3">
      <input className="premium-focus mt-1 h-4 w-4 accent-[var(--color-brand-blue)]" name={name} type="checkbox" />
      <span className="type-p3">{label}</span>
    </label>
  );
}

export function PlaceholderVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={clsx(
        "placeholder-field flex min-h-72 items-end rounded-[var(--radius-card)] border border-border p-5",
        className,
      )}
    >
      <span className="type-p3 max-w-xs rounded-[var(--radius-control)] bg-surface px-3 py-2 text-ink">
        {label}
      </span>
    </div>
  );
}
