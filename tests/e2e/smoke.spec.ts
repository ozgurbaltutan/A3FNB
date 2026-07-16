import { expect, test, type Page } from "@playwright/test";

const publicRoutes = [
  "/en",
  "/en/about",
  "/en/contact",
  "/en/cookie-policy",
  "/en/how-we-work",
  "/en/markets-sourcing",
  "/en/modern-slavery-act",
  "/en/privacy-policy",
  "/en/products",
  "/en/products/sugar",
  "/en/products/coffee",
  "/en/products/cocoa-products",
  "/en/products/grains-seeds",
  "/en/products/dairy-milk-powders",
  "/en/products/oils-fats",
  "/en/products/starches-sweeteners",
  "/en/products/dried-fruit-nuts",
  "/en/products/frozen-foods",
  "/en/products/consumer-foods",
  "/en/products/elle-mina",
  "/en/request-a-quote",
  "/en/resources",
  "/en/supplier-enquiry",
] as const;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`response: ${response.status()} ${response.url()}`);
  });

  return errors;
}

test("root redirects to the English homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("h1")).toBeVisible();
});

test("all public routes render without runtime or missing-asset errors", async ({ page }) => {
  test.setTimeout(90_000);
  const errors = collectRuntimeErrors(page);

  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), `${route} returned ${response?.status()}`).toBeTruthy();
    await expect(page.locator("#main-content")).toBeVisible();
  }

  expect(errors).toEqual([]);
});

test("desktop header and mobile navigation remain usable", async ({ page }) => {
  await page.goto("/en");
  const desktopNav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(desktopNav).toBeVisible();
  await expect(desktopNav.getByRole("link", { name: "Products" })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.locator("#mobile-navigation").getByRole("button", { name: "Products" }).click();
  await expect(page.locator("#mobile-products-navigation")).toBeVisible();
});

test("home product carousel keeps uniform overlays and fixed shadowless controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");

  const section = page.locator(".featured-sourcing-section");
  const cards = section.locator(".product-image-card");
  const viewport = section.locator(".product-image-carousel__viewport");
  const previous = section.getByRole("button", { name: "Previous Products" });
  const next = section.getByRole("button", { name: "Next Products" });

  await expect(section).toHaveCSS("background-color", "rgb(247, 242, 234)");
  await expect(cards).toHaveCount(10);
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await expect(next).toHaveCSS("background-color", "rgb(255, 253, 248)");
  await expect(next).toHaveCSS("box-shadow", "none");
  await expect(next).toHaveCSS("transform", "none");

  const overlays = await cards.evaluateAll((items) => items.map((item) => {
    const style = getComputedStyle(item, "::before");
    return {
      backgroundImage: style.backgroundImage,
      content: style.content,
      height: style.height,
    };
  }));
  expect(new Set(overlays.map((overlay) => overlay.backgroundImage)).size).toBe(1);
  expect(new Set(overlays.map((overlay) => overlay.height)).size).toBe(1);
  expect(overlays.every((overlay) => overlay.content !== "none")).toBeTruthy();
  expect(overlays[0]?.backgroundImage).toContain("rgb(255, 253, 248)");

  const firstCard = cards.first();
  await firstCard.hover();
  await page.mouse.move(0, 0);
  await expect(firstCard).toHaveCSS("transform", "none");
  await firstCard.hover();
  await expect.poll(async () => firstCard.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)).toBeGreaterThan(1.005);
  const hoverMotion = await firstCard.evaluate((element) => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const [originX, originY] = style.transformOrigin.split(" ").map(Number.parseFloat);
    return {
      height: (element as HTMLElement).offsetHeight,
      originX,
      originY,
      scaleX: matrix.a,
      scaleY: matrix.d,
      translateX: matrix.e,
      translateY: matrix.f,
      width: (element as HTMLElement).offsetWidth,
    };
  });
  expect(hoverMotion.scaleX).toBeCloseTo(1.01, 2);
  expect(hoverMotion.scaleY).toBeCloseTo(1.01, 2);
  expect(hoverMotion.translateX).toBe(0);
  expect(hoverMotion.translateY).toBe(0);
  expect(hoverMotion.originX).toBeCloseTo(hoverMotion.width / 2, 0);
  expect(hoverMotion.originY).toBeCloseTo(hoverMotion.height / 2, 0);

  const snapStep = await cards.evaluateAll((items) => {
    const first = items[0] as HTMLElement | undefined;
    const second = items[1] as HTMLElement | undefined;
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  });
  const initialScrollLeft = await viewport.evaluate((element) => element.scrollLeft);
  const controlPlacementBefore = await next.evaluate((element) => {
    const sectionElement = element.closest(".featured-sourcing-section");
    const controlRect = element.getBoundingClientRect();
    const sectionRect = sectionElement?.getBoundingClientRect();
    return sectionRect
      ? { x: controlRect.x - sectionRect.x, y: controlRect.y - sectionRect.y }
      : null;
  });
  const restingGlyphTransform = await next.evaluate((element) => getComputedStyle(element, "::before").transform);

  await next.hover();
  await expect(next).toHaveCSS("box-shadow", "none");
  await expect(next).toHaveCSS("transform", "none");
  expect(await next.evaluate((element) => getComputedStyle(element, "::before").transform)).toBe(restingGlyphTransform);

  await page.mouse.down();
  expect(await next.evaluate((element) => element.matches(":active"))).toBeTruthy();
  await expect(next).not.toHaveCSS("background-color", "rgb(255, 253, 248)");
  await expect(next).toHaveCSS("box-shadow", "none");
  await expect(next).toHaveCSS("transform", "none");
  expect(await next.evaluate((element) => getComputedStyle(element, "::before").transform)).toBe(restingGlyphTransform);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await next.click();

  await expect.poll(async () => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(initialScrollLeft + snapStep - 2);
  const settledScrollLeft = await viewport.evaluate((element) => element.scrollLeft);
  expect(Math.abs(settledScrollLeft - initialScrollLeft - snapStep)).toBeLessThanOrEqual(2);
  await expect(previous).toBeEnabled();

  const controlPlacementAfter = await next.evaluate((element) => {
    const sectionElement = element.closest(".featured-sourcing-section");
    const controlRect = element.getBoundingClientRect();
    const sectionRect = sectionElement?.getBoundingClientRect();
    return sectionRect
      ? { x: controlRect.x - sectionRect.x, y: controlRect.y - sectionRect.y }
      : null;
  });
  expect(controlPlacementBefore).not.toBeNull();
  expect(controlPlacementAfter).not.toBeNull();
  expect(Math.abs(controlPlacementAfter!.x - controlPlacementBefore!.x)).toBeLessThan(1);
  expect(Math.abs(controlPlacementAfter!.y - controlPlacementBefore!.y)).toBeLessThan(1);

  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionStart = await viewport.evaluate((element) => element.scrollLeft);
  await next.click();
  const reducedMotionEnd = await viewport.evaluate((element) => element.scrollLeft);
  expect(Math.abs(reducedMotionEnd - reducedMotionStart - snapStep)).toBeLessThanOrEqual(2);

  await previous.focus();
  await page.keyboard.press("Tab");
  await expect(next).toBeFocused();
  await expect(next).toHaveCSS("box-shadow", "none");
  await expect(next).toHaveCSS("transform", "none");
  await expect(next).toHaveCSS("outline-style", "solid");
});

