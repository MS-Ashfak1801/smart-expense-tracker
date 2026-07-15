const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

document
    .getElementById("expenseForm")
    .addEventListener("submit", addExpense);

async function addExpense(event) {

    event.preventDefault();

    const expense = {

        description: document.getElementById("description").value,

        category: document.getElementById("category").value,

        amount: parseFloat(
            document.getElementById("amount").value
        ),

        date: document.getElementById("date").value

    };

    try {

        const response = await fetch(
            "http://localhost:8080/expenses",
            {
                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify(expense)

            }
        );

        if (response.ok) {

            alert("✅ Expense Added Successfully");

            document
                .getElementById("expenseForm")
                .reset();

        } else {

            const error = await response.text();

            console.log(error);

            alert("❌ Failed To Add Expense\n" + error);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}