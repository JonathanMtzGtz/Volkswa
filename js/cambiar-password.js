$(document).ready(() => {
    //const part2 = "http://localhost";
    //const part1 = ":3001/api/token";
    const part2 = "https://apirest-mysql-ywx2.onrender.com";
    const part1 = "/api/token";
    const reestablecercontrasenia = part2+"/api/vweb/reestablecercontrasenia";
      const email = document.getElementById("correo");
      const pass = document.getElementById("contrasenia");
      var token = "";
      const button = document.getElementById("login");
      const cambiar = document.getElementById("cambiar");
      const contrasena_no_cumple = document.getElementById('contrasena_no_cumple');
      const contrasena_coincide = document.getElementById("contrasena_coincide");
    
      //const rest_password = document.getElementById("rest_password");
    
    
     /* rest_password.addEventListener("click", () => {
          sessionStorage.setItem("token","jloujsdlsjdksscsdlsldkmlsdkchbjsdjcbsdcbhs");
          window.location.href = "restrablecer.html";
      })*/
  
         
  
      email.addEventListener("change", () => {
       if (email.value != "") {
        pass.disabled = false;
       }else{
        pass.disabled = true;
       }
      })
      
      pass.addEventListener("change",(e) => {
          e.preventDefault();
          //console.log(email.value,pass.value);
        
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
              token = resp;
              if (resp.message == "User not found" ||  resp.message == "Incorrect password") {
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
                cambiar.disabled = true;
               $("#contrasenia2").append('<label for="contraseña" class="visually-hidden"> contraseña</label>'+
                '<input type="password" class="form-control" id="contrasenia22" placeholder="Nueva contraseña" required>');
  
                contrasenia2 = document.getElementById("contrasenia22");
  
                contrasenia2.addEventListener("change", () => {
                  console.log(pass.value, $("#contrasenia22").val())
                          if(pass.value == $("#contrasenia22").val()){
                           contrasena_no_cumple.style.display = "none";
                          contrasena_coincide.style.display = "inline";
                          return;
                                  }
                   
                          var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                      
                          if (!regex.test(contrasenia2.value)) {
                            contrasena_coincide.style.display = "none";
                            contrasena_no_cumple.style.display = "inline";
                              contrasenia2.value = "";
                              return;
                          }
                            contrasena_coincide.style.display = "none";
                            contrasena_no_cumple.style.display = "none";
                          cambiar.disabled = false;
                      });
  
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
  
  
      cambiar.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click")
  
        var data = {
            email: email.value,
            contrasena: $("#contrasenia22").val()
            }
        
            const options = {
                method: "PUT",
                body: JSON.stringify(data),
                headers:{
                     'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type':'application/json'
                }
            }
  
            fetch(reestablecercontrasenia,options)
            .then(resp => resp.json())
            .then(resp => {
              console.log(resp)
                if (resp.message == 'Contraseña actualizada correctamente') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Contraseña actualizada con exito",
                        showConfirmButton: false,
                        timer: 3000,
                      }); 
                      sessionStorage.setItem("token",token);
                     setTimeout(() => {
                    window.location.href = "campañas.html";
                    },4000)
                }else{
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "Error en la contraseña, intente de nuevo",
                        showConfirmButton: false,
                        timer: 3000,
                      }); 
                }
            })
    })
      })