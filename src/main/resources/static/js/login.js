document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

async function loginUser(e) {

    e.preventDefault();

    const data = {

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value
    };

    try {

        const response =
            await fetch(
                "http://localhost:8080/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

        const result =
            await response.json();

        if (result.token) {

            localStorage.setItem(
                "token",
                result.token
            );

            alert(
                result.message
            );

            window.location.href =
                "dashboard.html";

        } else {

            alert(
                result.message ||
                "Login Failed"
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Server Error"
        );
    }
}