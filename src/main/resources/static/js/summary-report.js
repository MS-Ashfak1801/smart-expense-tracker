const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Page Load

window.onload = function () {

    loadSummary();

};

// Load Summary

async function loadSummary() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/dashboard",
                {

                    method: "GET",

                    headers: {

                        "Authorization": "Bearer " + token

                    }

                }
            );

        if (!response.ok) {

            alert("Failed To Load Summary");

            return;

        }

        const data =
            await response.json();

        document
            .getElementById("totalIncome")
            .innerText = "₹" + data.totalIncome;

        document
            .getElementById("totalExpense")
            .innerText = "₹" + data.totalExpense;

        document
            .getElementById("balance")
            .innerText = "₹" + data.balance;

    }

    catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}