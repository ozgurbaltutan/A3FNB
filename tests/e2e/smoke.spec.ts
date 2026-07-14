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

test("Coffee origins and Coffee and Sugar service accordions respond", async ({ page }) => {
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
});

test("product cards and decision-summary modals stay compact across breakpoints", async ({ page }) => {
  test.setTimeout(120_000);

  const productPages = [
    { count: 4, route: "/en/products/sugar" },
    { count: 5, route: "/en/products/coffee" },
    { count: 4, route: "/en/products/cocoa-products" },
  ];

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const productPage of productPages) {
      await page.goto(productPage.route);
      const cards = page.locator("#range .product-image-card");
      await expect(cards).toHaveCount(productPage.count);

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
          titleFits: title ? title.scrollWidth <= title.clientWidth + 1 : false,
          titleWhiteSpace: title ? getComputedStyle(title).whiteSpace : "",
        };
      }));

      for (const [cardIndex, typography] of cardTypography.entries()) {
        const cardContext = `${productPage.route} card ${cardIndex + 1} at ${viewport.width}x${viewport.height}`;
        expect(typography.descriptionDisplay).not.toBe("-webkit-box");
        expect(typography.descriptionOverflow).toBe("visible");
        expect(
          typography.descriptionWithinTwoLines,
          `${cardContext}: description exceeds two lines (${JSON.stringify(typography)})`,
        ).toBeTruthy();
        expect(typography.titleFits, `${cardContext}: title overflows`).toBeTruthy();
        expect(typography.titleWhiteSpace).toBe("nowrap");
      }

      for (let index = 0; index < productPage.count; index += 1) {
        const card = cards.nth(index);
        await card.click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        const cta = dialog.getByRole("link", { name: /Request/ });
        await expect(cta).toBeVisible();

        const modalGeometry = await dialog.evaluate((panel) => {
          const scroller = panel.querySelector<HTMLElement>(".product-info-modal__technical");
          const action = panel.querySelector<HTMLElement>(".product-info-modal__technical-actions");
          const actionRect = action?.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();
          return {
            actionBottom: actionRect?.bottom ?? Number.POSITIVE_INFINITY,
            clientHeight: scroller?.clientHeight ?? 0,
            panelBottom: panelRect.bottom,
            scrollHeight: scroller?.scrollHeight ?? Number.POSITIVE_INFINITY,
            scrollTop: scroller?.scrollTop ?? -1,
          };
        });

        expect(modalGeometry.scrollTop).toBe(0);
        expect(modalGeometry.scrollHeight).toBeLessThanOrEqual(modalGeometry.clientHeight + 1);
        expect(modalGeometry.actionBottom).toBeLessThanOrEqual(Math.min(modalGeometry.panelBottom, viewport.height) + 1);

        if (productPage.route === "/en/products/sugar") {
          await expect(dialog).not.toContainText(/Moisture|Ash content|Polarisation|Solubility/);
        }

        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(card).toBeFocused();
      }
    }
  }
});

test("Conilon modal exposes catalogue grades and modal focus remains trapped", async ({ page }) => {
  await page.goto("/en/products/coffee");
  const conilonCard = page.locator("#range .product-image-card").last();
  await conilonCard.click();

  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Close product details" });
  const cta = dialog.getByRole("link", { name: "Request availability for this profile" });
  await expect(dialog).toContainText("7, 7/8 and 8");
  await expect(close).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(cta).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(conilonCard).toBeFocused();

  await conilonCard.click();
  await page.locator(".product-info-modal--portfolio").click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeHidden();
  await expect(conilonCard).toBeFocused();
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
  const pageMetrics = [
    { initial: "0.0m / 0.0m", route: "/en/products/coffee", values: ["178.8m / 173.9m", "71.9m", "47.5m / 24.4m"] },
    { initial: "0m+", route: "/en/products/sugar", values: ["189m+", "59%", "1908"] },
    { initial: "0–0", route: "/en/products/cocoa-products", values: ["30–40", "≈400", "5–7 days"] },
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
});

test("fact card metrics and paragraphs align across product pages", async ({ page }) => {
  test.setTimeout(60_000);
  const routes = ["/en/products/coffee", "/en/products/sugar", "/en/products/cocoa-products"];

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
