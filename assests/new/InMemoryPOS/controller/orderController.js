/*load customers NIC combobox*/
function loadComboBox() {
    $("#invoice-customerNIC").empty();
    $("#item-itemCode").empty();
    $("#invoice-customerNIC").append(
        `<option>Select NIC</option>`
    );
    $("#item-itemCode").append(
        `<option>Select Code</option>`
    );
    for (let i = 0; i < customerDB.length; i++) {
        $("#invoice-customerNIC").append(
            `<option>${customerDB[i].nic}</option>`
        );
    }
    for (let i = 0; i < itemDB.length; i++) {
        $("#item-itemCode").append(
            `<option>${itemDB[i].code}</option>`
        );
    }
}

/*invoice*/
$("#invoice-customerNIC").click(function () {
    let nic = $("#invoice-customerNIC").val();
    if (nic !== "Select NIC") {
        customer1 = searchCustomer(nic);
        $("#customerName").val(customer1.name);
        $("#customerTel").val(customer1.tel);
        $("#customerAddress").val(customer1.address);

        $("#invoice-customerNIC").css("border", 'solid green 2px');
        $("#customerName").css("border", 'solid green 2px');
        $("#customerTel").css("border", 'solid green 2px');
        $("#customerAddress").css("border", 'solid green 2px');
    } else {
        $("#customerName").val("");
        $("#customerTel").val("");
        $("#customerAddress").val("");
    }
});

function setOrderId() {
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
    if (orderDetailsDB.length > 0) {
        $("#orderId").val("O00-00" + (orderDetailsDB.length + 1));
    } else {
        $("#orderId").val("O00-001");
    }
}

/*item*/
$("#item-itemCode").click(function () {
    let code = $("#item-itemCode").val();
    if (code !== "Select Code") {
        item1 = searchItem(code);
        $("#itemName").val(item1.name);
        $("#itemPrice").val(item1.price);
        $("#itemQTY").val(item1.qty);

        $("#item-itemCode").css("border", 'solid green 2px');
        $("#itemName").css("border", 'solid green 2px');
        $("#itemPrice").css("border", 'solid green 2px');
        $("#itemQTY").css("border", 'solid green 2px');
    } else {
        $("#itemName").val("");
        $("#itemPrice").val("");
        $("#itemQTY").val("");
    }
});

$("#Quantity").keyup(function () {
    let qty = $("#Quantity").val();
    if (Number($("#Quantity").val()) !== 0 && $("#Quantity").val() !== "") {
        if (Number(qty) <= Number($("#itemQTY").val())) {
            $("#Quantity").css("border", 'solid green 2px');
        } else {
            $("#Quantity").css("border", 'solid red 2px');
        }
    } else {
        $("#Quantity").css("border", 'solid red 2px');
    }
});

function checkOrderAndItem(itemQty) {
    for (let j = 0; j < orderDB.length; j++) {
        if (orderDB[j].orderId === $("#orderId").val() && orderDB[j].itemCode === $("#item-itemCode").val()) {
            orderDB[j].itemQty = Number(orderDB[j].itemQty) + Number(itemQty);
            return true;
        }
    }
    return false;
}

