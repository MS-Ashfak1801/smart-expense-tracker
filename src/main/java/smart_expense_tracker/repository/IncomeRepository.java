package smart_expense_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import smart_expense_tracker.model.Income;
import smart_expense_tracker.model.User;

public interface IncomeRepository
        extends JpaRepository<Income, Long> {

    List<Income> findBySourceContainingIgnoreCase(
            String source);

    List<Income> findByUser(User user);
}