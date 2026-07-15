const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";
}

// Update Income

document
    .getElementById("updateIncomeForm")
    .addEventListener("submit", updateIncome);

async function updateIncome(event) {

    event.preventDefault();

    const incomeId =
        document.getElementById("incomeId").value;

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
                "http://localhost:8080/income/" + incomeId,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify(income)

                }
            );

        if (response.ok) {

            alert("✅ Income Updated Successfully");

            document
                .getElementById("updateIncomeForm")
                .reset();

        } else {

            alert("❌ Failed To Update Income");

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}