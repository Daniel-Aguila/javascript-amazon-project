import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    //test name
    it('adds an existing product to the cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we are overriding getItem with this fake function
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage,'setItem');
        //create a mock
        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we are overriding getItem with this fake function
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    });
});