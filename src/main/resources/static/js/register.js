document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);

async function registerUser(e) {

    e.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;
    }

    const data = {

        name:
        document.getElementById("username").value,

        email:
        document.getElementById("email").value,

        password:
        password
    };

    const response =
        await fetch(
            "http://localhost:8080/users/register",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
        );

    if(response.ok){

        alert("Registration Successful");

        window.location.href =
            "login.html";

    }else{

        alert("Registration Failed");
    }
}