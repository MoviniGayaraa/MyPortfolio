$("#save-customer").click(function () {
    saveCustomer();
});

function saveCustomer() {
    let nic = $("#inputNIC").val();
    let name = $("#inputName").val();
    let tel = $("#inputTel").val();
    let address = $("#inputAddress").val();
    if (nic !== "" && validateNIC()) {
        if (name !== "" && validateCusName()) {
            if (tel !== "" && validateTel()) {
                if (address !== "" && validateAddress()) {
                    $("#customer-table-body").empty();
                    if (checkNIC(nic)) {
                        let newCustomer = Object.assign({}, customer);
                        newCustomer.nic = nic;
                        newCustomer.name = name;
                        newCustomer.tel = tel;
                        newCustomer.address = address;
                        customerDB.push(newCustomer);
                        loadCustomers();
                    } else {
                        $("#inputNIC").focus();
                        alert("This customer already exists");
                        loadCustomers();
                    }
                    clearNewCustomerForm();
                } else {
                    $("#inputAddress").focus();
                }
            } else {
                $("#inputTel").focus();
            }
        } else {
            $("#inputName").focus();
        }
    } else {
        $("#inputNIC").focus();
    }
}

function loadCustomers() {
    let tableBody = $("#customer-table-body");
    for (let i = 0; i < customerDB.length; i++) {
        let tr = `<tr>
                    <td>${customerDB[i].nic}</td>
                    <td>${customerDB[i].name}</td>
                    <td>${customerDB[i].tel}</td>
                    <td>${customerDB[i].address}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
        tableBody.append(tr);
    }
    getUpdateCustomer();
    getDeleteCustomer();
}

$("#addNewCustomerClearButton").click(function () {
    clearNewCustomerForm();
});

function getDeleteCustomer() {
    $("#customer-table-body>tr>td>button:nth-child(1)").click(function () {
        let nic = $(this).parents("#customer-table-body>tr").children().eq(0).text();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteCustomer(nic);
            if (response) {
                alert("Customer Deleted");
                $("#customer-table-body").empty();
                loadCustomers();
            } else {
                alert("Customer Not Removed..!");
            }
        }
    });
}

function deleteCustomer(nic) {
    for (let i = 0; i < customerDB.length; i++) {
        console.log(nic)
        if (customerDB[i].nic === nic) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function getUpdateCustomer() {
    $("#customer-table-body>tr>td>button:nth-child(2)").click(function () {
        let nic = $(this).parents("#customer-table-body>tr").children().eq(0).text();
        let name = $(this).parents("#customer-table-body>tr").children().eq(1).text();
        let tel = $(this).parents("#customer-table-body>tr").children().eq(2).text();
        let address = $(this).parents("#customer-table-body>tr").children().eq(3).text();
        console.log(nic)
        $('#inputUpdateNIC').val(nic);
        $('#inputUpdateName').val(name);
        $('#inputUpdateTel').val(tel);
        $('#inputUpdateAddress').val(address);
        popUpUpdateCustomerForm();
    });
}

function popUpUpdateCustomerForm() {
    let modalToggle = $('#customer-table-body>tr');
    let myModal = new bootstrap.Modal($('#updateCustomer'));
    myModal.show(modalToggle);
}

function clearNewCustomerForm() {
    $("#inputNIC,#inputName,#inputTel,#inputAddress").val("");
    $("#inputNIC").focus();
}

function checkNIC(nic) {
    for (let i = 0; i < customerDB.length; i++) {
        if (nic === customerDB[i].nic) {
            return false;
        }
    }
    return true;
}

$("#customerSearchButton").click(function () {
    let x = $("#searchBar").val();
    customerDB.filter(function (e) {
        if (e.nic === x) {
            $("#customer-table-body").empty();
            console.log(e.nic, e.name, e.address, e.tel)
            let tableBody = $("#customer-table-body");
            let tr = `<tr>
                    <td>${e.nic}</td>
                    <td>${e.name}</td>
                    <td>${e.tel}</td>
                    <td>${e.address}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
            tableBody.append(tr);
            getUpdateCustomer();
            getDeleteCustomer();
        } else {
            alert("This National ID number does not match");
        }
    });
});

$("#customerSearchClear").click(function () {
    $("#searchBar").val("");
    $("#customer-table-body").empty();
    loadCustomers();
});
let customer1 = undefined;

function searchCustomer(nic) {
    return customerDB.find(function (customer) {
        return customer.nic === nic;
    });
}

$("#customerUpdateButton").click(function () {
    updateCustomer();
});

function updateCustomer() {
    customer1 = searchCustomer($("#inputUpdateNIC").val());
    name = $("#inputUpdateName").val();
    tel = $("#inputUpdateTel").val();
    address = $("#inputUpdateAddress").val();
    if (name !== "" && validateUpdateCusName()) {
        if (tel !== "" && validateUpdateTel()) {
            if (address !== "" && validateUpdateAddress()) {
                customer1.name = name;
                customer1.tel = tel;
                customer1.address = address;
                $("#customer-table-body").empty();
                clearUpdateCustomerForm();
                loadCustomers();
            } else {
                $("#inputUpdateAddress").focus();
            }
        } else {
            $("#inputUpdateTel").focus();
        }
    } else {
        $("#inputUpdateName").focus();
    }

}

