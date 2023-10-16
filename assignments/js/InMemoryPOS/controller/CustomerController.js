// load all at the beginning
getAllCustomers();

// get data from selected raw on click
$('#tblCustomer').on('click', 'tr', function () {
    // Get the data from the selected row
    let customerId = $(this).find('td:eq(0)').text();
    let customerName = $(this).find('td:eq(1)').text();
    let customerAddress = $(this).find('td:eq(2)').text();
    let customerSalary = $(this).find('td:eq(3)').text();

    // Set the values to the fields
    $("#txtCustomerID").val(customerId);
    $("#txtCustomerName").val(customerName);
    $("#txtCustomerAddress").val(customerAddress);
    $("#txtCustomerSalary").val(customerSalary);

    changeTextFieldColorsToBack([customerIDField, customerNameField, customerAddressField, customerSalaryField]);
});


//  Save customer
$("#btnSaveCustomer").click(function () {
    if(checkValidCustomer()){
        let customerID = $("#txtCustomerID").val();
        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerSalary = $("#txtCustomerSalary").val();

        let newCustomer = Object.assign({}, customer);
        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        if (!checkExistCustomer(newCustomer.id)) {
            customerDB.push(newCustomer);
            loadAllCusIDs();
            alert("New Customer Add !");
        } else {
            alert("Same ID !");
        }
    }else {
        alert("Try again !");
    }
    getAllCustomers();
    clearAllCustomerFields();

    $("#txtCustomerID").focus();
});

// update customer
$('#btnUpdateCustomer').click(function () {
    if(checkValidCustomer()) {
        // Get data
        let id = $("#txtCustomerID").val();
        let name = $("#txtCustomerName").val();
        let address = $("#txtCustomerAddress").val();
        let salary = $("#txtCustomerSalary").val();

        // Set new data to existing object (using id)
        for (let i = 0; i < customerDB.length; i++) {
            if (id === customerDB[i].id) {
                // Confirm update
                let confirmUpdate = confirm("Do you want to update?");

                if (confirmUpdate) {
                    // Update the object in the array
                    customerDB[i].name = name;
                    customerDB[i].address = address;
                    customerDB[i].salary = salary;

                    loadAllCusIDs();
                    // Exit the loop
                    break;
                }
            }
        }
    }else {
        alert("Try again !");
    }
    getAllCustomers();
    clearAllCustomerFields();
});

function getAllCustomers() {
    let tBody = $("#tblCustomer");

    // Clear table
    tBody.empty();

    // Load all values
    for (let i = 0; i < customerDB.length; i++) {
        let tr = $(`<tr>
                        <td>${customerDB[i].id}</td>
                        <td>${customerDB[i].name}</td>
                        <td>${customerDB[i].address}</td>
                        <td>${customerDB[i].salary}</td>
                   </tr>`);
        tBody.append(tr);


    }
}

$('#btnSearchCustomer').click(function () {
    let searchTxt = $("#txtSearchCus").val();
    if (searchTxt !== "") {
        getSearchCustomer(searchTxt);
    } else {
        alert("Input Data!")
        getAllCustomers();
    }
});

$('#txtSearchCus').on('keyup', function () {
    let searchTxt = $("#txtSearchCus").val();
    if (searchTxt !== "") {
        getSearchCustomer(searchTxt);
    } else {
        getAllCustomers();
    }
});

function getSearchCustomer(searchTxt) {
    let tBody = $("#tblCustomer");

    // Clear table
    tBody.empty();

    // Load matching values
    let found = false;
    for (let i = 0; i < customerDB.length; i++) {
        if (
            searchTxt.includes(customerDB[i].id) ||
            searchTxt.includes(customerDB[i].name) ||
            searchTxt.includes(customerDB[i].address) ||
            searchTxt.includes(customerDB[i].salary)
        ) {
            let tr = $(`<tr>
                            <td>${customerDB[i].id}</td>
                            <td>${customerDB[i].name}</td>
                            <td>${customerDB[i].address}</td>
                            <td>${customerDB[i].salary}</td>
                        </tr>`);
            tBody.append(tr);
            found = true;
        }
    }

    if (!found) {
        getAllCustomers();
    }
}


// button cancel , clear fields
$('#btnCancelCustomer').click(function () {
    clearAllCustomerFields();
});

function clearAllCustomerFields() {
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");

    changeTextFieldColorsToBack([customerIDField, customerNameField, customerAddressField, customerSalaryField]);
    customerFormHideErrorMessages();
}

// button delete
$('#btnDeleteCustomer').click(function () {
    if(checkValidCustomer()) {
        let selectedID = $("#txtCustomerID").val();

        // search matching ID from arraylist, and delete the object with that id
        for (let i = 0; i < customerDB.length; i++) {
            if (selectedID === customerDB[i].id) {
                // Delete the object from the array
                let b = confirm("Do you want to delete?");
                if (b) {
                    customerDB.splice(i, 1);
                    loadAllCusIDs();
                    break; // Exit the loop
                }
                break; // Exit the loop
            }
        }
    }else {
        alert("Try again !");
    }

    // update table
    getAllCustomers();
    clearAllCustomerFields()
});

// check customer is exists
function checkExistCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (id === customerDB[i].id) {
            return true;
        }
    }
    return false;
}

// refresh
$('#btnRefreshCustomer').click(function () {
    getAllCustomers();
});