$("#addToCart").click(function () {
    $("#QuantityAlert").text("")
    let nic = $("#invoice-customerNIC").val();
    let code = $("#item-itemCode").val();
    if (nic !== "Select NIC" && code !== "Select Code") {
        let orderId = $("#orderId").val();
        let itemCode = $("#item-itemCode").val();
        let itemName = $("#itemName").val();
        let itemPrice = $("#itemPrice").val();
        let itemQty = $("#Quantity").val();
        if (itemQty<=$("#itemQTY").val() && itemQty!==""){
            if (!checkOrderAndItem(itemQty)) {
                let newOrder = Object.assign({}, order);
                newOrder.orderId = orderId;
                newOrder.itemCode = itemCode;
                newOrder.itemName = itemName;
                newOrder.itemPrice = itemPrice;
                newOrder.itemQty = itemQty;
                orderDB.push(newOrder);
            }
            addToCart();
            updateItemQTY(itemCode, itemQty);
        }else {
            if (itemQty===""){
                $("#QuantityAlert").text(`Input item quantity`);
                $("#Quantity").css("border","red solid 2px");
            }else {
                $("#QuantityAlert").text(`${itemQty} of these are not available. The amount in hand is less than ${itemQty} `);
            }
        }
    } else {
        if (nic === "Select NIC" && code === "Select Code") {
            $("#invoice-customerNIC").css("border", 'solid red 2px');
            $("#customerName").css("border", 'solid red 2px');
            $("#customerTel").css("border", 'solid red 2px');
            $("#customerAddress").css("border", 'solid red 2px');

            $("#item-itemCode").css("border", 'solid red 2px');
            $("#itemName").css("border", 'solid red 2px');
            $("#itemPrice").css("border", 'solid red 2px');
            $("#itemQTY").css("border", 'solid red 2px');
        } else if (code === "Select Code") {
            $("#invoice-customerNIC").css("border", 'solid green 2px');
            $("#customerName").css("border", 'solid green 2px');
            $("#customerTel").css("border", 'solid green 2px');
            $("#customerAddress").css("border", 'solid green 2px');

            $("#item-itemCode").css("border", 'solid red 2px');
            $("#itemName").css("border", 'solid red 2px');
            $("#itemPrice").css("border", 'solid red 2px');
            $("#itemQTY").css("border", 'solid red 2px');
        } else {
            $("#invoice-customerNIC").css("border", 'solid red 2px');
            $("#customerName").css("border", 'solid red 2px');
            $("#customerTel").css("border", 'solid red 2px');
            $("#customerAddress").css("border", 'solid red 2px');

            $("#item-itemCode").css("border", 'solid green 2px');
            $("#itemName").css("border", 'solid green 2px');
            $("#itemPrice").css("border", 'solid green 2px');
            $("#itemQTY").css("border", 'solid green 2px');
        }
    }
});

function addToCart() {
    let tableBody = $("#order-table");
    tableBody.empty();
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].orderId === $("#orderId").val()) {
            let tr = `<tr>
                        <td>${orderDB[i].itemCode}</td>
                        <td>${orderDB[i].itemName}</td>
                        <td>${orderDB[i].itemPrice}</td>
                        <td>${orderDB[i].itemQty}</td>
                        <td>
                          <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>`;
            tableBody.append(tr);
        }
    }
    getDeleteCartItem();
    calculateTotal();
}

function updateItemQTY(itemCode, itemQty) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code === itemCode) {
            itemDB[i].qty = Number(itemDB[i].qty) - Number(itemQty);
            searchItem(itemCode).qty = itemDB[i].qty;
        }
    }
    searchItem()
    clearItemSection();
}

function clearItemSection() {
    $("#item-itemCode").val("Select Code");
    $("#itemName").val("");
    $("#itemPrice").val("");
    $("#itemQTY").val("");
    $("#Quantity").val("");
}

function calculateTotal() {
    let price = 0, qty = 0, tot = 0;
    const table = $("#order-table")[0];
    for (let i = 0; i < $("#order-table > tr").length; i++) {
        price = Number(table.rows[i].cells[2].textContent);
        qty = Number(table.rows[i].cells[3].textContent);
        tot = tot + (price * qty);
    }
    $("#total").text(tot);
    $("#subTotal").text(tot);
}

$("#discount,#cash").keydown(function (event) {
    if (event.key === "Enter") {
        $("#cashAlert").text("");
        $("#discountAlert").text("");

        let cash = $("#cash").val();
        let discount = $("#discount").val();
        if (discount >= 0 && discount < 100) {
            $("#discount").css("border", "green solid 2px");
            setBalance(cash, discount);
        } else {
            $("#discount").css("border", "red solid 2px");
            $("#discount").focus();
            $("#discountAlert").text("Negative discounts cannot be added");
        }
        if (cash<$("#total").val() && cash==="") {
            $("#cashAlert").text("This amount is not enough");
        }
    }
});

function setBalance(cash, discount) {
    let tot = ($("#total").text() - ($("#total").text() * (discount / 100)));
    $("#subTotal").text(tot);
    let balance = cash - tot;
    if (balance >= 0) {
        $("#balance").val(balance);
        $("#balance").css("border", "solid 2px green");
    } else {
        $("#balance").css("border", "solid 2px red");
    }
}

