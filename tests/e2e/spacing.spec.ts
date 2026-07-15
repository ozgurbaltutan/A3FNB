import { expect, test, type Locator, type Page } from "@playwright/test";

const productRoutes = [
  "/en/products/coffee",
  "/en/products/sugar",
  "/en/products/cocoa-products",
  "/en/products/grains-seeds",
  "/en/products/dairy-milk-powders",
  "/en/products/oils-fats",
  "/en/products/starches-sweeteners",
  "/en/products/dried-fruit-nuts",
] as const;

function expectNear(actual: number, expected: number, tolerance = 1) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
}

async function numericStyle(locator: Locator, property: keyof CSSStyleDeclaration) {
  return locator.evaluate((element, name) => Number.parseFloat(getComputedStyle(element)[name] as string), property);
}

async function titleCopyGap(page: Page, rootSelector: string) {
  return page.locator(rootSelector).first().evaluate((root) => {
    const title = root.querySelector("h1, h2, h3");
    const copy = root.querySelector(":scope > .section-header__copy, :scope > .page-hero__text, :scope > p");
    if (!title || !copy) throw new Error(`Missing title/copy inside ${root.className}`);
    return copy.getBoundingClientRect().top - title.getBoundingClientRect().bottom;
  });
}

test("semantic spacing tokens and shared layout contracts are available", async ({ page }) => {
  await page.goto("/en");
  const tokens = await page.locator("html").evaluate((root) => {
    const style = getComputedStyle(root);
    return {
      card: style.getPropertyValue("--space-card-padding").trim(),
      content: style.getPropertyValue("--space-section-content").trim(),
      grid: style.getPropertyValue("--space-grid").trim(),
      heading: style.getPropertyValue("--space-heading-copy").trim(),
      section: style.getPropertyValue("--space-section-block").trim(),
    };
  });

  expect(tokens).toEqual({
    card: "clamp(1.25rem, 2vw, 2rem)",
    content: "clamp(2.5rem, 4vw, 3.5rem)",
    grid: "clamp(1rem, 1.5vw, 1.5rem)",
    heading: "clamp(1rem, 1.4vw, 1.25rem)",
    section: "clamp(4.5rem, 7vw, 7rem)",
  });
});

test("page heroes share one title-copy rhythm across product routes", async ({ page }) => {
  test.setTimeout(240_000);

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 900, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/en/products");
    const expected = await titleCopyGap(page, ".inner-page-hero__copy");

    for (const route of productRoutes) {
      await page.goto(route);
      expectNear(await titleCopyGap(page, ".page-hero__copy"), expected);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBe(0);
    }
  }
});

test("product collections keep equal header, control and grid spacing", async ({ page }) => {
  test.setTimeout(180_000);
  const routes = ["/en/products", ...productRoutes];

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 900, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    let headingGap: number | undefined;
    let gridGap: number | undefined;
    let sectionPadding: number | undefined;

    for (const route of routes) {
      await page.goto(route);
      const collection = page.locator(".product-collection").first();
      const header = collection.locator(".section-header").first();
      const grid = collection.locator(".product-image-grid").first();
      const section = page.locator(route === "/en/products" ? ".products-lineup-page" : ".product-portfolio-section").first();

      const currentHeadingGap = await numericStyle(header, "rowGap");
      const currentRowGap = await numericStyle(grid, "rowGap");
      const currentColumnGap = await numericStyle(grid, "columnGap");
      const currentPaddingTop = await numericStyle(section, "paddingTop");
      const currentPaddingBottom = await numericStyle(section, "paddingBottom");

      headingGap ??= currentHeadingGap;
      gridGap ??= currentRowGap;
      sectionPadding ??= currentPaddingTop;

      expectNear(currentHeadingGap, headingGap);
      expectNear(currentRowGap, gridGap);
      expectNear(currentColumnGap, gridGap);
      expectNear(currentPaddingTop, sectionPadding);
      expectNear(currentPaddingBottom, sectionPadding);
    }
  }
});

test("home, products and product-detail accordions share panel rhythm", async ({ page }) => {
  const cases = [
    { route: "/en", selector: ".trade-process-showcase .process-accordion--showcase" },
    { route: "/en/products", selector: ".products-support-showcase" },
    { route: "/en/products/sugar", selector: ".shipment-options-section .process-accordion--showcase" },
  ] as const;

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    let baseline: Record<string, number> | undefined;

    for (const item of cases) {
      await page.goto(item.route);
      const accordion = page.locator(item.selector).first();
      const trigger = accordion.locator(".process-accordion-trigger").first();
      const panel = accordion.locator(".process-accordion-panel").first();
      const current = {
        accordionGap: await numericStyle(accordion, "columnGap"),
        panelLeft: await numericStyle(panel, "paddingLeft"),
        triggerGap: await numericStyle(trigger, "columnGap"),
        triggerPadding: await numericStyle(trigger, "paddingTop"),
      };

      baseline ??= current;
      for (const key of Object.keys(current) as Array<keyof typeof current>) {
        expectNear(current[key], baseline[key]);
      }
    }
  }
});

test("product section navigation stays static and exposes every link", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/products/starches-sweeteners");

  const nav = page.locator(".product-section-nav");
  await expect(nav).toHaveCSS("position", "relative");
  await expect(nav).toHaveCSS("box-shadow", "none");
  await expect(nav.locator("[aria-current], .is-active")).toHaveCount(0);

  await nav.getByRole("link", { name: "Products" }).click();
  await expect(page).toHaveURL(/#range$/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/products/starches-sweeteners");
  const mobileLinks = nav.locator(".product-section-nav__links");
  const visibility = await mobileLinks.evaluate((strip) => {
    const bounds = strip.getBoundingClientRect();
    const links = [...strip.querySelectorAll("a")];
    return {
      allVisible: links.every((link) => {
        const linkBounds = link.getBoundingClientRect();
        return linkBounds.left >= bounds.left && linkBounds.right <= bounds.right && linkBounds.bottom <= bounds.bottom;
      }),
      clientWidth: strip.clientWidth,
      scrollWidth: strip.scrollWidth,
    };
  });

  expect(visibility.allVisible).toBe(true);
  expect(visibility.scrollWidth).toBe(visibility.clientWidth);
});

test("homepage primary sections use one symmetric block rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  const selectors = [
    ".featured-sourcing-section",
    ".home-section--markets",
    ".home-section--process",
    ".home-section--buyer-paths",
    ".home-section--catalogues",
  ];
  const paddings = await Promise.all(selectors.map(async (selector) => {
    const section = page.locator(selector).first();
    return {
      bottom: await numericStyle(section, "paddingBottom"),
      top: await numericStyle(section, "paddingTop"),
    };
  }));

  for (const padding of paddings) {
    expectNear(padding.top, paddings[0].top);
    expectNear(padding.bottom, paddings[0].top);
  }
});
