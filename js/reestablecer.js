$(document).ready(() => {
    var btn = document.getElementById("bnt_click");
    //const link = "http://localhost:3001";
    const link = "https://apirest-mysql-ywx2.onrender.com";
    const recuperarcontrasenia = link+"/a"+"p"+"i/vweb/recuperarcontrasenia";
    function generateRandomPassword(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters[randomIndex];
      }
      return password;
    }
    
    const password = generateRandomPassword(8);
    
    
    
        const Body = `

<div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center; width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
    <div style="text-align: left;">
      <img src="https://undiaparaelfuturo.com/img/logo.png" alt="Volkswagen México - Un Día para el Futuro" style="height: 50px; margin-bottom: 20px;">
    </div>
    <h2 style="font-size: 22px; color: #444;">Tu nueva contraseña</h2>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">
      Hola, este mensaje es de la plataforma de <strong>Volkswagen México - Un Día para el Futuro</strong>.
    </p>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">
      Hemos generado automáticamente una nueva contraseña para ti:
    </p>
    <div style="font-size: 24px; font-weight: bold; color: #222; margin: 10px 0; padding: 10px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;">
    ${password}
    </div>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">
      Si deseas cambiarla, haz clic en el siguiente enlace:
    </p>

    https://undiaparaelfuturo.com/cambiar-password.html
    
    <p style="font-size: 12px; color: #bbb; margin-top: 20px;">
      © 2024 Volkswagen México - Un Día para el Futuro. Todos los derechos reservados.
    </p>
  </div>
      `;
      
    
        $("#login").on("submit", (event) => {
    event.preventDefault();
    
    /*var contrasena = document.getElementById('Password').value;
              var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      
              if (!regex.test(contrasena)) {
                  event.preventDefault();
               return   alert('La contraseña debe tener al menos 8 caracteres, incluyendo números y letras.');
              }*/
    
    if ($("#correo").val() == "") return alert("Requerimos el correo, como primera validación");
    //if ($("#Password").val() == "") return alert("Ingrese la nueva contraseña");
    btn.innerHTML = "Validando actualización...";
    btn.disabled = "true";
        var data = 
          {
            email: $("#correo").val(),
            contrasena: password
        }
        
      
        var options = {
          method: "PUT",
          body: JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        }
    
        fetch(recuperarcontrasenia,options)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp)
          message: 
          if (resp.message == 'User not found') {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Esta cuenta de correo no existe",
              showConfirmButton: false,
              timer: 10000,
            }); 
            btn.innerHTML = "Enviar";
            btn.disabled = false;
          }else{
            if (resp.message == 'Contraseña actualizada correctamente') {
              Recuperar($("#correo").val())
              setTimeout(() => {
    //window.location.href = "login.html";
              },4000)
            }
          }
        })
        .catch(error => {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Hubo un error al intentar ingresar, reportar al correo kevin.martinez@hgroup.consulting",
                showConfirmButton: false,
                timer: 15000,
              });
        })
      
       /* fetch("http://localhost:3001/api/correo/sendEmail",options)
        .then(resp => resp.json())
        .then(resp => {
      console.log(resp)
      if (resp != 'CORRECTO') {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Error al enviar el correo, pedir soporte a TI",
          showConfirmButton: false,
          timer: 10000,
        }); 
      }
        })*/
      
          
        })
    
        function Recuperar(email){
          var data = {
          text: 'Hola te saludamos de Volkswagen',
           toEmail: email,
          fromEmail: "info@undiaparaelfuturo.com",
          html: Body
          }
        
          var options = {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
              "Content-Type":"application/json"
            }
          }
        
          fetch(link+"/api/correo/sendEmailvw",options)
          .then(resp => resp.json())
          .then(resp => {
        console.log(resp)
        if (resp != 'CORRECTO') {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Error al enviar la nueva contraseña, volver a intentar",
            showConfirmButton: false,
            timer: 10000,
          }); 
        }else{
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Una nueva contraseña, se le ha mandado a su correo",
            showConfirmButton: false,
            timer: 10000,
          }); 
        }
          })
          .catch(error => {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Error al enviar la nueva contraseña, "+error+" volver a intentar, si el problema persiste reportar al correo info@undiaparaelfuturo.com",
                showConfirmButton: false,
                timer: 10000,
              }); 
          })
        
            }
    
    })