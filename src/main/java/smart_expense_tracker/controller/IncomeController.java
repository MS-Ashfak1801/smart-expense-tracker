package smart_expense_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import smart_expense_tracker.model.Income;
import smart_expense_tracker.service.IncomeService;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/income")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public List<Income> getAllIncome() {
        return incomeService.getAllIncome();
    }

    @GetMapping("/{id}")
    public Income getIncomeById(
            @PathVariable Long id) {

        return incomeService.getIncomeById(id);
    }

    @GetMapping("/total")
    public double getTotalIncome() {
        return incomeService.getTotalIncome();
    }

    @GetMapping("/search/{source}")
    public List<Income> searchIncome(
            @PathVariable String source) {

        return incomeService.searchIncome(source);
    }

    @PostMapping
    public Income addIncome(
            @Valid @RequestBody Income income) {

        return incomeService.saveIncome(income);
    }

    @PutMapping("/{id}")
    public Income updateIncome(
            @PathVariable Long id,
            @Valid @RequestBody Income income) {

        return incomeService.updateIncome(id, income);
    }

    @DeleteMapping("/{id}")
    public String deleteIncome(
            @PathVariable Long id) {

        incomeService.deleteIncome(id);

        return "Income Deleted Successfully";
    }
}