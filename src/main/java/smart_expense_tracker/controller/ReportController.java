package smart_expense_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import smart_expense_tracker.dto.ReportResponse;
import smart_expense_tracker.service.ExpenseService;
import smart_expense_tracker.service.IncomeService;
import smart_expense_tracker.service.BudgetService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private BudgetService budgetService;

    @GetMapping("/summary")
    public ReportResponse getSummaryReport() {

        double income = incomeService.getTotalIncome();
        double expense = expenseService.getTotalExpense();
        double balance = income - expense;

        double budget = budgetService.getAllBudgets()
                .stream()
                .mapToDouble(b -> b.getAmount())
                .sum();

        double remainingBudget = budget - expense;

        return new ReportResponse(
                income,
                expense,
                balance,
                budget,
                remainingBudget
        );
    }
}