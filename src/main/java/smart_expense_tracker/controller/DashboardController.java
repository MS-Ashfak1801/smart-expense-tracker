package smart_expense_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import smart_expense_tracker.dto.DashboardResponse;
import smart_expense_tracker.service.ExpenseService;
import smart_expense_tracker.service.IncomeService;

@RestController
public class DashboardController {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {

        double totalIncome = incomeService.getTotalIncome();
        double totalExpense = expenseService.getTotalExpense();
        double balance = totalIncome - totalExpense;

        return new DashboardResponse(
                totalIncome,
                totalExpense,
                balance
        );
    }
}