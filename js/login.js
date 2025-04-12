$(document).ready(() => {
//const part2 = "http://localhost";
//const part1 = ":3001/api/token";
const part2 = "https://apirest-m";
const part1 = "ysql-ywx2.onrender.com/api/token";
  const email = document.getElementById("correo");
  const pass = document.getElementById("contrasenia");
  const button = document.getElementById("login");

  //const rest_password = document.getElementById("rest_password");


 /* rest_password.addEventListener("click", () => {
      sessionStorage.setItem("token","jloujsdlsjdksscsdlsldkmlsdkchbjsdjcbsdcbhs");
      window.location.href = "restrablecer.html";
  })*/
  
  button.addEventListener("submit",(e) => {
      e.preventDefault();
      //console.log(email.value,pass.value);
  button.disabled = true;
    
          $("#bnt_click").append("<div class='spinner-border text-dark' role='status'>"+
              "<span class='sr-only'>Loading...</span>"+
            "</div>");
      
  
      var data = {
      email: email.value,
      password: pass.value
      }
  
      const options = {
          method: "POST",
          body: JSON.stringify(data),
          headers:{
              'Content-Type':'application/json'
          }
      }
  
      fetch(part2+part1+"/loginUsuariovw",options)
      .then(resp => resp.json())
      .then(resp => {
          console.log(resp.message);
          if (resp.message == "User not found" ||  resp.message == "Incorrect password" || resp.message == "Error logging in") {
              Swal.fire({
                  position: "top-center",
                  icon: "error",
                  title: "Error en las credenciales",
                  showConfirmButton: false,
                  timer: 3000,
                });   
                $("#bnt_click").html("");
                $("#bnt_click").html("Login");
                button.disabled = false;
          }else{
              sessionStorage.setItem("token",resp.token);
              Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Sea Bienvenid@",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
  //window.location.href = "campañas.html";
                },2000)
          }
      })
      .catch(error => {
          Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Hubo un error  al intentar ingresar, reportar al correo info@undiaparaelfuturo.com",
              showConfirmButton: false,
              timer: 15000,
            });
      })
  })
  })