test("Coffee origins and product service accordions respond", async ({ page }) => {
  await page.goto("/en/products/coffee");
  const rondoniaPin = page.getByRole("button", { name: /Show Rond.*nia origin information/ });
  await rondoniaPin.focus();
  await rondoniaPin.press("Enter");
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Rond\u00f4nia");

  const exportCoordination = page.getByRole("button", { name: /Export Coordination/ });
  await exportCoordination.click();
  await expect(exportCoordination).toHaveAttribute("aria-expanded", "true");

  await page.goto("/en/products/sugar");
  const logistics = page.getByRole("button", { name: /Integrated Logistics/ });
  await logistics.click();
  await expect(logistics).toHaveAttribute("aria-expanded", "true");

  await page.goto("/en/products/grains-seeds");
  const loadCoordination = page.getByRole("button", { name: /Execution$/ });
  await loadCoordination.click();
  await expect(loadCoordination).toHaveAttribute("aria-expanded", "true");
});

test("product cards and decision-summary modals stay compact across breakpoints", async ({ page }) => {
  test.setTimeout(240_000);
  await page.emulateMedia({ reducedMotion: "reduce" });

  const productPages: Array<{ count: number; route: string; tabCounts?: number[] }> = [
    { count: 4, route: "/en/products/sugar" },
    { count: 5, route: "/en/products/coffee" },
    { count: 4, route: "/en/products/cocoa-products" },
    { count: 4, route: "/en/products/grains-seeds" },
    { count: 13, route: "/en/products/dairy-milk-powders" },
    { count: 8, route: "/en/products/oils-fats" },
    { count: 21, route: "/en/products/starches-sweeteners", tabCounts: [7, 2, 5, 5, 2] },
    { count: 7, route: "/en/products/dried-fruit-nuts", tabCounts: [4, 3] },
  ];

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const productPage of productPages) {
      await page.goto(productPage.route);
      const tabCounts = productPage.tabCounts ?? [productPage.count];

      for (let tabIndex = 0; tabIndex < tabCounts.length; tabIndex += 1) {
        if (productPage.tabCounts) {
          await page.locator("#range").getByRole("tab").nth(tabIndex).click();
        }

        const cards = page.locator("#range .product-image-card");
        await expect(cards).toHaveCount(tabCounts[tabIndex]);

        const cardTypography = await cards.evaluateAll((items) => items.map((card) => {
          const title = card.querySelector<HTMLElement>(".product-image-card__title-row > strong");
          const description = card.querySelector<HTMLElement>(".product-image-card__copy p");
          const descriptionStyle = description ? getComputedStyle(description) : null;
          return {
            descriptionDisplay: descriptionStyle?.display ?? "",
            descriptionHeight: description?.scrollHeight ?? 0,
            descriptionLineHeight: descriptionStyle ? Number.parseFloat(descriptionStyle.lineHeight) : 0,
            descriptionOverflow: descriptionStyle?.overflow ?? "",
            descriptionText: description?.textContent ?? "",
            descriptionWidth: description?.clientWidth ?? 0,
            descriptionWithinTwoLines: description && descriptionStyle
              ? description.scrollHeight <= Number.parseFloat(descriptionStyle.lineHeight) * 2 + 2
              : false,
            descriptionWithinThreeLines: description && descriptionStyle
              ? description.scrollHeight <= Number.parseFloat(descriptionStyle.lineHeight) * 3 + 2
              : false,
            titleFits: title ? title.scrollWidth <= title.clientWidth + 1 : false,
            titleWhiteSpace: title ? getComputedStyle(title).whiteSpace : "",
          };
        }));

        for (const [cardIndex, typography] of cardTypography.entries()) {
          const cardContext = `${productPage.route} tab ${tabIndex + 1} card ${cardIndex + 1} at ${viewport.width}x${viewport.height}`;
          expect(typography.descriptionDisplay).not.toBe("-webkit-box");
          expect(typography.descriptionOverflow).toBe("visible");
          const descriptionFits = productPage.route === "/en/products/dried-fruit-nuts"
            ? typography.descriptionWithinThreeLines
            : typography.descriptionWithinTwoLines;
          expect(descriptionFits, `${cardContext}: description exceeds its compact line budget (${JSON.stringify(typography)})`).toBeTruthy();
          expect(typography.titleFits, `${cardContext}: title overflows`).toBeTruthy();
          expect(typography.titleWhiteSpace).toBe("nowrap");
        }

        for (let index = 0; index < tabCounts[tabIndex]; index += 1) {
          const card = cards.nth(index);
          await expect(card).toHaveAttribute("aria-haspopup", "dialog");
          await expect(card).toHaveAttribute("aria-expanded", "false");
          const controlledDialogId = await card.getAttribute("aria-controls");
          expect(controlledDialogId).toBeTruthy();

          await card.click();
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          await expect(card).toHaveAttribute("aria-expanded", "true");
          await expect(dialog).toHaveAttribute("id", controlledDialogId ?? "");

          const productTitle = (await dialog.getByRole("heading", { level: 2 }).textContent())?.trim() ?? "";
          const cta = dialog.getByRole("link", { name: `Request a quote for ${productTitle}`, exact: true });
          await expect(cta).toBeVisible();

          const modalGeometry = await dialog.evaluate((panel) => {
            const header = panel.querySelector<HTMLElement>(".product-info-modal__decision-header");
            const scroller = panel.querySelector<HTMLElement>(".product-info-modal__decision-body");
            const action = panel.querySelector<HTMLElement>(".product-info-modal__decision-actions");
            const facts = panel.querySelector<HTMLElement>(".product-info-modal__decision-attributes");
            const points = panel.querySelector<HTMLElement>(".product-info-modal__decision-points ul");
            const headerRect = header?.getBoundingClientRect();
            const actionRect = action?.getBoundingClientRect();
            const panelRect = panel.getBoundingClientRect();
            return {
              actionBottom: actionRect?.bottom ?? Number.POSITIVE_INFINITY,
              actionTop: actionRect?.top ?? Number.NEGATIVE_INFINITY,
              clientHeight: scroller?.clientHeight ?? 0,
              factsColumns: facts ? getComputedStyle(facts).gridTemplateColumns.split(" ").length : 0,
              headerBottom: headerRect?.bottom ?? Number.POSITIVE_INFINITY,
              headerTop: headerRect?.top ?? Number.NEGATIVE_INFINITY,
              panelBottom: panelRect.bottom,
              panelCenter: panelRect.left + panelRect.width / 2,
              panelLeft: panelRect.left,
              panelRight: panelRect.right,
              panelTop: panelRect.top,
              pointsColumns: points ? getComputedStyle(points).gridTemplateColumns.split(" ").length : 0,
              scrollWidth: scroller?.scrollWidth ?? Number.POSITIVE_INFINITY,
              scrollHeight: scroller?.scrollHeight ?? Number.POSITIVE_INFINITY,
              scrollTop: scroller?.scrollTop ?? -1,
              width: panelRect.width,
            };
          });

          expect(modalGeometry.scrollTop).toBe(0);
          expect(modalGeometry.scrollHeight).toBeGreaterThanOrEqual(modalGeometry.clientHeight);
          expect(modalGeometry.scrollWidth).toBeLessThanOrEqual(modalGeometry.width + 1);
          expect(modalGeometry.headerTop).toBeGreaterThanOrEqual(modalGeometry.panelTop - 1);
          expect(modalGeometry.headerBottom).toBeLessThanOrEqual(modalGeometry.actionTop + 1);
          expect(modalGeometry.actionBottom).toBeLessThanOrEqual(modalGeometry.panelBottom + 1);
          expect(modalGeometry.pointsColumns).toBe(productPage.route === "/en/products/dairy-milk-powders" ? 0 : 1);

          if (viewport.width <= 767) {
            expect(modalGeometry.panelLeft).toBeCloseTo(0, 0);
            expect(modalGeometry.panelRight).toBeCloseTo(viewport.width, 0);
            expect(modalGeometry.panelBottom).toBeCloseTo(viewport.height, 0);
            expect(modalGeometry.factsColumns).toBe(1);
          } else {
            expect(modalGeometry.panelCenter).toBeCloseTo(viewport.width / 2, 0);
            expect(modalGeometry.factsColumns).toBe(2);
          }

          if (productPage.route === "/en/products/sugar") {
            await expect(dialog).not.toContainText(/Moisture|Ash content|Polarisation|Solubility/);
          }

          await page.keyboard.press("Escape");
          await expect(dialog).toBeHidden();
          await expect(card).toBeFocused();
          await expect(card).toHaveAttribute("aria-expanded", "false");
        }
      }
    }
  }
});

