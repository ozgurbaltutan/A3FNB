import fs from "node:fs";
import path from "node:path";

const stylesDir = path.resolve("app/styles");
const files = fs.readdirSync(stylesDir)
  .filter((file) => file.endsWith(".css"))
  .map((file) => path.join(stylesDir, file));
const tokenFile = path.join(stylesDir, "tokens.css");
const forbiddenTokens = [
  "--color-deep-dark",
  "--color-teal-active",
  "--color-teal-soft",
  "--a3-surface-warm",
  "--a3-shadow-",
  "--apple-",
  "--color-brand-blue",
  "--color-origin-gold",
];
const forbiddenComments = ["authoritative override", "audit fixes", "pilot overrides"];
const palette = new Set(["#03100e", "#f7f2ea", "#fffdf8", "#0f7569", "#0a5f55", "#6fa59b"]);
const requiredShadowTokens = new Map([
  ["--shadow-base", "2px 4px 12px 0 rgba(0, 0, 0, 0.08)"],
  ["--shadow-raised", "2px 4px 16px 0 rgba(0, 0, 0, 0.16)"],
  ["--shadow-overlay", "2px 6px 20px 0 rgba(0, 0, 0, 0.20)"],
]);
const requiredSpacingTokens = new Map([
  ["--space-section-block", "clamp(4.5rem, 7vw, 7rem)"],
  ["--space-section-compact", "clamp(2.5rem, 4vw, 3.5rem)"],
  ["--space-hero-block", "clamp(3.5rem, 6vw, 5rem)"],
  ["--space-section-content", "clamp(2.5rem, 4vw, 3.5rem)"],
  ["--space-heading-copy", "clamp(1rem, 1.4vw, 1.25rem)"],
  ["--space-copy-stack", "var(--space-3)"],
  ["--space-copy-action", "var(--space-6)"],
  ["--space-control-content", "clamp(1.5rem, 2.5vw, 2rem)"],
  ["--space-grid", "clamp(1rem, 1.5vw, 1.5rem)"],
  ["--space-panel-gap", "clamp(1.5rem, 3vw, 2.5rem)"],
  ["--space-card-padding", "clamp(1.25rem, 2vw, 2rem)"],
  ["--space-panel-padding", "clamp(1.5rem, 3vw, 2.5rem)"],
]);
const spacingComponentFiles = [
  "components/home-sections.tsx",
  "components/inner-page-hero.tsx",
  "components/product-collection.tsx",
  "components/product-detail-layout.tsx",
  "components/trade-process-showcase.tsx",
  "components/final-cta.tsx",
  "app/[locale]/products/products-lineup.tsx",
];
const errors = [];
let rootCount = 0;