function getDeleteCartItem() {
    $("#order-table>tr>td>button:nth-child(1)").click(function () {
        let code = $(this).parents("#order-table>tr").children().eq(0).text();
        let qty = $(this).parents("#order-table>tr").children().eq(3).text();
        let oid = $("#orderId").val();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteCartItem(oid, code, qty);
            if (response) {
                alert("Item Deleted");
                $("#order-table").empty();
                addToCart();
            } else {
                alert("Item Not Removed..!");
            }
        }
    });
}

function deleteCartItem(oid, code, newQTY) {
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].orderId === oid && orderDB[i].itemCode === code) {
            let item = searchItem(code);
            item.qty = Number(item.qty) + Number(newQTY);
            orderDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

$("#place-order").click(function () {
    $("#orderIdAlert").text("");
    $("#cashAlert").text("");
    let total = $("#total").text();
    let subTotal = $("#subTotal").text();
    let cash = $("#cash").val();
    let orderID = $("#orderId").val();
    if (undefined===searchOrder(orderID)){
        if ($("#order-table>tr").length > 0 && $("#invoice-customerNIC").val() !== "Select NIC") {
            console.log(cash>=total && cash!=="")
            console.log(cash>=total)
            console.log(cash!=="")
            if (Number(cash)>=Number(total) && cash!==""){
                let date = $("#orderDate").val();
                let nic = $("#invoice-customerNIC").val();
                let discount = $("#discount").val();
                let balance = $("#balance").val();
                let newOrderDetails = Object.assign({}, order);
                newOrderDetails.orderId = orderID;
                newOrderDetails.date = date;
                newOrderDetails.nic = nic;
                newOrderDetails.total = total;
                newOrderDetails.subTotal = subTotal;
                newOrderDetails.cash = cash;
                newOrderDetails.discount = discount;
                newOrderDetails.balance = balance;
                orderDetailsDB.push(newOrderDetails);
                clearItemSection();
                clearInvoiceSection();
                $("#order-table").empty();
                setOrderId();
                $("#total").text("0.0");
                $("#subTotal").text("0.0");
                $("#cash").val("");
                $("#discount").val(0);
                $("#balance").val("");
                alert("Order added successfully");
            }else {
                $("#cashAlert").text("This amount is not enough");
            }
        } else {
            $("#invoice-customerNIC").focus();
        }
    }else {
        $("#orderIdAlert").text(`${orderID} already exits`);
    }
});

function clearInvoiceSection() {
    $("#invoice-customerNIC").val("Select NIC");
    $("#customerName").val("");
    $("#customerTel").val("");
    $("#customerAddress").val("");
}

$("#orderId").keydown(function (event) {
    $("#orderIdAlert").text("");
    if (event.key === "Enter") {
        let orderID = $("#orderId").val();
        let searchOrder1 = searchOrder(orderID);
console.log(searchOrder1)
        if (searchOrder1!==undefined) {
            addToCart();
            let customer = searchCustomer(searchOrder1.nic);
            $("#invoice-customerNIC").val(searchOrder1.nic);
            $("#customerName").val(customer.name);
            $("#customerTel").val(customer.tel);
            $("#customerAddress").val(customer.address);

            $("#orderDate").text(searchOrder1.date);
            $("#total").text(searchOrder1.total);
            $("#subTotal").text(searchOrder1.subTotal);
            $("#cash").val(searchOrder1.cash);
            $("#discount").val(searchOrder1.discount);
            $("#balance").val(searchOrder1.balance);

        }else {
            $("#orderId").focus();
            $("#orderIdAlert").text(`${orderID} has no order`);

            clearItemSection();
            clearInvoiceSection();
            $("#order-table").empty();
            setOrderId();
            $("#total").text("0.0");
            $("#subTotal").text("0.0");
            $("#cash").val("");
            $("#discount").val(0);
            $("#balance").val("");
        }

    }
});

function searchOrder(orderID) {
    return orderDetailsDB.find(function (orderDetailsDB) {
        return orderDetailsDB.orderId === orderID;
    });
}