test("Elle Mina uses the unified decision-summary modal", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/products/elle-mina");

  const cards = page.locator("#range .product-image-card");
  await expect(cards).toHaveCount(3);

  for (let index = 0; index < 3; index += 1) {
    const card = cards.nth(index);
    await card.click();

    const dialog = page.getByRole("dialog");
    const productTitle = (await dialog.getByRole("heading", { level: 2 }).textContent())?.trim() ?? "";
    await expect(dialog.getByRole("heading", { name: "At a glance" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Key considerations" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Supply" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: `Request a quote for ${productTitle}`, exact: true })).toBeVisible();
    await expect(dialog.locator(".product-info-modal__technical")).toHaveCount(0);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
  }
});

test("Grains & Seeds has the intended structure, product CTA routing and keyboard accordion", async ({ page }) => {
  await page.goto("/en/products/grains-seeds");

  await expect(page.getByRole("heading", { name: "Connecting global harvests to the industries that depend on them." })).toBeVisible();
  await expect(page.locator("#range .product-image-card")).toHaveCount(4);
  await expect(page.locator("#key-facts .product-editorial-facts__card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Our Global Origination Network" })).toBeVisible();
  const originationGrid = page.locator("#services .product-services__media-grid");
  await expect(originationGrid.locator("article")).toHaveCount(3);
  await expect(originationGrid).not.toContainText(/01|02|03/);
  await expect(page.locator("#services .product-services__network-panel")).toHaveCount(0);
  await expect(page.locator("#services .product-services__network-visual")).toHaveCount(0);
  const originationImages = originationGrid.locator(".product-services__media-visual img");
  await expect(originationImages).toHaveCount(3);
  await expect(originationImages.nth(0)).toHaveAttribute("src", /origination-europe-harvest-user-v1\.webp/);
  await expect(originationImages.nth(0)).toHaveAttribute("alt", "Combine harvester cutting a broad golden grain field");
  await expect(originationImages.nth(1)).toHaveAttribute("src", /origination-americas-farm-user-v1\.webp/);
  await expect(originationImages.nth(1)).toHaveAttribute("alt", "Farmer tending rows of young corn plants in the field");
  await expect(originationImages.nth(2)).toHaveAttribute("src", /origination-export-hubs-user-v1\.webp/);
  await expect(originationImages.nth(2)).toHaveAttribute("alt", "Bulk grain beside cargo ships at an export port");
  await expect(page.getByRole("heading", { name: "The Black Sea & Europe" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The Americas" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Strategic Export Hubs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "High-Volume Execution Excellence" })).toBeVisible();
  await expect(page.locator("#integrated-value-chain .process-accordion-trigger")).toHaveCount(5);
  await expect(page.locator("#services + #integrated-value-chain")).toHaveCount(1);
  await expect(page.locator("#origins")).toHaveCount(0);
  await expect(page.locator("#technical-specifications")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "USDA Grain: World Markets and Trade" })).toHaveAttribute(
    "href",
    "https://apps.fas.usda.gov/psdonline/circulars/grain.pdf",
  );
  await expect(page.getByRole("link", { name: "USDA Oilseeds: World Markets and Trade" })).toHaveAttribute(
    "href",
    "https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf",
  );

  const millingCard = page.locator("#range .product-image-card").first();
  await millingCard.click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Request a quote for Milling Wheat" })).toHaveAttribute(
    "href",
    "/en/request-a-quote?category=grains-seeds&product=milling-wheat",
  );
  await page.keyboard.press("Escape");

  const vetting = page.getByRole("button", { name: /Vetting/ });
  await vetting.focus();
  await vetting.press("Enter");
  await expect(vetting).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Hands conducting a physical review of grain kernels",
  );

  await vetting.press("ArrowDown");
  const commercials = page.getByRole("button", { name: /Commercials/ });
  await expect(commercials).toBeFocused();
  await commercials.press("Space");
  await expect(commercials).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Metal grain storage silos in an open agricultural landscape",
  );

  const execution = page.getByRole("button", { name: /Execution/ });
  await execution.click();
  await expect(execution).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Cargo ship alongside a container terminal during shipment coordination",
  );

  for (const layout of [
    { columns: 3, height: 1000, width: 1440 },
    { columns: 1, height: 900, width: 900 },
    { columns: 1, height: 844, width: 390 },
  ]) {
    await page.setViewportSize({ width: layout.width, height: layout.height });
    await expect.poll(() => originationGrid.evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length)).toBe(layout.columns);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);

    if (layout.width === 1440) {
      const desktopGeometry = await originationGrid.evaluate((grid) => {
        const visuals = Array.from(grid.querySelectorAll<HTMLElement>(".product-services__media-visual"));
        const headings = Array.from(grid.querySelectorAll<HTMLElement>("h3"));
        return {
          heights: visuals.map((visual) => visual.getBoundingClientRect().height),
          headingTops: headings.map((heading) => heading.getBoundingClientRect().top),
          widths: visuals.map((visual) => visual.getBoundingClientRect().width),
        };
      });
      expect(Math.max(...desktopGeometry.widths) - Math.min(...desktopGeometry.widths)).toBeLessThanOrEqual(1);
      expect(Math.max(...desktopGeometry.heights) - Math.min(...desktopGeometry.heights)).toBeLessThanOrEqual(1);
      expect(Math.max(...desktopGeometry.headingTops) - Math.min(...desktopGeometry.headingTops)).toBeLessThanOrEqual(1);
    }
  }

  for (let imageIndex = 0; imageIndex < 3; imageIndex += 1) {
    const originationImage = originationImages.nth(imageIndex);
    await originationImage.scrollIntoViewIfNeeded();
    await expect.poll(() => originationImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test("Dried Fruit & Nuts exposes seven sourced products, three market facts and no specification matrix", async ({ page }) => {
  await page.goto("/en/products/dried-fruit-nuts");

  await expect(page.getByRole("heading", { name: "Connecting dried fruit and nut crops to the products and markets that depend on them." })).toBeVisible();
  const tabs = page.locator("#range").getByRole("tab");
  await expect(tabs).toHaveCount(2);
  await expect(page.locator("#key-facts .product-editorial-facts__card")).toHaveCount(3);
  await expect(page.locator("#integrated-value-chain .process-accordion-trigger")).toHaveCount(4);
  await expect(page.locator("#technical-specifications")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Selection criteria/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "INC Nuts & Dried Fruit Global Statistical Review 2025" })).toHaveAttribute(
    "href",
    "https://inc.nutfruit.org/inc-nuts-and-dried-fruit-global-statistical-review-2025-edition-available-now/",
  );
  await expect(page.getByRole("link", { name: "INC 2025 Annual Report" })).toHaveAttribute(
    "href",
    "https://inc.nutfruit.org/wp-content/uploads/2026/01/2025-ANNUAL-REPORT.pdf",
  );

  const productGroups = [
    ["raisins-sultanas", "dried-apricots", "dates", "dried-figs"],
    ["in-shell-pistachios", "pistachio-kernels", "walnuts"],
  ];

  for (let groupIndex = 0; groupIndex < productGroups.length; groupIndex += 1) {
    await tabs.nth(groupIndex).click();
    const cards = page.locator("#range .product-image-card");
    await expect(cards).toHaveCount(productGroups[groupIndex].length);

    for (let productIndex = 0; productIndex < productGroups[groupIndex].length; productIndex += 1) {
      const card = cards.nth(productIndex);
      await card.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText("Product form", { exact: true })).toBeVisible();
      await expect(dialog.getByText("Typical use", { exact: true })).toBeVisible();
      await expect(dialog.getByText("Supply basis", { exact: true })).toBeVisible();
      await expect(dialog.getByRole("link", { name: /Request/ })).toHaveAttribute(
        "href",
        `/en/request-a-quote?category=dried-fruit-nuts&product=${productGroups[groupIndex][productIndex]}`,
      );
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");

      if (groupIndex === 0 && productIndex === 0) {
        await dialog.getByRole("button", { name: "Close product details" }).click();
      } else if (groupIndex === 0 && productIndex === 1) {
        await page.locator(".product-info-modal--portfolio").click({ position: { x: 4, y: 4 } });
      } else {
        await page.keyboard.press("Escape");
      }

      await expect(dialog).toBeHidden();
      await expect(card).toBeFocused();
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
    }
  }

  await expect(page.getByRole("link", { name: "Discuss a dried fruit or nut requirement" })).toHaveAttribute(
    "href",
    "/en/request-a-quote?category=dried-fruit-nuts",
  );

  const quality = page.getByRole("button", { name: /Quality, Treatment & Food-Safety Review/ });
  await quality.focus();
  await quality.press("Enter");
  await expect(quality).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Dried apricots arranged on outdoor drying trays",
  );
});

