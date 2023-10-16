let isValidCusID = false;
let isValidName = false;
let isValidAddress = false;
let isValidSalary = false;

function checkValidCustomer() {
    isValidCusID = isValid(regexCusID, customerIDField.val());
    isValidName = isValid(regexName, customerNameField.val());
    isValidAddress = isValid(regexAddress, customerAddressField.val());
    isValidSalary = isValid(regexSalary, customerSalaryField.val());

    return isValidCusID && isValidName && isValidAddress && isValidSalary;
}

// text fields
let customerIDField = $('#txtCustomerID');
let customerNameField = $('#txtCustomerName');
let customerAddressField = $('#txtCustomerAddress');
let customerSalaryField = $('#txtCustomerSalary');

// regex patterns
let regexCusID = /^(C00-)[0-9]{3}$/;
let regexName = /^[A-Za-z ]{5,}$/;
let regexAddress = /^[A-Za-z ]{5,}$/;
let regexSalary = /^[0-9]{2,}([.][0-9]{2})?$/;

//error labels
let invalidIdMessage = $('#invalidIdMessage');
let invalidNameMessage = $('#invalidNameMessage');
let invalidAddressMessage = $('#invalidAddressMessage');
let invalidSalaryMessage = $('#invalidSalaryMessage');

//hide at beginning
customerFormHideErrorMessages()

function customerFormHideErrorMessages() {
    invalidIdMessage.hide();
    invalidNameMessage.hide();
    invalidAddressMessage.hide();
    invalidSalaryMessage.hide();
}

// keyup functions
// Validate ID
customerIDField.on('keyup', function () {
    isValidCusID = isValid(regexCusID, customerIDField.val());
    MakeChanges(isValidCusID,customerIDField,invalidIdMessage);
});

// Validate Name
customerNameField.on('keyup', function () {
    isValidName = isValid(regexName, customerNameField.val());
    MakeChanges(isValidName,customerNameField,invalidNameMessage);
});

// validate address
customerAddressField.on('keyup', function () {
    isValidAddress = isValid(regexAddress, customerAddressField.val());
    MakeChanges(isValidAddress,customerAddressField,invalidAddressMessage);
});

// validate salary
customerSalaryField.on('keyup', function () {
    isValidSalary = isValid(regexSalary, customerSalaryField.val());
    MakeChanges(isValidSalary,customerSalaryField,invalidSalaryMessage);
});

///////////////////////////////////////////////

// disable tab
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

// press enter to go next text fields (simulate tab)
$("#txtCustomerID").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtCustomerName').focus();
    }
});

$("#txtCustomerName").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtCustomerAddress').focus();
    }
});

$("#txtCustomerAddress").keydown(function (e){
    if(e.key === "Enter"){
        $('#txtCustomerSalary').focus();
    }
});


