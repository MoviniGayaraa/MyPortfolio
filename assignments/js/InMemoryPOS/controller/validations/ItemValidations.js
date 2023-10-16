let isValidCode = false;
let isValidItemName = false;
let isValidQty = false;
let isValidUnitPrice = false;

function checkValidItem() {
    isValidCode = isValid(regexItemCode, itemIDField.val());
    isValidItemName = isValid(regexItemName, itemNameField.val());
    isValidQty = isValid(regexQty, itemQtyField.val());
    isValidUnitPrice = isValid(regexUnitPrice, itemUnitPriceField.val());

    return isValidCode && isValidItemName && isValidQty && isValidUnitPrice;
}

// text fields
let itemIDField = $('#txtItemCode');
let itemNameField = $('#txtItemName');
let itemQtyField = $('#txtItemQTY');
let itemUnitPriceField = $('#txtItemPrice');

// regex patterns
let regexItemCode = /^(I00-)[0-9]{3}$/;
let regexItemName = /^[A-Za-z ]{5,}$/;
let regexQty = /^[0-9]+$/;
let regexUnitPrice= /^[0-9]+([.][0-9]{2})?$/;

//error labels
let invalidItemIdMessage = $('#invalidCodeMessage');
let invalidItemNameMessage = $('#invalidItemNameMessage');
let invalidQtyMessage = $('#invalidItemQTYMessage');
let invalidUnitPriceMessage = $('#invalidItemPriceMessage');

//hide at beginning
ItemFormHideErrorMessages()

function ItemFormHideErrorMessages() {
    invalidItemIdMessage.hide();
    invalidItemNameMessage.hide();
    invalidQtyMessage.hide();
    invalidUnitPriceMessage.hide();
}

// keyup functions
// Validate Code
itemIDField.on('keyup', function () {
    isValidCode = isValid(regexItemCode, itemIDField.val());
    MakeChanges(isValidCode,itemIDField,invalidItemIdMessage);
});

// Validate Name
itemNameField.on('keyup', function () {
    isValidItemName = isValid(regexItemName, itemNameField.val());
    MakeChanges(isValidItemName,itemNameField,invalidItemNameMessage);
});

// validate qty
itemQtyField.on('keyup', function () {
    isValidQty = isValid(regexQty, itemQtyField.val());
    MakeChanges(isValidQty,itemQtyField,invalidQtyMessage);
});

// validate price
itemUnitPriceField.on('keyup', function () {
    isValidUnitPrice = isValid(regexUnitPrice, itemUnitPriceField.val());
    MakeChanges(isValidUnitPrice,itemUnitPriceField,invalidUnitPriceMessage);
});

///////////////////////////////////////////////

// disable tab
$("#txtItemCode,#txtItemName,#txtItemQTY,#txtItemPrice").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

// press enter to go next text fields (simulate tab)
$("#txtItemCode").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtItemName').focus();
    }
});

$("#txtItemName").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtItemQTY').focus();
    }
});

$("#txtItemQTY").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtItemPrice').focus();
    }
});


