import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import {loadCart} from '../data/cart.js'

//resolve lets us control when to go to the next step
//we waited until loadProducts finishes, we can wait till one step finishes before going to next step

//promises are a better way to wait for async functions
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart(()=>{
            resolve();
        });
    })

]).then((value) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) =>{
    console.log(value);

    return new Promise((resolve) => {
        loadCart(()=>{
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


//Promise vs callbakcs

//multiple callbacks cause a lot of nesting
//better to use promises

//Promise.all() lets us run multiple promises at the same time
//and wait for all of them to finish