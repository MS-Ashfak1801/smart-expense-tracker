const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

document
    .getElementById("deleteExpenseForm")
    .addEventListener("submit", deleteExpense);

async function deleteExpense(event) {

    event.preventDefault();

    const id =
        document.getElementById("expenseId").value;

    if (!confirm("Delete this expense?")) {

        return;

    }

    try {

        const response =
            await fetch(
                "http://localhost:8080/expenses/" + id,
                {

                    method: "DELETE",

                    headers: {

                        "Authorization": "Bearer " + token

                    }

                }
            );

        if (response.ok) {

            alert("✅ Expense Deleted Successfully");

            document
                .getElementById("deleteExpenseForm")
                .reset();

        } else {

            const error = await response.text();

            console.log(error);

            alert("❌ Failed To Delete Expense\n" + error);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}