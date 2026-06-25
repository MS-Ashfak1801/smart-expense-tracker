package smart_expense_tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import smart_expense_tracker.model.Income;
import smart_expense_tracker.model.User;
import smart_expense_tracker.repository.IncomeRepository;
import smart_expense_tracker.repository.UserRepository;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    public Income saveIncome(Income income) {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        income.setUser(user);

        return incomeRepository.save(income);
    }

    public List<Income> getAllIncome() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        return incomeRepository.findByUser(user);
    }

    public Income getIncomeById(Long id) {

        return incomeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Income Not Found"));
    }

    public double getTotalIncome() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        return incomeRepository.findByUser(user)
                .stream()
                .mapToDouble(Income::getAmount)
                .sum();
    }

    public List<Income> searchIncome(String source) {

        return incomeRepository
                .findBySourceContainingIgnoreCase(source);
    }

    public Income updateIncome(Long id, Income updatedIncome) {

        Income income = incomeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Income Not Found"));

        income.setAmount(updatedIncome.getAmount());
        income.setSource(updatedIncome.getSource());
        income.setDate(updatedIncome.getDate());

        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
}