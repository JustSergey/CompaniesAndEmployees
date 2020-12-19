using CompaniesAndEmployees.Data;
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
            var employees = await context.Employees.Include(e => e.Company).ToListAsync();
            await Clients.Caller.SendAsync("ReceiveEmployees", employees);
            await base.OnConnectedAsync();
        }
    }
}
