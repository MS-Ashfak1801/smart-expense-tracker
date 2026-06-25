package smart_expense_tracker.dto;

public class DashboardResponse {

    private double totalIncome;
    private double totalExpense;
    private double balance;

    public DashboardResponse(double totalIncome, double totalExpense, double balance) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public double getBalance() {
        return balance;
    }
}