package smart_expense_tracker.dto;

public class ReportResponse {

    private double totalIncome;
    private double totalExpense;
    private double balance;
    private double budget;
    private double remainingBudget;

    public ReportResponse(
            double totalIncome,
            double totalExpense,
            double balance,
            double budget,
            double remainingBudget) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.budget = budget;
        this.remainingBudget = remainingBudget;
    }

    public double getTotalIncome() { return totalIncome; }
    public double getTotalExpense() { return totalExpense; }
    public double getBalance() { return balance; }
    public double getBudget() { return budget; }
    public double getRemainingBudget() { return remainingBudget; }
}