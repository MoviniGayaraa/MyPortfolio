loadAllOrders();

// Get the table body element
function loadAllOrders() {
    let tblOrdersBody = $('#tblOrders');

    // Clear the table body
    tblOrdersBody.empty();

    // Iterate over the orderDB array and add rows to the table
    orderDB.forEach(function (order) {
        let items = order.cart.map(function (cartItem) {
            return cartItem.item.code + ' ( qty:' + cartItem.qty+' )';
        }).join(', ');

        let row = '<tr>' +
            '<td>' + order.orderID + '</td>' +
            '<td>' + order.date + '</td>' +
            '<td>' + order.customer.id + '</td>' +
            '<td>' + items + '</td>' +
            '<td>' + order.discount + '</td>' +
            '<td>' + order.total + '</td>' +
            '</tr>';

        tblOrdersBody.append(row);
    });
}
