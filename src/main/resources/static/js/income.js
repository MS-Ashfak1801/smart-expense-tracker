const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.replace("login.html");
}

// Page Load

window.onload = function () {

    loadIncome();
};

// Add Income

document
    .getElementById("incomeForm")
    .addEventListener("submit", addIncome);

async function addIncome(event) {

    event.preventDefault();

    const income = {

        source:
        document.getElementById("source").value,

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
                "http://localhost:8080/income",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify(income)
                }
            );

        if (response.ok) {

            alert("Income Added Successfully ✅");

            document
                .getElementById("incomeForm")
                .reset();

            loadIncome();

        } else {

            alert("Failed To Add Income ❌");
        }

    } catch (error) {

        console.error(error);

        alert("Server Error ❌");
    }
}

// Load Income

async function loadIncome() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/income",
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

        const incomes =
            await response.json();

        const tableBody =
            document.getElementById(
                "incomeTableBody"
            );

        tableBody.innerHTML = "";

        incomes.forEach(income => {

            tableBody.innerHTML += `
                <tr>

                    <td>${income.id}</td>

                    <td>${income.source}</td>

                    <td>₹${income.amount}</td>

                    <td>${income.date}</td>

                    <td>

                        <button
                            onclick="editIncome(${income.id})">
                            Edit
                        </button>

                        <button
                            onclick="deleteIncome(${income.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);
    }
}

// Update Income

async function editIncome(id) {

    const source =
        prompt("Enter New Source");

    const amount =
        prompt("Enter New Amount");

    const date =
        prompt("Enter New Date (YYYY-MM-DD)");

    if (
        !source ||
        !amount ||
        !date
    ) {
        return;
    }

    try {

        const response =
            await fetch(
                `http://localhost:8080/income/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":
                            "Bearer " + token
                    },

                    body: JSON.stringify({
                        source: source,
                        amount: parseFloat(amount),
                        date: date
                    })
                }
            );

        if (response.ok) {

            alert(
                "Income Updated Successfully ✅"
            );

            loadIncome();

        } else {

            alert(
                "Update Failed ❌"
            );
        }

    } catch (error) {

        console.error(error);
    }
}

// Delete Income

async function deleteIncome(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response =
            await fetch(
                `http://localhost:8080/income/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        if (response.ok) {

            alert(
                "Income Deleted Successfully ✅"
            );

            loadIncome();

        } else {

            alert(
                "Delete Failed ❌"
            );
        }

    } catch (error) {

        console.error(error);
    }
}