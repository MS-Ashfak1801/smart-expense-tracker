package smart_expense_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import smart_expense_tracker.model.Budget;
import smart_expense_tracker.service.BudgetService;

@RestController
@RequestMapping("/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/search/{month}")
    public List<Budget> searchBudget(
            @PathVariable String month) {

        return budgetService.searchBudget(month);
    }

    @GetMapping("/{id}")
    public Budget getBudgetById(@PathVariable Long id) {
        return budgetService.getBudgetById(id);
    }

    @PostMapping
    public Budget addBudget(
            @Valid @RequestBody Budget budget) {

        return budgetService.saveBudget(budget);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody Budget budget) {

        return budgetService.updateBudget(id, budget);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);

        return "Budget Deleted Successfully";
    }
}