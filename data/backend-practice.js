//creates new HTTP to send to the backend
const xhr = new XMLHttpRequest();

//waiting for the string load which means the response has loaded
//once it has loaded we then can get the xhr.response

//get response
//but it takes time so at first it might be undefined while we get the response back
//so we need to wait for the response
xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});
//first parameter is what type of http message to send
// GET, POST, PUT, DELETE
//second parameter is where to send
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();

//using browser is same as using 'GET' request
