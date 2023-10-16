// Navigation
let login = document.getElementById('login');
let navBar = document.getElementById('navigation-bar');
let home = document.getElementById('home');

let mng_cus = document.getElementById('manage-customer');
let mng_store = document.getElementById('mng-store');
let mng_orders = document.getElementById('mng-orders');
let place_order = document.getElementById('place-order');

login.style.display = 'block';
navBar.style.display = 'none';
home.style.display = 'none';

mng_cus.style.display = 'none';
mng_store.style.display = 'none';
mng_orders.style.display = 'none';
place_order.style.display = 'none';

function loginBtn() {
    login.style.display = 'none';

    home.style.display = 'block';
    navBar.style.display = 'block';
}

function logoutBtn() {
    login.style.display = 'block';

    navBar.style.display = 'none';
    home.style.display = 'none';
    mng_cus.style.display = 'none';
    mng_store.style.display = 'none';
    mng_orders.style.display = 'none';
    place_order.style.display = 'none';
}

function placeOrderForm() {
    place_order.style.display = 'block';

    home.style.display = 'none';
    mng_cus.style.display = 'none';
    mng_store.style.display = 'none';
    mng_orders.style.display = 'none';
}

function mngOrder() {
    mng_orders.style.display = 'block';

    home.style.display = 'none';
    mng_cus.style.display = 'none';
    mng_store.style.display = 'none';
    place_order.style.display = 'none';
}

function mngStore() {
    mng_store.style.display = 'block';

    home.style.display = 'none';
    mng_cus.style.display = 'none';
    mng_orders.style.display = 'none';
    place_order.style.display = 'none';
}

function mngCustomer() {
    mng_cus.style.display = 'block';

    home.style.display = 'none';
    mng_store.style.display = 'none';
    mng_orders.style.display = 'none';
    place_order.style.display = 'none';
}

function goHome() {
    home.style.display = 'block';

    mng_cus.style.display = 'none';
    mng_store.style.display = 'none';
    mng_orders.style.display = 'none';
    place_order.style.display = 'none';
}