function splitShadows(value) {
  const shadows = [];
  let current = "";
  let depth = 0;

  for (const character of value) {
    if (character === "(") depth += 1;
    if (character === ")") depth -= 1;
    if (character === "," && depth === 0) {
      shadows.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  shadows.push(current.trim());
  return shadows;
}

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  rootCount += (source.match(/^:root\s*\{/gm) ?? []).length;

  for (const token of forbiddenTokens) {
    if (source.includes(token)) errors.push(`${path.relative(process.cwd(), file)} uses ${token}`);
  }

  for (const comment of forbiddenComments) {
    if (source.toLowerCase().includes(comment)) {
      errors.push(`${path.relative(process.cwd(), file)} contains legacy override marker "${comment}"`);
    }
  }

  if (file !== tokenFile) {
    const rawColors = source.match(/#[0-9a-f]{3,8}\b|rgba?\(\s*\d/gi) ?? [];
    if (rawColors.length) {
      errors.push(`${path.relative(process.cwd(), file)} contains raw colors: ${[...new Set(rawColors)].join(", ")}`);
    }
    const namedColors = source.match(/:\s*[^;{}]*\b(?:black|white)\b/gi) ?? [];
    if (namedColors.length) {
      errors.push(`${path.relative(process.cwd(), file)} contains named raw colors: ${[...new Set(namedColors)].join(", ")}`);
    }
  }

  for (const declaration of source.matchAll(/box-shadow\s*:\s*([^;]+);/gms)) {
    const hardcodedOuter = splitShadows(declaration[1]).filter(
      (shadow) => shadow !== "none"
        && !shadow.includes("inset")
        && !shadow.includes("var(--shadow-")
        && !shadow.includes("var(--media-edge-"),
    );
    if (hardcodedOuter.length) {
      errors.push(
        `${path.relative(process.cwd(), file)} contains hardcoded outer shadows: ${hardcodedOuter.join(", ")}`,
      );
    }
  }

  for (const declaration of source.matchAll(/filter\s*:\s*drop-shadow\(([^;]+)\)\s*;/gms)) {
    if (!declaration[1].includes("var(--shadow-filter-")) {
      errors.push(`${path.relative(process.cwd(), file)} contains a hardcoded drop shadow: ${declaration[1].trim()}`);
    }
  }

  for (const declaration of source.matchAll(/text-shadow\s*:\s*([^;]+);/gms)) {
    const value = declaration[1].trim();
    if (value !== "none" && !value.includes("var(--shadow-text-")) {
      errors.push(`${path.relative(process.cwd(), file)} contains a hardcoded text shadow: ${value}`);
    }
  }
}

const tokenSource = fs.readFileSync(tokenFile, "utf8");
for (const [token, value] of requiredShadowTokens) {
  if (!tokenSource.includes(`${token}: ${value};`)) {
    errors.push(`tokens.css must define ${token} as ${value}`);
  }
}
for (const [token, value] of requiredSpacingTokens) {
  if (!tokenSource.includes(`${token}: ${value};`)) {
    errors.push(`tokens.css must define ${token} as ${value}`);
  }
}

for (const [legacyToken, semanticToken] of [
  ["--section-pad", "--space-section-block"],
  ["--a3-section-pad", "--space-section-block"],
]) {
  if (!tokenSource.includes(`${legacyToken}: var(${semanticToken});`)) {
    errors.push(`${legacyToken} must remain a compatibility alias of ${semanticToken}`);
  }
}

for (const relativeFile of spacingComponentFiles) {
  const source = fs.readFileSync(path.resolve(relativeFile), "utf8");
  const rawSpacingUtilities = source.match(/\b(?:m[trblxy]?|p[trblxy]?|gap|space-[xy])-(?:\[|\d)/g) ?? [];
  if (rawSpacingUtilities.length) {
    errors.push(`${relativeFile} contains raw layout spacing utilities: ${[...new Set(rawSpacingUtilities)].join(", ")}`);
  }
}

const componentSource = fs.readFileSync(path.join(stylesDir, "components.css"), "utf8");
const spacingContractMarker = "/* Site-wide spacing contract.";
const spacingContract = componentSource.slice(componentSource.indexOf(spacingContractMarker));
if (!spacingContract.startsWith(spacingContractMarker)) {
  errors.push("components.css is missing the site-wide spacing contract");
} else {
  for (const declaration of spacingContract.matchAll(/(?:margin(?:-(?:top|right|bottom|left|block|inline))?|padding(?:-(?:top|right|bottom|left|block|inline))?|gap|row-gap|column-gap)\s*:\s*([^;]+);/g)) {
    const value = declaration[1].trim();
    if (!value.includes("var(") && !value.includes("calc(") && !/^(?:0|auto)(?:\s+(?:0|auto))*$/.test(value)) {
      errors.push(`Site-wide spacing contract contains a raw spacing value: ${declaration[0].trim()}`);
    }
  }
}
const tokenHexes = [...tokenSource.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((match) => match[0].toLowerCase());
const unknownPaletteValues = [...new Set(tokenHexes.filter((color) => !palette.has(color)))];
if (unknownPaletteValues.length) {
  errors.push(`tokens.css contains colors outside the canonical palette: ${unknownPaletteValues.join(", ")}`);
}
for (const color of palette) {
  if (!tokenHexes.includes(color)) errors.push(`tokens.css is missing canonical color ${color}`);
}

if (rootCount !== 1) errors.push(`Expected one canonical :root block, found ${rootCount}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Design-system audit passed across ${files.length} CSS files.`);
