let isValidOrderItemQty = false;
let orderItemQtyField = $('#OrderItemQty');
let orderItemQtyOnH = $('#OrderItemQtyOnH');

// regex pattern
let regexItemQty = /^(?!0+(\.0+)?$)\d+(\.\d{1,2})?$/;

orderItemQtyField.on('keyup', function () {
    let enteredQty = parseInt(orderItemQtyField.val());
    let availableQty = parseInt(orderItemQtyOnH.val());

    isValidOrderItemQty = isValid(regexItemQty, orderItemQtyField.val()) && (enteredQty <= availableQty);

    changeTextFieldColors(orderItemQtyField, isValidOrderItemQty);
});

let valid;

function checkCashValidity() {
    let restValue = parseFloat($('#rest').val());

    valid = restValue >= 0;

    changeTextFieldColors($('#cash'), valid);
}


function checkIsValidOrder() {
    if ($('#OrderCusName').val() && $('#OrderCusAddress').val() &&
        $('#tblOrders').children().length > 0 && $('#cash').val() && valid) {
        return true;
    } else {
        return false;
    }
}
