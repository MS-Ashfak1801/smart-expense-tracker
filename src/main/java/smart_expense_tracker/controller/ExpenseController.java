package smart_expense_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import smart_expense_tracker.model.Expense;
import smart_expense_tracker.service.ExpenseService;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(
            @PathVariable Long id) {

        return expenseService.getExpenseById(id);
    }

    @GetMapping("/total")
    public double getTotalExpense() {
        return expenseService.getTotalExpense();
    }

    @GetMapping("/search/{category}")
    public List<Expense> searchExpenses(
            @PathVariable String category) {

        return expenseService.searchExpenses(category);
    }

    @PostMapping
    public Expense addExpense(
            @Valid @RequestBody Expense expense) {

        return expenseService.saveExpense(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody Expense expense) {

        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);

        return "Expense Deleted Successfully";
    }
}