test("Frozen Foods exposes five cold-chain routes, market context and accessible product details", async ({ page }) => {
  await page.goto("/en/products/frozen-foods");

  await expect(
    page.getByRole("heading", {
      name: "Frozen food sourcing built around a reliable cold chain.",
    }),
  ).toBeVisible();

  await expect(page.locator("#range").getByRole("tab")).toHaveCount(0);
  await expect(page.locator("#range .product-image-card")).toHaveCount(5);
  await expect(page.locator("#key-facts .product-editorial-facts__card")).toHaveCount(3);
  await expect(page.locator("#integrated-value-chain .process-accordion-trigger")).toHaveCount(4);
  await expect(page.locator("#technical-specifications")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Selection criteria/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Fortune Business Insights — Frozen Food Market" })).toHaveAttribute(
    "href",
    "https://www.fortunebusinessinsights.com/frozen-food-market-104138",
  );

  const productIds = [
    "french-fries",
    "frozen-fruit-vegetables",
    "frozen-poultry",
    "frozen-seafood",
    "frozen-pastry-bakery",
  ];
  const cards = page.locator("#range .product-image-card");

  for (let productIndex = 0; productIndex < productIds.length; productIndex += 1) {
    const card = cards.nth(productIndex);
    await card.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "At a glance" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Key considerations" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Supply" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Request/ })).toHaveAttribute(
      "href",
      `/en/request-a-quote?category=frozen-foods&product=${productIds[productIndex]}`,
    );
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    if (productIndex === 0) {
      await dialog.getByRole("button", { name: "Close product details" }).click();
    } else if (productIndex === 1) {
      await page.locator(".product-info-modal--portfolio").click({ position: { x: 4, y: 4 } });
    } else {
      await page.keyboard.press("Escape");
    }

    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  }

  await expect(page.getByRole("link", { name: "Discuss a frozen food requirement" })).toHaveAttribute(
    "href",
    "/en/request-a-quote?category=frozen-foods",
  );

  const quality = page.getByRole("button", { name: /Producer, Quality & Market Approval/ });
  await quality.focus();
  await quality.press("Enter");
  await expect(quality).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Laboratory worker reviewing frozen-food quality samples",
  );

  await quality.press("ArrowDown");
  const coldChain = page.getByRole("button", { name: /Packing, Shelf Life & Cold Chain/ });
  await expect(coldChain).toBeFocused();
  await coldChain.press("Space");
  await expect(coldChain).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Warehouse worker moving palletised goods in temperature-controlled storage",
  );
});

