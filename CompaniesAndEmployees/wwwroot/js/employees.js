"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/employeeshub").build();

connection.on("AddEmployees", function (employees) {
    var table = document.getElementById("employeesTable");
    for (var i = 0; i < employees.length; i++) {
        var row = document.createElement("tr");
        row.id = "row_" + employees[i].id;

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
        a.href = "#";
        a.setAttribute("onclick", "deleteEmployee(" + employees[i].id + ")");
        a.innerHTML = "Delete";
        td.appendChild(a);
        row.appendChild(td);

        table.appendChild(row);
    }
});

connection.on("RemoveEmployee", function (id) {
    document.getElementById("row_" + id).remove();
});

connection.start();

document.getElementById("createForm").addEventListener("submit", function (event) {
    document.getElementById("doneSpan").hidden = true;
    event.preventDefault();
    if (!$(this).valid())
        return;
    var array = $(this).serializeArray();
    var result = {};
    array.map(a =>
    {
        if (!a.name.startsWith("_"))
        {
            if (a.name.endsWith("Id"))
                result[a.name] = parseInt(a.value);
            else
                result[a.name] = a.value;
        }
    });
    var done = connection.invoke("AddEmployee", result);
    if (done)
        document.getElementById("doneSpan").hidden = false;
});

function deleteEmployee(id) {
    connection.invoke("DeleteEmployee", id);
}

function showForm() {
    document.getElementById("createDiv").hidden = false;
}
function hideForm() {
    document.getElementById("createDiv").hidden = true;
    document.getElementById("doneSpan").hidden = true;
}