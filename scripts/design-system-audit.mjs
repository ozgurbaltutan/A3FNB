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