test("Starches & Sweeteners exposes 21 product routes, five families and a keyboard accordion", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/en/products/starches-sweeteners");

  await expect(page.getByRole("heading", { name: "Connecting crop-based ingredients to the performance your product needs." })).toBeVisible();
  const familyCounts = [7, 2, 5, 5, 2];
  const tabs = page.locator("#range").getByRole("tab");
  await expect(tabs).toHaveCount(5);
  expect(familyCounts.reduce((total, count) => total + count, 0)).toBe(21);
  await expect(page.locator("#key-facts .product-editorial-facts__card")).toHaveCount(3);
  await expect(page.locator("#integrated-value-chain .process-accordion-trigger")).toHaveCount(4);
  await expect(page.locator("#technical-specifications")).toHaveCount(0);
  await expect(page.locator("#origins")).toHaveCount(0);
  await expect(page.locator("[class*='map']")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /The European starch industry/ })).toHaveAttribute(
    "href",
    "https://starch.eu/the-european-starch-industry/",
  );

  const productIds = [
    "corn-starch",
    "tapioca-starch",
    "wheat-starch",
    "potato-starch",
    "rice-starch",
    "pea-starch",
    "modified-starches",
    "vital-wheat-gluten",
    "pea-protein",
    "glucose-syrup",
    "fructose-syrup",
    "maltodextrin",
    "dextrose-monohydrate",
    "dextrose-anhydrous",
    "sorbitol",
    "maltitol",
    "xylitol",
    "erythritol",
    "glycerol",
    "allulose",
    "stevia",
  ];
  let productIndex = 0;
  for (let tabIndex = 0; tabIndex < familyCounts.length; tabIndex += 1) {
    await tabs.nth(tabIndex).click();
    const familyCards = page.locator("#range .product-image-card");
    await expect(familyCards).toHaveCount(familyCounts[tabIndex]);

    for (let cardIndex = 0; cardIndex < familyCounts[tabIndex]; cardIndex += 1) {
      const card = familyCards.nth(cardIndex);
      await card.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.getByRole("link", { name: /Request/ })).toHaveAttribute(
        "href",
        `/en/request-a-quote?category=starches-sweeteners&product=${productIds[productIndex]}`,
      );
      await page.keyboard.press("Escape");
      await expect(card).toBeFocused();
      productIndex += 1;
    }
  }

  await tabs.first().click();
  const firstCard = page.locator("#range .product-image-card").first();
  await firstCard.click();
  const dialog = page.getByRole("dialog");
  const title = dialog.getByRole("heading", { name: "Corn Starch" });
  const close = dialog.getByRole("button", { name: "Close product details" });
  const cta = dialog.getByRole("link", { name: /Request/ });
  await expect(title).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(cta).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(cta).toBeFocused();
  await page.locator(".product-info-modal--portfolio").click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeHidden();
  await expect(firstCard).toBeFocused();

  const matching = page.getByRole("button", { name: /Ingredient & Grade Matching/ });
  await matching.focus();
  await matching.press("Enter");
  await expect(matching).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Wheat field extending toward large agricultural processing silos",
  );

  await matching.press("ArrowDown");
  const quality = page.getByRole("button", { name: /Quality, Regulatory & Sample Approval/ });
  await expect(quality).toBeFocused();
  await quality.press("Space");
  await expect(quality).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Laboratory team examining samples during a quality review",
  );
});

