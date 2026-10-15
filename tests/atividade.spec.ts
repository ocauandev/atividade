// funcionalidade 
// testar clique no botão add to cart
// testar clique do botão remove do carrinho
// clicar no produto leva para pagina do produto 


// integridade
// testar se o produto possui um titulo, descripção, preço e imagem


import  { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await login(page);
});

async function clickAddToCart(page: Page) {
    await page.click('#add-to-cart-sauce-labs-fleece-jacket');
    await expect(page.locator("#remove-sauce-labs-fleece-jacket")).toBeVisible();
}

test.describe('Testes de integridade do produto', () => {

    test('imagem do item visivel na tela da inventário', async ({page}) => {

    const image = page.getByRole('img', {name: 'Sauce Labs Fleece Jacket'});
    await expect(image).toBeVisible();
    });

    test('titulo do item visivel na tela da inventário', async ({page}) => {

        const title = page.locator('[data-test="item-5-title-link"]');
        await expect(title).toBeVisible();
    });
});

test.describe('Testes de funcionalidade do produto', () => {

    test('clicar no botão add to cart adiciona o item ao carrinho', async ({page}) => {
        // id add-to-cart-sauce-labs-fleece-jacket
        await page.click('#add-to-cart-sauce-labs-fleece-jacket');

        // id remove-sauce-labs-fleece-jacket
        await expect(page.locator("#remove-sauce-labs-fleece-jacket")).toBeVisible();
    });

    test('clicar no botão remove do carrinho remove o item do carrinho', async ({page}) => {
        await clickAddToCart(page);

        // id add-to-cart-sauce-labs-fleece-jacket
        await page.click('#remove-sauce-labs-fleece-jacket');

        // id remove-sauce-labs-fleece-jacket
        await expect(page.locator("#add-to-cart-sauce-labs-fleece-jacket")).toBeVisible();
    });

    test('clicar no titulo do produto leva para a página do produto', async ({page}) => {
        // clicou no titulo do produto
        await page.click('#item_5_title_link');

        //verificou url https://www.saucedemo.com/inventory-item.html?id=5
        await expect(page).toHaveURL(/inventory-item/);
    });

    test('clicar na imagem do produto leva para a página do produto', async ({page}) => {
        // clicou no produto
       const image = page.getByRole('img', {name: 'Sauce Labs Fleece Jacket'});

       await image.click();
       await expect(page).toHaveURL(/inventory-item/);
    });
});