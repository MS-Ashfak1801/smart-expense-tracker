package smart_expense_tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import smart_expense_tracker.model.Budget;
import smart_expense_tracker.model.User;
import smart_expense_tracker.repository.BudgetRepository;
import smart_expense_tracker.repository.UserRepository;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    public Budget saveBudget(Budget budget) {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        budget.setUser(user);

        return budgetRepository.save(budget);
    }

    public List<Budget> getAllBudgets() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        return budgetRepository.findByUser(user);
    }

    public List<Budget> searchBudget(String month) {

        return budgetRepository
                .findByMonthContainingIgnoreCase(month);
    }

    public Budget getBudgetById(Long id) {

        return budgetRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Budget Not Found"));
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Budget Not Found"));

        budget.setMonth(updatedBudget.getMonth());
        budget.setAmount(updatedBudget.getAmount());

        return budgetRepository.save(budget);
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}