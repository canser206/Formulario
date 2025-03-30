document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const userData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            try {
                const response = await fetch("http://127.0.0.1:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();
                alert(result.message);

                if (result.message === "Usuario registrado correctamente") { // ✅ Ajusta la condición sin el emoji
                    window.location.href = "/exito.html";  // Redirige a la página de éxito
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema con el registro.");
            }
        });
    }
});