function clearUpdateCustomerForm() {
    $("#inputUpdateNIC").val("");
    $("#inputUpdateName").val("");
    $("#inputUpdateTel").val("");
    $("#inputUpdateAddress").val("");
}


$("#inputNIC,#inputName,#inputTel,#inputAddress").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});
$("#inputUpdateNIC,#inputUpdateName,#inputUpdateTel,#inputUpdateAddress").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});
$("#inputNIC").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputName").focus();
    }
});
$("#inputName").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputTel").focus();
    }
});
$("#inputTel").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputAddress").focus();
    }
});
$("#inputAddress").keydown(function (e) {
    if (e.key === "Enter") {
        saveCustomer();
    }
});
$("#inputUpdateNIC").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateName").focus();
    }
});
$("#inputUpdateName").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateTel").focus();
    }
});
$("#inputUpdateTel").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputUpdateAddress").focus();
    }
});
$("#inputUpdateAddress").keydown(function (e) {
    if (e.key === "Enter") {
        updateCustomer();
    }
});

let oldNIC = /^\d{10}(V|v)$/, newNIC = /^\d{12}$/, name = /^[a-zA-Z\s.'-]{2,}$/, address = /^[a-zA-Z0-9\s.,'-]{2,}$/,
    tel = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
$("#inputNIC").keyup(function () {
    validateNIC();
});
$("#inputName").keyup(function () {
    validateCusName();
});
$("#inputAddress").keyup(function () {
    validateAddress();
});
$("#inputTel").keyup(function () {
    validateTel();
});
$("#inputUpdateName").keyup(function () {
    validateUpdateCusName();
});
$("#inputUpdateAddress").keyup(function () {
    validateUpdateAddress();
});
$("#inputUpdateTel").keyup(function () {
    validateUpdateTel();
});

function validateNIC() {
    let checkOldNIC = oldNIC.test($("#inputNIC").val());
    let checkNewNIC = newNIC.test($("#inputNIC").val());
    if (!checkOldNIC && !checkNewNIC) {
        $("#inputNIC").css("border", 'solid red 2px');
        $("#inputNICAlert").text("Invalid NIC number. Use 000000000000 or 0000000000v");
        return false;
    } else {
        $("#inputNIC").css("border", 'solid green 2px');
        $("#inputNICAlert").text("");
        return true;
    }
}

function validateCusName() {
    let check = name.test($("#inputName").val());
    if (!check) {
        $("#inputName").css("border", 'solid red 2px');
        $("#inputNameAlert").text("Invalid name. You can only use characters for your name");
        return false;
    } else {
        $("#inputName").css("border", 'solid green 2px');
        $("#inputNameAlert").text("");
        return true;
    }
}

function validateTel() {
    let check = tel.test($("#inputTel").val());
    if (!check) {
        $("#inputTel").css("border", 'solid red 2px');
        $("#inputTelAlert").text("Invalid Phone number. Use Ex :- 0760000000 or +9400000000");
        return false;
    } else {
        $("#inputTel").css("border", 'solid green 2px');
        $("#inputTelAlert").text("");
        return true;
    }
}

function validateAddress() {
    let check = address.test($("#inputAddress").val());
    if (!check) {
        $("#inputAddress").css("border", 'solid red 2px');
        $("#inputAddressAlert").text("Invalid Address");
        return false;
    } else {
        $("#inputAddress").css("border", 'solid green 2px');
        $("#inputAddressAlert").text("");
        return true;
    }
}

function validateUpdateCusName() {
    let nameRegex = /^[A-Za-z\s]+$/;
    let inputName = $("#inputUpdateName").val();
    let check = nameRegex.test(inputName);
    if (!check) {
        $("#inputUpdateName").css("border", 'solid red 2px');
        $("#inputUpdateNameAlert").text("Invalid name. You can only use characters for your name");
        return false;
    } else {
        $("#inputUpdateName").css("border", 'solid green 2px');
        $("#inputUpdateNameAlert").text("");
        return true;
    }
}

function validateUpdateAddress() {
    let addressRegex = /^[a-zA-Z0-9\s.,'-]{2,}$/;
    let inputAddress = $("#inputUpdateAddress").val();
    let check = addressRegex.test(inputAddress);
    if (!check) {
        $("#inputUpdateAddress").css("border", 'solid red 2px');
        $("#inputUpdateAddressAlert").text("Invalid Address.");
        return false;
    } else {
        $("#inputUpdateAddress").css("border", 'solid green 2px');
        $("#inputUpdateAddressAlert").text("");
        return true;
    }
}

function validateUpdateTel() {
    let telRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
    let inputTel = $("#inputUpdateTel").val();
    let check = telRegex.test(inputTel);
    if (!check) {
        $("#inputUpdateTel").css("border", 'solid red 2px');
        $("#inputUpdateTelAlert").text("Invalid Phone number. Use Ex :- 0760000000 or +9400000000");
        return false;
    } else {
        $("#inputUpdateTel").css("border", 'solid green 2px');
        $("#inputUpdateTelAlert").text("");
        return true;
    }
}
