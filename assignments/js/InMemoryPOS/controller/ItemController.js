// load all at the beginning
getAllItems();

// get data from selected raw on click
$('#tblItem').on('click', 'tr', function () {
    // Get the data from the selected row
    let itemCode = $(this).find('td:eq(0)').text();
    let itemName = $(this).find('td:eq(1)').text();
    let itemQty = $(this).find('td:eq(2)').text();
    let itemUnitPrice = $(this).find('td:eq(3)').text();

    // Set the values to the fields
    $("#txtItemCode").val(itemCode);
    $("#txtItemName").val(itemName);
    $("#txtItemQTY").val(itemQty);
    $("#txtItemPrice").val(itemUnitPrice);

    changeTextFieldColorsToBack([itemIDField, itemNameField, itemQtyField, itemUnitPriceField]);
});


//  Save item
$("#btnSaveItem").click(function () {
    if (checkValidItem()) {
        let itemCode = $("#txtItemCode").val();
        let itemName = $("#txtItemName").val();
        let itemQty = $("#txtItemQTY").val();
        let itemUnitPrice = $("#txtItemPrice").val();

        let newItem = Object.assign({}, item);
        newItem.code = itemCode;
        newItem.itemName = itemName;
        newItem.qtyOnHand = itemQty;
        newItem.unitPrice = itemUnitPrice;

        if (!checkExistItem(newItem.code)) {
            itemDB.push(newItem);
            loadAllItemCodes();
            alert("New Item Add !");

        } else {
            alert("Same Code !");
        }
    } else {
        alert("Try again !");
    }
    getAllItems();
    clearAllItemFields();

    $("#txtItemCode").focus();
});

// update customer
$('#btnUpdateItem').click(function () {
    if (checkValidItem()) {
        // Get data
        let itemCode = $("#txtItemCode").val();
        let itemName = $("#txtItemName").val();
        let itemQty = $("#txtItemQTY").val();
        let itemUnitPrice = $("#txtItemPrice").val();

        // Set new data to existing object (using id)
        for (let i = 0; i < itemDB.length; i++) {
            if (itemCode === itemDB[i].code) {
                // Confirm update
                let confirmUpdate = confirm("Do you want to update?");

                if (confirmUpdate) {
                    // Update the object in the array
                    itemDB[i].itemName = itemName;
                    itemDB[i].qtyOnHand = itemQty;
                    itemDB[i].unitPrice = itemUnitPrice;

                    loadAllItemCodes();
                    // Exit the loop
                    break;
                }
            }
        }
    } else {
        alert("Try again !");
    }
    getAllItems();
    clearAllItemFields();
});

function getAllItems() {
    let tBody = $("#tblItem");

    // Clear table
    tBody.empty();

    // Load all values
    for (let i = 0; i < itemDB.length; i++) {
        let tr = $(`<tr>
                        <td>${itemDB[i].code}</td>
                        <td>${itemDB[i].itemName}</td>
                        <td>${itemDB[i].unitPrice}</td>
                        <td>${itemDB[i].qtyOnHand}</td>
                   </tr>`);
        tBody.append(tr);
    }
}

$('#btnSearchItem').click(function () {
    let searchTxt = $("#txtSearchItem").val();
    if (searchTxt !== "") {
        getSearchItem(searchTxt);
    } else {
        alert("Input Data!")
        getAllItems();
    }
});

$('#txtSearchItem').on('keyup', function () {
    let searchTxt = $("#txtSearchItem").val();
    if (searchTxt !== "") {
        getSearchItem(searchTxt);
    } else {
        getAllItems();
    }
});

function getSearchItem(searchTxt) {
    let tBody = $("#tblItem");

    // Clear table
    tBody.empty();

    // Load matching values
    let found = false;
    for (let i = 0; i < itemDB.length; i++) {
        if (
            searchTxt.includes(itemDB[i].code) ||
            searchTxt.includes(itemDB[i].itemName) ||
            searchTxt.includes(itemDB[i].qtyOnHand) ||
            searchTxt.includes(itemDB[i].unitPrice)
        ) {
            let tr = $(`<tr>
                            <td>${itemDB[i].code}</td>
                            <td>${itemDB[i].itemName}</td>
                            <td>${itemDB[i].qtyOnHand}</td>
                            <td>${itemDB[i].unitPrice}</td>
                        </tr>`);
            tBody.append(tr);
            found = true;
        }
    }

    if (!found) {
        getAllItems();
    }
}


// button cancel , clear fields
$('#btnCancelItem').click(function () {
    clearAllItemFields();
});

function clearAllItemFields() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemQTY").val("");
    $("#txtItemPrice").val("");

    changeTextFieldColorsToBack([itemIDField, itemNameField, itemQtyField, itemUnitPriceField]);
    customerFormHideErrorMessages();
}

// button delete
$('#btnDeleteItem').click(function () {
    if (checkValidItem()) {
        let selectedID = $("#txtItemCode").val();

        // search matching ID from arraylist, and delete the object with that id
        for (let i = 0; i < itemDB.length; i++) {
            if (selectedID === itemDB[i].code) {
                // Delete the object from the array
                let b = confirm("Do you want to delete?");
                if (b) {
                    itemDB.splice(i, 1);
                    loadAllItemCodes();
                    break; // Exit the loop
                }
                break; // Exit the loop
            }
        }
    } else {
        alert("Try again !");
    }

    // update table
    getAllItems();
    clearAllItemFields()
});

// check customer is exists
function checkExistItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (code === itemDB[i].code) {
            return true;
        }
    }
    return false;
}

// refresh
$('#btnRefreshItem').click(function () {
    getAllItems();
});
