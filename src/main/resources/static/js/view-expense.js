const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

window.onload = function () {

    loadExpense();

};

async function loadExpense() {

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

            alert("Failed To Load Expenses");

            return;

        }

        const expenses =
            await response.json();

        const table =
            document.getElementById("expenseTableBody");

        table.innerHTML = "";

        if (expenses.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">No Expense Records Found</td>
                </tr>
            `;

            return;

        }

        expenses.forEach(expense => {

            table.innerHTML += `
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

        alert("❌ Server Error");

    }

}