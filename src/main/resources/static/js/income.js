const API_URL = "http://localhost:8080/income";
const token = localStorage.getItem("token");

window.onload = function () {
    loadIncome();
};

// Load All Income
function loadIncome() {

    fetch(API_URL, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById("incomeTable");
            table.innerHTML = "";

            data.forEach(income => {

                table.innerHTML += `
                    <tr>
                        <td>${income.id}</td>
                        <td>${income.source}</td>
                        <td>${income.amount}</td>
                        <td>${income.date}</td>
                        <td>
                            <button class="edit-btn"
                                    onclick="editIncome(${income.id})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                    onclick="deleteIncome(${income.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

        })
        .catch(error => console.error(error));
}

// Add / Update Income
function saveIncome() {

    const id = document.getElementById("incomeId").value;

    const income = {

        source: document.getElementById("source").value,

        amount: parseFloat(
            document.getElementById("amount").value
        ),

        date: document.getElementById("date").value

    };

    let url = API_URL;
    let method = "POST";

    if (id !== "") {

        url = API_URL + "/" + id;
        method = "PUT";

    }

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(income)

    })

        .then(response => response.json())
        .then(() => {

            clearForm();
            loadIncome();

        })

        .catch(error => console.error(error));

}

// Edit Income
function editIncome(id) {

    fetch(API_URL + "/" + id, {

        headers: {

            "Authorization": "Bearer " + token

        }

    })

        .then(response => response.json())
        .then(income => {

            document.getElementById("incomeId").value = income.id;
            document.getElementById("source").value = income.source;
            document.getElementById("amount").value = income.amount;
            document.getElementById("date").value = income.date;

            document.getElementById("saveBtn").innerText =
                "Update Income";

        });

}

// Delete Income
function deleteIncome(id) {

    if (!confirm("Are you sure?")) {

        return;

    }

    fetch(API_URL + "/" + id, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + token

        }

    })

        .then(() => loadIncome())
        .catch(error => console.error(error));

}

// Clear Form
function clearForm() {

    document.getElementById("incomeId").value = "";
    document.getElementById("source").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    document.getElementById("saveBtn").innerText =
        "Add Income";

}

// Logout
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}