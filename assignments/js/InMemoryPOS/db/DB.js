var customerDB = [
    {id: "C00-001", name: "Movini Gayara", address: "Galle", salary: 100000},
    {id: "C00-002", name: "Kavidi Gayathma", address: "galle", salary: 200000},
    {id: "C00-003", name: "pamoda Kithmini", address: "Matara", salary: 400000},
    {id: "C00-004", name: "Pamodya Sithmini", address: "Colombo", salary: 300000}
];

var itemDB = [
    {code: "I00-001", itemName: "Chocolate", qtyOnHand: 40, unitPrice: 150.00},
    {code: "I00-002", itemName: "Soap", qtyOnHand: 150, unitPrice: 150.00},
    {code: "I00-003", itemName: "Biscuit", qtyOnHand: 50, unitPrice: 100.00},
    {code: "I00-004", itemName: "Keerisamba", qtyOnHand: 20, unitPrice: 500.00}
];

var orderDB = [
    {
        orderID: "000-001",
        date: "2023/02/05",
        customer: customerDB[0],
        cart: [{item: itemDB[0], qty: 2}, {item: itemDB[1], qty: 1}],
        discount: 10,
        total: 1000
    },
    {
        orderID: "000-002",
        date: "2023/02/07",
        customer: customerDB[1],
        cart: [{item: itemDB[2], qty: 1}, {item: itemDB[1], qty: 1}, {item: itemDB[0], qty: 1}],
        discount: 10,
        total: 1000
    }
];