$(document).ready(() => {
  console.log(sessionStorage.getItem("token"))
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
      }
})