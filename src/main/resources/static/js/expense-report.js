const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Page Load

window.onload = function () {

    loadExpenseReport();

};

// Load Expense Report

async function loadExpenseReport() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/expenses",
                {

                    method: "GET",

                    headers: {

                        "Authorization": "Bearer " + token

                    }

                }
            );

        if (!response.ok) {

            alert("Failed To Load Expense Report");

            return;

        }

        const expenses =
            await response.json();

        const tableBody =
            document.getElementById("expenseReportBody");

        tableBody.innerHTML = "";

        if (expenses.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5">
                        No Expense Records Found
                    </td>
                </tr>
            `;

            return;

        }

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

    }

    catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}