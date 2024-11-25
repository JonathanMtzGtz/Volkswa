$(document).ready(() => {
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
      }
})