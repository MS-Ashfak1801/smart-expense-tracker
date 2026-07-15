const token = localStorage.getItem("token");

// Login Check
if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";
}

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

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify(income)

                }
            );

        if (response.ok) {

            alert("✅ Income Added Successfully");

            document
                .getElementById("incomeForm")
                .reset();

        } else {

            alert("❌ Failed To Add Income");

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}