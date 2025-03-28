function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Falscher Benutzername oder Passwort!");
    }
}

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = loadUsers();
    if (users.some(u => u.username === username)) {
        alert("Benutzername existiert bereits!");
        return;
    }

    users.push({ username, password });
    saveUsers(users);
    alert("Registrierung erfolgreich!");
}

function checkLogin() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
