document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  console.log("Checking login status...");
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status

  if (token && isLoggedIn) {
      loginButton.style.display = "none";
      registerButton.style.display = "none";
      logoutButton.style.display = "block";
      console.log("User is logged in; displaying logout button.");
  } else {
      loginButton.style.display = "block";
      registerButton.style.display = "block";
      logoutButton.style.display = "none";
      console.log("User is not logged in; displaying login and register buttons.");
  }

  // Logout functionality
  logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token"); // Remove the token
      localStorage.removeItem("isLoggedIn"); // Clear login status
      window.location.href = "main.html"; // Redirect to home or login page
      alert("Logout Successfully from CodeWave");
  });
});
