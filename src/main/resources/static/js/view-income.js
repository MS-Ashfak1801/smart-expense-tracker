const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";
}

// Page Load

window.onload = function () {

    loadIncome();

};

// Load Income

async function loadIncome() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/income",
                {

                    method: "GET",

                    headers: {

                        "Authorization":
                            "Bearer " + token

                    }

                }
            );

        if (!response.ok) {

            alert("Failed To Load Income");

            return;

        }

        const incomes =
            await response.json();

        const tableBody =
            document.getElementById(
                "incomeTableBody"
            );

        tableBody.innerHTML = "";

        if (incomes.length === 0) {

            tableBody.innerHTML =

                `<tr>

                    <td colspan="4">

                        No Income Records Found

                    </td>

                </tr>`;

            return;

        }

        incomes.forEach(income => {

            tableBody.innerHTML +=

                `<tr>

                    <td>${income.id}</td>

                    <td>${income.source}</td>

                    <td>₹${income.amount}</td>

                    <td>${income.date}</td>

                </tr>`;

        });

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}