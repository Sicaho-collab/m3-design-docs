import { test, expect } from '@playwright/test'

const BASE = 'https://sicaho-collab.github.io/m3-design-docs'

const ROUTES = [
  { hash: '', heading: 'M3 Design System' },
  { hash: '#/components/button', heading: 'Button' },
  { hash: '#/components/date-picker', heading: 'Date Picker' },
]

for (const route of ROUTES) {
  test(`smoke: ${route.hash || '/'} loads and renders`, async ({ page }) => {
    const url = route.hash ? `${BASE}/${route.hash}` : BASE
    const response = await page.goto(url, { waitUntil: 'networkidle' })

    // Root page should return 200
    expect(response?.status()).toBeLessThan(400)

    // The #root should have content (not blank)
    const root = page.locator('#root')
    await expect(root).not.toBeEmpty()

    // The heading text should appear somewhere on the page
    await expect(page.getByText(route.heading, { exact: false }).first()).toBeVisible({
      timeout: 10_000,
    })
  })
}
