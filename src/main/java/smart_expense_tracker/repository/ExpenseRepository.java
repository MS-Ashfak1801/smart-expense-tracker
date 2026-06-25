package smart_expense_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import smart_expense_tracker.model.Expense;
import smart_expense_tracker.model.User;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByCategoryContainingIgnoreCase(
            String category);

    List<Expense> findByUser(User user);
}