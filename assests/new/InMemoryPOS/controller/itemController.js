$("#save-item").click(function () {
    saveItem();
});

function saveItem() {
    let code = $("#inputItemCode").val();
    let name = $("#inputItemName").val();
    let price = $("#inputItemPrice").val();
    let qty = $("#inputItemQuantity").val();
    if (code !== "" && validateCode()) {
        if (name !== "" && validateItemName()) {
            if (tel !== "" && validatePrice()) {
                if (address !== "" && validateQTY()) {
                    $("#item-table-body").empty();
                    if (checkCode(code)) {
                        let newItem = Object.assign({}, item);
                        newItem.code = code;
                        newItem.name = name;
                        newItem.price = price;
                        newItem.qty = qty;
                        itemDB.push(newItem);
                        loadItems();
                    } else {
                        alert("This item already exists");
                        loadItems();
                    }
                    clearNewItemForm();
                } else {
                    $("#inputItemQuantity").focus();
                }
            } else {
                $("#inputItemPrice").focus();
            }
        } else {
            $("#inputItemName").focus();
        }
    } else {
        $("#inputItemCode").focus();
    }
}

function loadItems() {
    let tableBody = $("#item-table-body");
    for (let i = 0; i < itemDB.length; i++) {
        let tr = `<tr>
                    <td>${itemDB[i].code}</td>
                    <td>${itemDB[i].name}</td>
                    <td>${itemDB[i].price}</td>
                    <td>${itemDB[i].qty}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
        tableBody.append(tr);
    }
    getUpdateItem();
    getDeleteItem();
}

$("#addNewItemClearButton").click(function () {
    clearNewItemForm();
});

function getDeleteItem() {
    $("#item-table-body>tr>td>button:nth-child(1)").click(function () {
        let code = $(this).parents("#item-table-body>tr").children().eq(0).text();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteItem(code);
            if (response) {
                alert("Item Deleted");
                $("#item-table-body").empty();
                loadItems();
            } else {
                alert("Item Not Removed..!");
            }
        }
    });
}

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        // item.log(code)
        if (itemDB[i].code === code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function getUpdateItem() {
    $("#item-table-body>tr>td>button:nth-child(2)").click(function () {
        let code = $(this).parents("#item-table-body>tr").children().eq(0).text();
        let name = $(this).parents("#item-table-body>tr").children().eq(1).text();
        let price = $(this).parents("#item-table-body>tr").children().eq(2).text();
        let qty = $(this).parents("#item-table-body>tr").children().eq(3).text();
        $('#inputUpdateItemCode').val(code);
        $('#inputUpdateItemName').val(name);
        $('#inputUpdateItemPrice').val(price);
        $('#inputUpdateItemQuantity').val(qty);
        popUpUpdateItemForm();
    });
}

function popUpUpdateItemForm() {
    let modalToggle = $('#item-table-body>tr');
    let myModal = new bootstrap.Modal($('#updateItem'));
    myModal.show(modalToggle);
}

function clearNewItemForm() {
    $("#inputItemCode,#inputItemName,#inputItemQuantity,#inputItemPrice").val("");
    $("#inputItemCode").focus();
}

function checkCode(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (code === itemDB[i].code) {
            return false;
        }
    }
    return true;
}

$("#itemSearchButton").click(function () {
    let x = $("#itemSearchBar").val();
    itemDB.filter(function (e) {
        if (e.code === x) {
            $("#item-table-body").empty();
            let tableBody = $("#item-table-body");
            let tr = `<tr>
                    <td>${e.code}</td>
                    <td>${e.name}</td>
                    <td>${e.price}</td>
                    <td>${e.qty}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
            tableBody.append(tr);
            getUpdateItem();
            getDeleteItem();
        } else {
            alert("This item code does not match");
        }
    });
});

$("#itemSearchClear").click(function () {
    $("#itemSearchBar").val("");
    $("#item-table-body").empty();
    loadItems();
});
let item1 = undefined;

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code === code;
    });
}

$("#itemUpdateButton").click(function () {
    updateItem();
});

function updateItem() {
    item1 = searchItem($("#inputUpdateItemCode").val());
    let itemName = $("#inputUpdateItemName").val();
    let itemPrice = $("#inputUpdateItemPrice").val();
    let itemQty = $("#inputUpdateItemQuantity").val();
    if (name !== "" && validateUpdateItemName()) {
        if (tel !== "" && validateUpdateItemPrice()) {
            if (address !== "" && validateUpdateItemQTY()) {
                item1.name = itemName;
                item1.price = itemPrice;
                item1.qty = itemQty;
                $("#item-table-body").empty();
                clearUpdateItemForm();
                loadItems();
            } else {
                $("#inputUpdateItemQuantity").focus();
            }
        } else {
            $("#inputUpdateItemPrice").focus();
        }
    } else {
        $("#inputUpdateItemName").focus();
    }
}

function clearUpdateItemForm() {
    $("#inputUpdateItemCode").val("");
    $("#inputUpdateItemName").val("");
    $("#inputUpdateItemPrice").val("");
    $("#inputUpdateItemQuantity").val("");
}