test("Dairy & Milk Powders exposes 13 decision modals, correct CTA routing and no map", async ({ page }) => {
  await page.goto("/en/products/dairy-milk-powders");

  await expect(page.getByRole("heading", { name: "Dairy & Milk Powders: The Essential Link in Global Nutrition" })).toBeVisible();
  const heroImage = page.locator("#overview .inner-page-hero__image");
  await expect(heroImage).toHaveAttribute("src", /dairy-hero-cattle-pasture-user-v1\.webp/);
  await expect(heroImage).toHaveAttribute("alt", "Mixed dairy cattle grazing across a broad green pasture");
  await expect(page.locator("#range .product-image-card")).toHaveCount(13);
  await expect(page.locator("#range").getByRole("tab")).toHaveCount(4);
  const origination = page.locator("#services");
  const originationGrid = origination.locator(".product-services__media-grid");
  const originationImages = originationGrid.locator(".product-services__media-visual img");
  await expect(page.getByRole("link", { name: "Origination" })).toHaveAttribute("href", "#services");
  await expect(originationGrid.locator("article")).toHaveCount(3);
  await expect(originationGrid).not.toContainText(/CEE|LATAM|TR \+ CN/);
  await expect(page.locator("#key-facts")).toHaveCount(0);
  await expect(originationImages.nth(0)).toHaveAttribute("src", /origination-europe-dairy-user-v1\.webp/);
  await expect(originationImages.nth(0)).toHaveAttribute(
    "alt",
    "Dairy farmer standing among Holstein cows inside a modern barn",
  );
  await expect(originationImages.nth(1)).toHaveAttribute("src", /origination-south-america-grass-fed-user-v1\.webp/);
  await expect(originationImages.nth(1)).toHaveAttribute(
    "alt",
    "Grazing horse on an Argentine grassland beneath snow-covered mountains",
  );
  await expect(originationImages.nth(2)).toHaveAttribute("src", /origination-manufacturing-hubs-user-v1\.webp/);
  await expect(originationImages.nth(2)).toHaveAttribute(
    "alt",
    "Milk tankers unloading at a dairy processing facility in Türkiye",
  );
  await expect(page.getByRole("heading", { name: "The European Heartland" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "South American Grass-Fed Excellence" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Innovative Manufacturing Hubs" })).toBeVisible();
  await expect(page.locator("#trade-process .process-accordion-trigger")).toHaveCount(5);
  await expect(page.locator("#origins")).toHaveCount(0);
  await expect(page.locator("[class*='map']")).toHaveCount(0);

  const cards = page.locator("#range .product-image-card");
  const productIds = [
    "whole-milk-powder",
    "skimmed-milk-powder",
    "buttermilk-powder",
    "instant-milk-powder",
    "fat-filled-milk-powder",
    "whey-powder",
    "lactose",
    "dairy-whey-permeate",
    "infant-grade-ingredients",
    "butter",
    "cheese",
    "cheese-analogues",
    "uht-milk",
  ];

  for (let index = 0; index < productIds.length; index += 1) {
    await cards.nth(index).click();
    const dialog = page.getByRole("dialog");
    const cta = dialog.getByRole("link", { name: /Request/ });
    await expect(cta).toHaveAttribute(
      "href",
      `/en/request-a-quote?category=dairy-milk-powders&product=${productIds[index]}`,
    );
    await page.keyboard.press("Escape");
    await expect(cards.nth(index)).toBeFocused();
  }

  const calibration = page.getByRole("button", { name: /Requirement Calibration/ });
  await calibration.focus();
  await calibration.press("ArrowDown");
  const origin = page.getByRole("button", { name: /Origin Integration/ });
  await expect(origin).toBeFocused();
  await origin.press("Space");
  await expect(origin).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#trade-process .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Holstein dairy cows grazing together in a green pasture",
  );

  for (const viewport of [
    { width: 360, height: 800 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/en/products/dairy-milk-powders");
    await expect.poll(() => originationGrid.evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length))
      .toBe(viewport.width === 1440 ? 3 : 1);
    const responsiveAudit = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      overflowingCardCopy: [...document.querySelectorAll<HTMLElement>("#range .product-image-card__copy")]
        .filter((element) => element.scrollWidth > element.clientWidth + 1).length,
      incompleteImages: [...document.querySelectorAll<HTMLImageElement>("#range img, #services img")]
        .filter((image) => !image.complete || image.naturalWidth === 0).length,
    }));
    expect(responsiveAudit.documentWidth).toBe(responsiveAudit.viewportWidth);
    expect(responsiveAudit.overflowingCardCopy).toBe(0);
    expect(responsiveAudit.incompleteImages).toBe(0);

    if (viewport.width === 1440) {
      const desktopGeometry = await originationGrid.evaluate((grid) => {
        const visuals = Array.from(grid.querySelectorAll<HTMLElement>(".product-services__media-visual"));
        const headings = Array.from(grid.querySelectorAll<HTMLElement>("h3"));
        return {
          heights: visuals.map((visual) => visual.getBoundingClientRect().height),
          headingTops: headings.map((heading) => heading.getBoundingClientRect().top),
          widths: visuals.map((visual) => visual.getBoundingClientRect().width),
        };
      });
      expect(Math.max(...desktopGeometry.widths) - Math.min(...desktopGeometry.widths)).toBeLessThanOrEqual(1);
      expect(Math.max(...desktopGeometry.heights) - Math.min(...desktopGeometry.heights)).toBeLessThanOrEqual(1);
      expect(Math.max(...desktopGeometry.headingTops) - Math.min(...desktopGeometry.headingTops)).toBeLessThanOrEqual(1);
    }

    if (viewport.width === 360) {
      await page.locator("#range .product-image-card").first().click();
      const modalBounds = await page.getByRole("dialog").evaluate((element) => element.getBoundingClientRect().toJSON());
      expect(modalBounds.x).toBeGreaterThanOrEqual(0);
      expect(modalBounds.width).toBeLessThanOrEqual(viewport.width);
      await page.keyboard.press("Escape");
    }
  }

  for (const selection of [
    ["buttermilk-powder", "Buttermilk Powder"],
    ["infant-grade-ingredients", "Infant Grade Ingredients"],
  ] as const) {
    await page.goto(`/en/request-a-quote?category=dairy-milk-powders&product=${selection[0]}`);
    await expect(page.locator(".selected-enquiry-product strong")).toHaveText(selection[1]);
    await expect(page.locator('.selected-enquiry-product input[name="productId"]')).toHaveValue(selection[0]);
  }
});

test("Fats & Oils has eight product routes, three metrics and a keyboard accordion", async ({ page }) => {
  await page.goto("/en/products/oils-fats");

  await expect(page.getByRole("heading", { name: "Connecting global oil crops to the industries that depend on them." })).toBeVisible();
  await expect(page.locator("#range .product-image-card")).toHaveCount(8);
  await expect(page.locator("#key-facts .product-editorial-facts__card")).toHaveCount(3);
  await expect(page.locator("#integrated-value-chain .process-accordion-trigger")).toHaveCount(4);
  await expect(page.locator("#technical-specifications")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "USDA Oilseeds: World Markets and Trade" })).toHaveAttribute(
    "href",
    "https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf",
  );

  const cards = page.locator("#range .product-image-card");
  const productIds = [
    "sunflower-oil",
    "corn-maize-oil",
    "olive-oil",
    "palm-oil",
    "palm-olein",
    "margarines",
    "bakery-pastry-fats",
    "specialty-fats",
  ];

  for (let index = 0; index < productIds.length; index += 1) {
    await cards.nth(index).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("link", { name: /Request/ })).toHaveAttribute(
      "href",
      `/en/request-a-quote?category=oils-fats&product=${productIds[index]}`,
    );
    await page.keyboard.press("Escape");
    await expect(cards.nth(index)).toBeFocused();
  }

  const matching = page.getByRole("button", { name: /Product, Process & Application Matching/ });
  await matching.focus();
  await expect(matching).toHaveAttribute("aria-expanded", "true");
  await matching.press("Enter");
  await expect(matching).toHaveAttribute("aria-expanded", "false");
  await matching.press("Enter");
  await expect(matching).toHaveAttribute("aria-expanded", "true");
  await matching.press("ArrowDown");

  const quality = page.getByRole("button", { name: /Quality, Safety & Certification/ });
  await expect(quality).toBeFocused();
  await quality.press("Space");
  await expect(quality).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#integrated-value-chain .process-showcase-media__item.is-active img")).toHaveAttribute(
    "alt",
    "Gloved laboratory technician reviewing an amber oil sample in a beaker",
  );
});

