const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";
}

// Page Load

window.onload = function () {

    loadExpenses();
};

// Add Expense

document
    .getElementById("expenseForm")
    .addEventListener("submit", addExpense);

async function addExpense(event) {

    event.preventDefault();

    const expense = {

        description:
        document.getElementById("description").value,

        category:
        document.getElementById("category").value,

        amount:
            parseFloat(
                document.getElementById("amount").value
            ),

        date:
        document.getElementById("date").value
    };

    try {

        const response =
            await fetch(
                "http://localhost:8080/expenses",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token
                    },

                    body:
                        JSON.stringify(expense)
                }
            );

        if (response.ok) {

            alert(
                "Expense Added Successfully ✅"
            );

            document
                .getElementById("expenseForm")
                .reset();

            loadExpenses();

        } else {

            alert(
                "Failed To Add Expense ❌"
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Server Error ❌"
        );
    }
}

// Load Expense List

async function loadExpenses() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/expenses",
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        const expenses =
            await response.json();

        const tableBody =
            document.getElementById(
                "expenseTableBody"
            );

        tableBody.innerHTML = "";

        expenses.forEach(expense => {

            tableBody.innerHTML += `
                <tr>
                    <td>${expense.id}</td>
                    <td>${expense.description}</td>
                    <td>${expense.category}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.date}</td>
                </tr>
            `;
        });

    } catch (error) {

        console.error(error);
    }
}