$("#inputItemCode,#inputItemName,#inputItemPrice,#inputItemQuantity").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});
$("#inputUpdateItemCode,#inputUpdateItemName,#inputUpdateItemPrice,#inputUpdateItemQuantity").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});
$("#inputItemCode").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemName").focus();
    }
});
$("#inputItemName").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemPrice").focus();
    }
});
$("#inputItemPrice").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemQuantity").focus();
    }
});
$("#inputItemQuantity").keydown(function (e) {
    if (e.key === "Enter") {
        saveItem();
    }
});
$("#inputUpdateItemCode").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateItemName").focus();
    }
});
$("#inputUpdateItemName").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateItemPrice").focus();
    }
});
$("#inputUpdateItemPrice").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateItemQuantity").focus();
    }
});
$("#inputUpdateItemQuantity").keydown(function (e) {
    if (e.key === "Enter") {
        updateItem();
    }
});


let checkItemCode = /^I00-00[1-9]\d{0,}$/, checkItemName = /^[a-zA-Z]{2,}$/,
    checkItemPrice = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?$/, checkItemQty = /^\d+(\.\d+)?$/;

$("#inputItemCode").keyup(function () {
    validateCode();
    console.log("hhhh")
});
$("#inputItemName").keyup(function () {
    validateItemName();
});
$("#inputItemPrice").keyup(function () {
    validatePrice();
});
$("#inputItemQuantity").keyup(function () {
    validateQTY();
});
$("#inputUpdateItemName").keyup(function () {
    validateUpdateItemName();
});
$("#inputUpdateItemPrice").keyup(function () {
    validateUpdateItemPrice();
});
$("#inputUpdateItemQuantity").keyup(function () {
    validateUpdateItemQTY();
});

function validateCode() {
    let checkCode = checkItemCode.test($("#inputItemCode").val());
    if (!checkCode) {
        $("#inputItemCode").css("border", 'solid red 2px');
        $("#inputItemCodeAlert").text("Invalid code. Use I00-001");
        return false;
    } else {
        $("#inputItemCode").css("border", 'solid green 2px');
        $("#inputItemCodeAlert").text("");
        return true;
    }
}

function validateItemName() {
    let check = checkItemName.test($("#inputItemName").val());
    if (!check) {
        $("#inputItemName").css("border", 'solid red 2px');
        $("#inputItemNameAlert").text("Invalid name. You can only use characters for name");
        return false;
    } else {
        $("#inputItemName").css("border", 'solid green 2px');
        $("#inputItemNameAlert").text("");
        return true;
    }
}

function validatePrice() {
    let check = checkItemPrice.test($("#inputItemPrice").val());
    if (!check) {
        $("#inputItemPrice").css("border", 'solid red 2px');
        $("#inputItemPriceAlert").text("Invalid price. You can only use integer or decimal numbers for price");
        return false;
    } else {
        $("#inputItemPrice").css("border", 'solid green 2px');
        $("#inputItemPriceAlert").text("");
        return true;
    }
}

function validateQTY() {
    let check = checkItemQty.test($("#inputItemQuantity").val());
    if (!check) {
        $("#inputItemQuantity").css("border", 'solid red 2px');
        $("#inputItemQTYAlert").text("Invalid Quantity. You can only use numbers for quantity");
        return false;
    } else {
        $("#inputItemQuantity").css("border", 'solid green 2px');
        $("#inputItemQTYAlert").text("");
        return true;
    }
}

function validateUpdateItemName() {
    let check = /^[a-zA-Z]{2,}$/.test($("#inputUpdateItemName").val());
    if (!check) {
        $("#inputUpdateItemName").css("border", 'solid red 2px');
        $("#inputUpdateItemNameAlert").text("Invalid name. You can only use characters for name");
        return false;
    } else {
        $("#inputUpdateItemName").css("border", 'solid green 2px');
        $("#inputUpdateItemNameAlert").text("");
        return true;
    }
}

function validateUpdateItemPrice() {
    let check = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?$/.test($("#inputUpdateItemPrice").val());
    if (!check) {
        $("#inputUpdateItemPrice").css("border", 'solid red 2px');
        $("#inputUpdateItemPriceAlert").text("Invalid price. You can only use integer or decimal numbers for price");
        return false;
    } else {
        $("#inputUpdateItemPrice").css("border", 'solid green 2px');
        $("#inputUpdateItemPriceAlert").text("");
        return true;
    }
}

function validateUpdateItemQTY() {
    let check = /^\d+(\.\d+)?$/.test($("#inputUpdateItemQuantity").val());
    if (!check) {
        $("#inputUpdateItemQuantity").css("border", 'solid red 2px');
        $("#inputUpdateItemQTYAlert").text("Invalid Quantity. You can only use numbers for quantity");
        return false;
    } else {
        $("#inputUpdateItemQuantity").css("border", 'solid green 2px');
        $("#inputUpdateItemQTYAlert").text("");
        return true;
    }
}
