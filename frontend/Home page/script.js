
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");
console.log("Toggle found:", !!toggle, "Nav found:", !!nav);

if (toggle && nav) {
    toggle.addEventListener("click", () => {
         console.log("Menu toggled");
        nav.classList.toggle("active");
    });
}

const API_BASE_URL = window.API_CONFIG?.baseUrl || 'http://localhost:5000';
console.log("API Base URL:", API_BASE_URL);

const form = document.getElementById("registerForm");
console.log("Register form found:", !!form);

if (form) {

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = document.querySelectorAll("#registerForm input");

        const data = {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            age: inputs[3].value,
            height: inputs[4].value,
            weight: inputs[5].value
        };
        console.log("Register data:", data);

        try {
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (res.ok && result.success) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert(result.message || 'Registration failed');
            }

        } catch (error) {
             console.error("Register error:", error);
    alert("Something went wrong!");
        }
    });
}

function joinNow() {
    alert("Welcome to Fitness App!");
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const inputs = document.querySelectorAll("#loginForm input");

        const data = {
            email: inputs[0].value,
            password: inputs[1].value
        };

        const res = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
            const result = await res.json();
        console.log("Register API response:", result);

            if (res.ok && result.success) {
                localStorage.setItem("user", result.email);
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || 'Login failed');
            }
    });
}
console.timeEnd("loginRequest");
