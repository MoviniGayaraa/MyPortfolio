/*
$("#login_section").css("display", 'block');
$("#home_section").css("display", 'none');
$("#nav_bar").css("display", 'none');
$("#customer_section").css("display", 'none');
$("#order_section").css("display", 'none');
$("#store_section").css("display", 'none');
*/


//logics for SPA
initiateUI();

function initiateUI() {
    clearAll();
    $("#login_section").css("display", "block");
    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "login_section":
            localStorage.setItem("view", "LOGIN");
            break;
        case "home_section":
            localStorage.setItem("view", "HOME");
            break;
        case "customer_section":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "order_section":
            localStorage.setItem("view", "ORDER");
            break;
        case "store_section":
            localStorage.setItem("view", "ITEM");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "LOGIN":
            setView($("#login_section"));
            $("#nav_bar").css("display", 'none');
            break;
        case "HOME":
            setView($("#home_section"));
            $("#nav_bar").css("display", 'block');
            break;
        case "CUSTOMER":
            setView($("#customer_section"));
            $("#nav_bar").css("display", 'block');
            break;
        case "ORDER":
            setView($("#order_section"));
            $("#nav_bar").css("display", 'block');
            break;
        case "ITEM":
            setView($("#store_section"));
            $("#nav_bar").css("display", 'block');
            break;
        default:
            setView($("#login_section"));
            $("#nav_bar").css("display", 'none');
    }
}

function clearAll() {
    $("#login_section,#home_section,#nav_bar,#order_section,#customer_section,#store_section").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    console.log(viewOb);
    console.log(viewOb.get(0));
    console.log(viewOb.get(0).id);
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);

}


//end of logics for SPA


$("#log_in").click(function () {
    let password=$("#password").val(),email=$("#email").val();
    if (checkEmail(email) && checkPassword(password)) {
        setView($("#home_section"));
        $("#nav_bar").css("display", 'block');
        /* $("#home_section").css("display", 'block');
         $("#nav_bar").css("display", 'block');
         $("#customer_section").css("display", 'none');
         $("#order_section").css("display", 'none');
         $("#store_section").css("display", 'none');
         $("#login_section").css("display", 'none');*/
    }else {
        let ok=alert("Email or Password invalid");
        if (ok){
            $("#password").val("");
            $("#email").val("");
        }
    }





});
$("#home").click(function () {
    setItemCount();
    setCustomerCount();
    setView($("#home_section"));
    $("#nav_bar").css("display", 'block');
    /*$("#home_section").css("display", 'block');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'none');*/
});
$("#customer").click(function () {
    setView($("#customer_section"));
    $("#nav_bar").css("display", 'block');
    /*  $("#home_section").css("display", 'none');
      $("#customer_section").css("display", 'block');
      $("#order_section").css("display", 'none');
      $("#store_section").css("display", 'none');*/
});
$("#order").click(function () {
    loadComboBox();
    setOrderId();
    clearItemSection();
    clearInvoiceSection();
    $("#order-table").empty();
    setOrderId();
    $("#total").text("0.0");
    $("#subTotal").text("0.0");
    $("#cash").val("");
    $("#discount").val(0);
    $("#balance").val("");

    setView($("#order_section"));
    $("#nav_bar").css("display", 'block');
    /*
        $("#home_section").css("display", 'none');
        $("#customer_section").css("display", 'none');
        $("#order_section").css("display", 'block');
        $("#store_section").css("display", 'none');*/
});
$("#store").click(function () {
    $("#item-table-body").empty();
    loadItems();
    setView($("#store_section"));
    $("#nav_bar").css("display", 'block');
    /* $("#home_section").css("display", 'none');
     $("#customer_section").css("display", 'none');
     $("#order_section").css("display", 'none');
     $("#store_section").css("display", 'block');*/
});
$("#log_out").click(function () {
    setView($("#login_section"));

    /* $("#home_section").css("display", 'none');
     $("#customer_section").css("display", 'none');
     $("#order_section").css("display", 'none');
     $("#store_section").css("display", 'none');
     $("#nav_bar").css("display", 'none');
     $("#login_section").css("display", 'block');*/
});
