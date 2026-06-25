package smart_expense_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import smart_expense_tracker.dto.ReportResponse;

@Service
public class ReportService {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private BudgetService budgetService;

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