import { test, expect } from "@playwright/test";

test.describe("Estates — smoke", () => {
  test("homepage loads and shows the hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Estates/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Find Your Place/i);
    await expect(page.getByRole("link", { name: /Explore Properties/i })).toBeVisible();
  });

  test("navigates to properties and filters", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Explore Properties/i }).first().click();
    await expect(page).toHaveURL(/\/properties/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("opens a property detail page", async ({ page }) => {
    await page.goto("/properties");
    const firstCard = page.locator("a[href^='/properties/']").first();
    await firstCard.click();
    await expect(page.getByText(/Request information/i)).toBeVisible();
    await expect(page.getByText(/Amenities/i)).toBeVisible();
  });

  test("about, news and contact load", async ({ page }) => {
    for (const route of ["/about", "/news", "/contact"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("sitemap and robots respond", async ({ request }) => {
    const sm = await request.get("/sitemap.xml");
    expect(sm.ok()).toBeTruthy();
    const rb = await request.get("/robots.txt");
    expect(rb.ok()).toBeTruthy();
  });
});
