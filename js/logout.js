$(document).ready(() => {
    const logout = document.getElementById("logout");

    logout.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        setTimeout(() => {
       window.location.href = "login.html";
        },1500)
    })
})