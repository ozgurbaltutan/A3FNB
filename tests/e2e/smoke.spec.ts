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
  const rondoniaPin = page.getByRole("button", { name: "Show Rondônia coffee origin information" });
  await rondoniaPin.focus();
  await rondoniaPin.press("Enter");
  await expect(page.locator(".product-origins__detail h3")).toHaveText("Rondônia");

  const exportCoordination = page.getByRole("button", { name: /Export Coordination/ });
  await exportCoordination.click();
  await expect(exportCoordination).toHaveAttribute("aria-expanded", "true");

  await page.goto("/en/products/sugar");
  const logistics = page.getByRole("button", { name: /Integrated Logistics/ });
  await logistics.click();
  await expect(logistics).toHaveAttribute("aria-expanded", "true");
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
