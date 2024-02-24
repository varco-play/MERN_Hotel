import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:7000";
const random = Math.floor(Math.random() * 565) * 984;

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(`${UI_URL}/`); //goes to this page

  await page.getByRole("link", { name: "Sign in" }).click(); //find link by name and clicks it

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible(); // finds the heading of the page

  await page.locator("[name=email]").fill("privetchel2007@gmail.com"); //fills the input.name == email with email
  await page.locator("[name=password]").fill("121212"); // same but with name password and fill it with password

  await page.getByRole("button", { name: "Login" }).click(); //clicks the login button

  await expect(page.getByText("Signed in Successfuly")).toBeVisible(); //Checking the text in the page

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible(); //checking the link with text My Bookings
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible(); // same here
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible(); //and checks the link with text Sign out
});

test("should allow to sign up", async ({ page }) => {
  await page.goto(`${UI_URL}/`);
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible(); // finds the heading of the page
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible(); // finds the heading of the page

  await page.locator("[name=firstName]").fill("e2eTestName"); //fills the input.name == email with email
  await page.locator("[name=lastName]").fill("e2eTestSurname");
  await page.locator("[name=email]").fill(`testE2E-${random}@gmail.com`); //fills the input.name == email with email
  await page.locator("[name=password]").fill("e2ee2e");
  await page.locator("[name=confirmPassword]").fill("e2ee2e");
  await page.getByRole("button", { name: "Create Account" }).click(); //clicks the login button
  await expect(page.getByText("Registration Successed!")).toBeVisible(); //Checking the text in the page
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
