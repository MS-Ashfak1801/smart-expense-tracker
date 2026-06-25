package smart_expense_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import smart_expense_tracker.model.Budget;
import smart_expense_tracker.model.User;

public interface BudgetRepository
        extends JpaRepository<Budget, Long> {

    List<Budget> findByMonthContainingIgnoreCase(
            String month);

    List<Budget> findByUser(User user);
}