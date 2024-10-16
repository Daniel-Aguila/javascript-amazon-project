import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart } from "../../data/cart.js";
import {loadProductsFetch } from "../../data/products.js";



describe('test suite: renderOrderSummary', () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        `;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

        //the done function allow us to control when to go to the next step
        beforeAll((done) => {
            loadProductsFetch().then(() =>{
                done();
            });
        });

        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we are overriding getItem with this fake function
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage();

        renderOrderSummary();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        //doesn't have to be an exact match just as long as Quantity 2 is somewhere in there
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    });

    it('removes a product', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we are overriding getItem with this fake function
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage();

        renderOrderSummary();

        //click delete on the test
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});