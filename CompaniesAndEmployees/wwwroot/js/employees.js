"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/employeeshub").build();

connection.on("ReceiveEmployees", function (employees) {
    var table = document.getElementById("employeesTable");
    for (var i = 0; i < employees.length; i++) {
        var row = document.createElement("tr");

        var td = document.createElement("td");
        td.innerHTML = employees[i].name;
        row.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = employees[i].surname;
        row.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = employees[i].patronymic;
        row.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = employees[i].phoneNumber;
        row.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = employees[i].company.name;
        row.appendChild(td);

        var td = document.createElement("td");
        var a = document.createElement("a")
        a.href = "/Employees/Edit/" + employees[i].id;
        a.innerHTML = "Edit";
        td.appendChild(a);
        td.append(" | ");
        var a = document.createElement("a")
        a.href = "/Employees/Details/" + employees[i].id;
        a.innerHTML = "Details";
        td.appendChild(a);
        td.append(" | ");
        var a = document.createElement("a")
        a.href = "/Employees/Delete/" + employees[i].id;
        a.innerHTML = "Delete";
        td.appendChild(a);
        row.appendChild(td);

        table.appendChild(row);
    }
});

connection.start();

document.getElementById("createButton").addEventListener("click", function (event) {

    event.preventDefault();
});