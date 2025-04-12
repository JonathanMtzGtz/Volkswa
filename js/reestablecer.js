$(document).ready(() => {
  const btn = $("#bnt_click");
  //const link = "http://localhost:3001";
  const link = "https://apirest-mysql-ywx2.onrender.com";
  const recuperarcontrasenia = link + "/api/vweb/recuperarcontrasenia";

  // Generar contraseña aleatoria segura
  function generateRandomPassword(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      const specialChars = '!@#$%^&*';
      let password = '';
      
      // Asegurar al menos un carácter especial
      password += specialChars[Math.floor(Math.random() * specialChars.length)];
      
      // Resto de la contraseña
      for (let i = 1; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters[randomIndex];
      }
      
      // Mezclar la contraseña para mayor seguridad
      return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  const password = generateRandomPassword(12); // Contraseña más larga y segura

  const Body = `
<div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center; width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
  <div style="text-align: left;">
    <img src="https://undiaparaelfuturo.com/img/logo.png" alt="Volkswagen México - Un Día para el Futuro" style="height: 50px; margin-bottom: 20px;">
  </div>
  <h2 style="font-size: 22px; color: #444;">Tu nueva contraseña temporal</h2>
  <p style="font-size: 16px; color: #555; margin: 20px 0;">
    Hola, este mensaje es de la plataforma de <strong>Volkswagen México - Un Día para el Futuro</strong>.
  </p>
  <p style="font-size: 16px; color: #555; margin: 20px 0;">
    Hemos generado automáticamente una nueva contraseña temporal para ti:
  </p>
  <div style="font-size: 24px; font-weight: bold; color: #222; margin: 10px 0; padding: 10px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; background-color: #f0f0f0; border-radius: 4px;">
    ${password}
  </div>
  <p style="font-size: 16px; color: #555; margin: 20px 0;">
    Por seguridad, te recomendamos cambiar esta contraseña después de iniciar sesión.
  </p>
  <a href="https://undiaparaelfuturo.com/cambiar-password.html" style="display: inline-block; background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 0; font-weight: bold;">
    Cambiar contraseña
  </a>
  <p style="font-size: 14px; color: #777; margin-top: 30px;">
    Si no solicitaste este cambio, por favor contacta a soporte técnico inmediatamente.
  </p>
  <p style="font-size: 12px; color: #bbb; margin-top: 20px;">
    © ${new Date().getFullYear()} Volkswagen México - Un Día para el Futuro. Todos los derechos reservados.
  </p>
</div>`;

  $("#login").on("submit", (event) => {
      event.preventDefault();
      
      // Validación básica del correo
      const email = $("#correo").val().trim();
      if (!email) {
          Swal.fire({
              icon: 'error',
              title: 'Campo requerido',
              text: 'Por favor ingresa tu correo electrónico',
              confirmButtonColor: '#0056b3'
          });
          return;
      }

      // Validación de formato de correo
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.fire({
              icon: 'error',
              title: 'Correo inválido',
              text: 'Por favor ingresa un correo electrónico válido',
              confirmButtonColor: '#0056b3'
          });
          return;
      }

      // Mostrar spinner en el botón
      const originalText = btn.html();
      btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...');
      btn.prop('disabled', true);

      // Preparar datos para la API
      const data = {
          email: email,
          contrasena: password
      };

      const options = {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json"
          }
      };

      // Primera llamada: Actualizar contraseña en la base de datos
      fetch(recuperarcontrasenia, options)
          .then(resp => {
              if (!resp.ok) throw new Error(resp.statusText);
              return resp.json();
          })
          .then(resp => {
              if (resp.message === 'User not found') {
                  throw new Error('Esta cuenta de correo no existe');
              }
              
              if (resp.message === 'Contraseña actualizada correctamente') {
                  // Segunda llamada: Enviar correo con la nueva contraseña
                  return Recuperar(email);
              }
              
              throw new Error('Respuesta inesperada del servidor');
          })
          .then(() => {
              // Mostrar mensaje de éxito
              Swal.fire({
                  title: 'Contraseña actualizada',
                  html: 'Hemos enviado una nueva contraseña temporal a tu correo electrónico. <br><br>Serás redirigido al login en 10 segundos...',
                  icon: 'success',
                  timer: 10000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  willClose: () => {
                      window.location.href = "login.html";
                  }
              });

              // Redirección automática después de 5 segundos
              setTimeout(() => {
                  window.location.href = "login.html";
              }, 12000);
          })
          .catch(error => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  html: `Hubo un problema al procesar tu solicitud: <strong>${error.message}</strong><br><br>Si el problema persiste, por favor contacta a soporte técnico.`,
                  confirmButtonColor: '#0056b3',
                  confirmButtonText: 'Entendido'
              });
          })
          .finally(() => {
              // Restaurar botón
              btn.html(originalText);
              btn.prop('disabled', false);
          });
  });

  function Recuperar(email) {
      return new Promise((resolve, reject) => {
          const data = {
              text: 'Hola, te saludamos de Un día para el futuro - Volkswagen',
              toEmail: email,
              fromEmail: "info@undiaparaelfuturo.com",
              html: Body
          };

          const options = {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                  "Content-Type": "application/json"
              }
          };

          fetch(link + "/api/correo/sendEmailvw", options)
              .then(resp => {
                  if (!resp.ok) throw new Error(resp.statusText);
                  return resp.json();
              })
              .then(resp => {
                  if (resp === 'CORRECTO') {
                      resolve();
                  } else {
                      throw new Error('Error al enviar el correo');
                  }
              })
              .catch(error => {
                  reject(new Error('Error al enviar la nueva contraseña: ' + error.message));
              });
      });
  }
});