test("Conilon modal exposes catalogue grades and modal focus remains trapped", async ({ page }) => {
  await page.goto("/en/products/coffee");
  const conilonCard = page.locator("#range .product-image-card").last();
  await conilonCard.focus();
  await conilonCard.press("Enter");

  const dialog = page.getByRole("dialog");
  const title = dialog.getByRole("heading", { name: "Robusta Conilon" });
  const close = dialog.getByRole("button", { name: "Close product details" });
  const cta = dialog.getByRole("link", { name: "Request a quote for Robusta Conilon" });
  await expect(dialog).toContainText("7, 7/8 and 8");
  await expect(title).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(cta).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(cta).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(conilonCard).toBeFocused();

  await conilonCard.click();
  await page.locator(".product-info-modal--portfolio").click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeHidden();
  await expect(conilonCard).toBeFocused();
});

test("decision-summary mobile sheet keeps its header and action fixed while the body scrolls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto("/en/products/dairy-milk-powders");

  const card = page.getByRole("button", { name: "View commercial details for Fat Filled Milk Powders" });
  await card.press("Space");

  const dialog = page.getByRole("dialog");
  const body = dialog.locator(".product-info-modal__decision-body");
  const header = dialog.locator(".product-info-modal__decision-header");
  const action = dialog.locator(".product-info-modal__decision-actions");
  const cta = dialog.getByRole("link", { name: "Request a quote for Fat Filled Milk Powders" });
  await expect(cta).toBeVisible();

  const before = await dialog.evaluate((panel) => {
    const headerRect = panel.querySelector<HTMLElement>(".product-info-modal__decision-header")?.getBoundingClientRect();
    const actionRect = panel.querySelector<HTMLElement>(".product-info-modal__decision-actions")?.getBoundingClientRect();
    return { actionTop: actionRect?.top ?? 0, headerTop: headerRect?.top ?? 0 };
  });

  await body.evaluate((node) => { node.scrollTop = node.scrollHeight; });
  await expect.poll(() => body.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);

  const after = await dialog.evaluate((panel) => {
    const headerRect = panel.querySelector<HTMLElement>(".product-info-modal__decision-header")?.getBoundingClientRect();
    const actionRect = panel.querySelector<HTMLElement>(".product-info-modal__decision-actions")?.getBoundingClientRect();
    return { actionTop: actionRect?.top ?? 0, headerTop: headerRect?.top ?? 0 };
  });

  expect(after.headerTop).toBeCloseTo(before.headerTop, 0);
  expect(after.actionTop).toBeCloseTo(before.actionTop, 0);
  await expect(header).toBeVisible();
  await expect(action).toBeVisible();
});

test("Cocoa origin pins support pointer, Enter and Space selection", async ({ page }) => {
  await page.goto("/en/products/cocoa-products");

  const ghana = page.getByRole("button", { name: "Show Ghana cocoa origin information" });
  await ghana.locator(".product-origins__pin-dot").click();
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Ghana");

  const nigeria = page.getByRole("button", { name: "Show Nigeria cocoa origin information" });
  await nigeria.focus();
  await nigeria.press("Enter");
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Nigeria");

  const cameroon = page.getByRole("button", { name: "Show Cameroon cocoa origin information" });
  await cameroon.focus();
  await cameroon.press("Space");
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Cameroon");

  const togo = page.getByRole("button", { name: "Show Togo cocoa origin information" });
  await togo.locator(".product-origins__pin-dot").click();
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Togo");

  const sierraLeone = page.getByRole("button", { name: "Show Sierra Leone cocoa origin information" });
  await sierraLeone.focus();
  await sierraLeone.press("Enter");
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Sierra Leone");

  const liberia = page.getByRole("button", { name: "Show Liberia cocoa origin information" });
  await liberia.focus();
  await liberia.press("Space");
  await expect(page.locator(".product-origins__detail-content.is-active h3")).toHaveText("Liberia");
});

test("origin sections keep a stable height across every pin and breakpoint", async ({ page }) => {
  test.setTimeout(90_000);

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 900, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of ["/en/products/coffee", "/en/products/cocoa-products"]) {
      await page.goto(route);
      const showcase = page.locator("#origins .product-origins__showcase");
      await showcase.scrollIntoViewIfNeeded();
      const initialHeight = await showcase.evaluate((element) => element.getBoundingClientRect().height);
      const pins = page.locator("#origins .product-origins__pin");
      const pinCount = await pins.count();

      for (let index = 0; index < pinCount; index += 1) {
        await pins.nth(index).focus();
        await pins.nth(index).press("Enter");
        await expect(page.locator(".product-origins__detail-content.is-active")).toBeVisible();
        const selectedHeight = await showcase.evaluate((element) => element.getBoundingClientRect().height);
        expect(Math.abs(selectedHeight - initialHeight)).toBeLessThan(1);
      }
    }
  }
});

