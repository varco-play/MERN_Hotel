import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("privetchel2007@gmail.com");
  await page.locator("[name=password]").fill("121212");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Signed in Successfuly")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill(
      "This is a description for the Test Hotel sssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    );
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "4");

  await page.getByText("Budget").click();

  await page.getByLabel("Spa").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Test Hotel").first()).toBeVisible();
  await expect(page.getByText("Budget").first()).toBeVisible();
  await expect(page.getByText("$100 per night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 4 children").first()).toBeVisible();
  await expect(page.getByText("4 Start rating").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Hotel test");
  await page.locator('[name="name"]').fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  await page.locator('[name="name"]').fill("Hotel test");
  await page.getByRole("button", { name: "Save"}).click();
});
