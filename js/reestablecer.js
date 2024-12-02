$(document).ready(() => {
    var btn = document.getElementById("bnt_click");
    const link = "http://localhost:3001";
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
        <div style="background-color: #ececec; padding: 0; margin: 0 auto; font-weight: 200; width: 100%!important;">
          <p> </p>
          <center>
            <h2 style="color: #3b693c;">Recuperar contraseña</h2>
          </center>
          <br />
          <table style="width: 600px; margin-left: auto; margin-right: auto; background-color: #ffffff; height: 165px;">
            <tbody>
              <tr style="height: 61px;">
                <td style="width: 590px; background-color: #3b693c; text-align: center; height: 61px;" colspan="2">
                  <h2><span style="color: #ffffff;"><strong>aqui esta es tu nueva contraseña: ${password}, si desea cambiarla, ya dentro de su perfil, podra realizarlo</strong></span></h2>
                </td>
              </tr>
            </tbody>
          </table>
          <p> </p>
          <p> </p>
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
          fromEmail: "dev.ti@grupoelcerezo.com",
          html: Body
          }
        
          var options = {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
              "Content-Type":"application/json"
            }
          }
        
          fetch(link+"/api/correo/sendEmail",options)
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
        
            }
    
    })