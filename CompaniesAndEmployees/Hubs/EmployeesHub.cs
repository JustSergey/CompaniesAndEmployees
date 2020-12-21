using CompaniesAndEmployees.Data;
using CompaniesAndEmployees.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompaniesAndEmployees.Hubs
{
    public class EmployeesHub : Hub
    {
        private readonly CAEContext context;

        public EmployeesHub(CAEContext context) => this.context = context;

        public async override Task OnConnectedAsync()
        {
            List<Employee> employees = await context.Employees.Include(e => e.Company).ToListAsync();
            await Clients.Caller.SendAsync("AddEmployees", employees);
            await base.OnConnectedAsync();
        }

        public async Task<bool> AddEmployee(Employee employee)
        {
            await context.AddAsync(employee);
            employee.Company = await context.Companies.FindAsync(employee.CompanyId);
            if (employee.Company == null)
                return false;
            await context.SaveChangesAsync();
            await Clients.All.SendAsync("AddEmployees", new List<Employee> { employee });
            return true;
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await context.Employees.FindAsync(id);
            context.Employees.Remove(employee);
            await context.SaveChangesAsync();
            await Clients.All.SendAsync("RemoveEmployee", id);
        }
    }
}
