// JWT Check
const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.replace(
        "login.html"
    );
}
const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";
}

// Logout

const logoutLink =
    document.querySelector(
        'a[href="login.html"]'
    );

if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "token"
            );
            function logout() {

                localStorage.removeItem("token");

                window.location.replace(
                    "login.html"
                );
            }

            alert(
                "Logged Out Successfully"
            );
        }
    );
}

// Demo Values

document.getElementById(
    "totalIncome"
).innerText = "₹50,000";

document.getElementById(
    "totalExpense"
).innerText = "₹20,000";

document.getElementById(
    "balance"
).innerText = "₹30,000";

console.log(
    "Dashboard Loaded Successfully"
);