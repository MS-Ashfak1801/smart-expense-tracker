const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

document
    .getElementById("updateExpenseForm")
    .addEventListener("submit", updateExpense);

async function updateExpense(event) {

    event.preventDefault();

    const id =
        document.getElementById("expenseId").value;

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
                "http://localhost:8080/expenses/" + id,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": "Bearer " + token

                    },

                    body: JSON.stringify(expense)

                }
            );

        if (response.ok) {

            alert("✅ Expense Updated Successfully");

            document
                .getElementById("updateExpenseForm")
                .reset();

        } else {

            const error = await response.text();

            console.log(error);

            alert("❌ Failed To Update Expense\n" + error);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}