const token = localStorage.getItem("token");

// Login Check

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Delete Income

document
    .getElementById("deleteIncomeForm")
    .addEventListener("submit", deleteIncome);

async function deleteIncome(event) {

    event.preventDefault();

    const incomeId =
        document.getElementById("incomeId").value;

    const confirmDelete =
        confirm("Are you sure you want to delete this income?");

    if (!confirmDelete) {

        return;

    }

    try {

        const response =
            await fetch(
                "http://localhost:8080/income/" + incomeId,
                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            "Bearer " + token

                    }

                }
            );

        if (response.ok) {

            alert("✅ Income Deleted Successfully");

            document
                .getElementById("deleteIncomeForm")
                .reset();

        } else {

            alert("❌ Failed To Delete Income");

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}