const { test, expect } = require("@playwright/test");

test('Pressing "Fetch message" shows message.', async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);          // hydration wait
  await page.getByRole("button", { name: "Fetch message" }).click();
  await expect(page.getByText("Message is: Hello world!")).toBeVisible();
});