test("fact cards use one metric, one title and one paragraph with count-up motion", async ({ page }) => {
  test.setTimeout(90_000);
  const pageMetrics = [
    { initial: "0.0m / 0.0m", route: "/en/products/coffee", values: ["178.8m / 173.9m", "71.9m", "47.5m / 24.4m"] },
    { initial: "0m+", route: "/en/products/sugar", values: ["189m+", "59%", "1908"] },
    { initial: "0–0", route: "/en/products/cocoa-products", values: ["30–40", "≈400", "5–7 days"] },
    { initial: "0m", route: "/en/products/grains-seeds", values: ["820m", "1.30bn", "62.7m"] },
    { initial: "0.0m", route: "/en/products/oils-fats", values: ["244.7m", "≈50%", "23.6m"] },
    { initial: "0m", route: "/en/products/starches-sweeteners", values: ["22m", "9.8m", "48%"] },
    { initial: "0.00m", route: "/en/products/dried-fruit-nuts", values: ["6.02m", "3.25m", "78%"] },
  ];

  for (const pageMetric of pageMetrics) {
    await page.goto(pageMetric.route);
    const cards = page.locator("#key-facts .product-editorial-facts__card");
    await expect(cards).toHaveCount(3);
    await expect(page.locator("#key-facts .product-editorial-facts__metric-label")).toHaveCount(0);

    for (let index = 0; index < pageMetric.values.length; index += 1) {
      const card = cards.nth(index);
      await expect(card.locator(".product-editorial-facts__metric")).toHaveCount(1);
      await expect(card.locator("h3")).toHaveCount(1);
      await expect(card.locator(".type-body")).toHaveCount(1);
    }

    const firstMetric = page.locator(`[data-final-metric="${pageMetric.values[0]}"]`);
    await expect(firstMetric).toHaveText(pageMetric.initial);
    await firstMetric.scrollIntoViewIfNeeded();

    for (const value of pageMetric.values) {
      await expect(page.locator(`[data-final-metric="${value}"]`)).toHaveText(value, { timeout: 3_000 });
    }
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/products/sugar");
  await expect(page.locator('[data-final-metric="1908"]')).toHaveText("1908");
  await expect(page.getByRole("heading", { name: "Ford Model T and early fuel research" })).toBeVisible();
  await page.goto("/en/products/grains-seeds");
  await expect(page.locator('[data-final-metric="1.30bn"]')).toHaveText("1.30bn");
  await page.goto("/en/products/starches-sweeteners");
  await expect(page.locator('[data-final-metric="9.8m"]')).toHaveText("9.8m");
});

test("fact card metrics and paragraphs align across product pages", async ({ page }) => {
  test.setTimeout(60_000);
  const routes = ["/en/products/coffee", "/en/products/sugar", "/en/products/cocoa-products", "/en/products/grains-seeds", "/en/products/oils-fats", "/en/products/starches-sweeteners", "/en/products/dried-fruit-nuts"];

  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    const desktopCards = page.locator("#key-facts .product-editorial-facts__card");
    const desktopGeometry = await desktopCards.evaluateAll((cards) => cards.map((card) => ({
      bodyTop: card.querySelector(".type-body")?.getBoundingClientRect().top ?? 0,
      cardHeight: card.getBoundingClientRect().height,
      metricTop: card.querySelector(".product-editorial-facts__metric")?.getBoundingClientRect().top ?? 0,
      titleSize: Number.parseFloat(getComputedStyle(card.querySelector("h3") as HTMLElement).fontSize),
    })));

    expect(Math.max(...desktopGeometry.map((item) => item.metricTop)) - Math.min(...desktopGeometry.map((item) => item.metricTop))).toBeLessThanOrEqual(1);
    expect(Math.max(...desktopGeometry.map((item) => item.bodyTop)) - Math.min(...desktopGeometry.map((item) => item.bodyTop))).toBeLessThanOrEqual(1);
    expect(Math.max(...desktopGeometry.map((item) => item.cardHeight)) - Math.min(...desktopGeometry.map((item) => item.cardHeight))).toBeLessThanOrEqual(1);
    expect(Math.max(...desktopGeometry.map((item) => item.titleSize))).toBeLessThanOrEqual(20);

    await page.setViewportSize({ width: 900, height: 900 });
    await page.goto(route);
    const tabletCards = page.locator("#key-facts .product-editorial-facts__card");
    const tabletGeometry = await tabletCards.evaluateAll((cards) => cards.map((card) => ({
      bodyTop: card.querySelector(".type-body")?.getBoundingClientRect().top ?? 0,
      metricTop: card.querySelector(".product-editorial-facts__metric")?.getBoundingClientRect().top ?? 0,
      titleMinHeight: getComputedStyle(card.querySelector("h3") as HTMLElement).minHeight,
    })));

    expect(Math.abs(tabletGeometry[0].metricTop - tabletGeometry[1].metricTop)).toBeLessThanOrEqual(1);
    expect(Math.abs(tabletGeometry[0].bodyTop - tabletGeometry[1].bodyTop)).toBeLessThanOrEqual(1);
    expect(tabletGeometry[2].titleMinHeight).toBe("0px");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const mobileAudit = await page.locator("#key-facts").evaluate((section) => ({
      documentWidth: document.documentElement.scrollWidth,
      titleMinHeights: [...section.querySelectorAll(".product-editorial-facts__content h3")]
        .map((title) => getComputedStyle(title).minHeight),
      viewportWidth: document.documentElement.clientWidth,
    }));

    expect(mobileAudit.documentWidth).toBe(mobileAudit.viewportWidth);
    expect(mobileAudit.titleMinHeights).toEqual(["0px", "0px", "0px"]);
  }
});

test("quote form uses native validation and prevents duplicate submissions", async ({ page }) => {
  let requestCount = 0;
  await page.route("**/api/enquiries", async (route) => {
    requestCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 350));
    await route.fulfill({
      body: JSON.stringify({ ok: true, requestId: "QA-TEST" }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.goto("/en/request-a-quote");
  const submit = page.getByRole("button", { name: "Send requirement" });
  await submit.click();
  expect(await page.locator(":invalid").count()).toBeGreaterThan(0);
  expect(requestCount).toBe(0);

  await page.getByRole("combobox", { name: /Product category/ }).click();
  await page.getByRole("option", { name: "Sugar" }).click();
  await page.locator('[name="name"]').fill("QA User");
  await page.locator('[name="company"]').fill("A3 QA");
  await page.locator('[name="email"]').fill("qa@example.com");
  await page.locator('[name="country"]').fill("United Kingdom");
  await page.locator('[name="estimatedVolume"]').fill("One container");
  await page.locator('[name="destination"]').fill("London");

  await submit.dblclick();
  await expect(page.getByText("QA-TEST")).toBeVisible();
  expect(requestCount).toBe(1);
});

test("catalogue files and branded 404 are available", async ({ page, request }) => {
  for (const catalogue of [
    "/assets/a3/resources/a3-coffee-catalogue.pdf",
    "/assets/a3/resources/a3-sugar-catalogue.pdf",
  ]) {
    const response = await request.get(catalogue);
    expect(response.ok(), `${catalogue} returned ${response.status()}`).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
  }

  const response = await page.goto("/en/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to homepage" })).toBeVisible();
});
