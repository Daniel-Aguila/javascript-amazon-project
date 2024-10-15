import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";

//for async await we do try/catch to catch errors
//can also use try/catch with synchronous code (normal code)
//meant to handle unexpected errors (outside our control)

//async await 

//async makes a function return a promis (wraps the code in a promise)
async function loadPage(){
    try {
        //throw an error
        throw 'error1'; //manually create an error and going to skipp the rest of the errors and go straigth to catch
        //code that could cause an error
        await loadProductsFetch();

        const value = await new Promise((resolve) => {
            loadCart(() => {
                resolve('value3');
            });
        });

        console.log('load page');
    } catch (error){
        console.log('Unexpected error');
    }

    renderOrderSummary();
    renderPaymentSummary();
} //value2 gets saved in 'value'
loadPage()
//await lets us write asynchronous code like normal code
//await lets us 'wait' for a promise to finish before going to the next line
//this way you can just write line by line like normal without needing .then()


//resolve lets us control when to go to the next step
//we waited until loadProducts finishes, we can wait till one step finishes before going to next step

//promises are a better way to wait for async functions
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(()=>{
            resolve();
        });
    })

]).then((value) => {
    console.log(value);
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