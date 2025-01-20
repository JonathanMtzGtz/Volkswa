$(document).ready(() => {
const clave = document.getElementById("password-input");
const link = "https://apirest-mysql-ywx2.onrender.com";
//const link = "http://localhost:3001";
const loginClave = link+"/a"+"p"+"i/token/loginClave";
const saveusuario = link+"/a"+"p"+"i/vweb/saveusuario";
const botonClave = document.getElementById("boton_clave");
const btn_form = document.getElementById("btn_form");
const form = document.getElementById("form");
const contrasenia = document.getElementById("contrasenia");
const validarContrasenia = document.getElementById("validar-contrasenia");
const email = document.getElementById("correo");
const getEmail = link+"/a"+"p"+"i/vweb/getEmail";

//validar que no se repita el correo
email.addEventListener("change", () => {
    var data = {
      correo : email.value
    }
    
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }
    
    fetch(getEmail,options)
    .then(resp=> resp.json())
    .then(resp => {
      console.log(resp.length)
      if (resp.length > 0) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "lo sentimos, este correo ya fue registrado",
          showConfirmButton: true,
          timer: 10000,
        }); 
        email.value = "";
      }
      
    })
    
    })

validarContrasenia.addEventListener("change", () => {
    if (validarContrasenia.value != contrasenia.value) {
        validarContrasenia.value = "";
        return alert("Las contraseñas no coinciden");
    }
})

contrasenia.addEventListener("change", () => {
   
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regex.test(contrasenia.value)) {
        alert('La contraseña debe tener mas de 8 caracteres, incluyendo números y letras.');
        contrasenia.value = "";
    }
});

validaRTtoggleVisibility();

function validaRTtoggleVisibility(){
    const toggleIcons = document.querySelectorAll('.toggle-visibility');

    toggleIcons.forEach(icon => {
        icon.addEventListener('click', () => {
          // Seleccionar el input asociado al ícono
          const input = icon.previousElementSibling;
    
          // Alternar el tipo de input entre "password" y "text"
          if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        });
      });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    btn_form.disabled = true;
    btn_form.innerHTML = "Guardando registro...";
    
    var formData = {}; //construye un objeto formData
    $('#form .form-control').each(function () {
      var fieldName = this.id.replace(/\[\]/g, '');
      console.log(fieldName, this.id)
      if (!formData[fieldName])
        formData[fieldName] = [];
      formData[fieldName].push(this.value);
    });

    $('#form .name').each(function () {
        var fieldName = this.id.replace(/\[\]/g, '');
        if (!formData[fieldName + 'DES'])
          formData[fieldName + 'DES'] = [];
         
        var combo = this;
        var selected = combo.options[combo.selectedIndex].text;
        formData[fieldName + 'DES'].push(selected);
      });
      
      fnRegistro(formData);
});

async function fnRegistro(e) {
    let req = fnJson(e);
    let x = 0;
    let result = [];
        result[x] = await addRegistro(req);
        if (result[x].status == "CORRECTO") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Registro realizado con éxito",
                showConfirmButton: true,
                timer: 4500
                }) ;
                setTimeout(() => {
                    window.location.href = "login.html";
                },5000)
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Algo fallo, vuelve a intentarlo, si el problema persiste, reporta al correo: info@undiaparaelfuturo.com",
                showConfirmButton: true,
                timer: 4500
                }) 
        }
        
}

 function addRegistro(e){
    console.log(e);
const data = {
    nombre: e.nombre,
    apeido_paterno: e.apeido_paterno,
    apeido_materno: e.apeido_materno,
    correo: e.correo,
    password: e.password,
    ciudad: e.ciudad,
    sucursal: e.sucursal,
    usuario: e.correo
}
const options = {
    method : "POST",
    body : JSON.stringify(data),
    headers:{
        'Content-Type':'Application/json'
    } 
}

return fetch(saveusuario,options)
.then(resp => resp.json())
.then(resp => {
    console.log(resp)
    return resp
})
.catch(error => {
    return error;
})

}

function fnJson(e){
var req = {
    nombre: e.nombre[0],
    apeido_paterno: e.apellido_paterno[0],
    apeido_materno: e.apellido_materno[0],
    correo: e.correo[0],
    password: e.contrasenia[0],
    ciudad: e.ciudad[0],
    sucursal: e.sucursal[0],
    usuario: e.correo[0]
}

return req;
}



botonClave.addEventListener("click", () => {
    const data  = {
        clave: clave.value
    }
    
    const options = {
        method : "POST",
        body   : JSON.stringify(data),
        headers :{
            'Content-Type':'Application/json'
        }
    }
    
    fetch(loginClave,options)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp.message);
        if (resp.message == "Incorrect clave") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "LA CLAVE NO ES CORRECTA",
                showConfirmButton: true,
                timer: 4500
                }) 
        }else{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "En un momento se cargará el formulario",
                showConfirmButton: true,
                timer: 4500
                });
                setTimeout(() => {
                    document.getElementById('card-1').style.display = 'none'; // Oculta el card-1
                    document.getElementById('crear-cuenta').style.display = 'block'; // Muestra el formulario de creación de cuenta
                },5000)
        }
    })
    .catch(error => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Error al enviar la petición, volver a intentar, si persiste el problema reportar al correo: info@undiaparaelfuturo.com",
            showConfirmButton: true,
            timer: 5500
            }) 
    })
})

});

function validar(input) {
    // Eliminar números
    let valor = input.value.replace(/[0-9]/g, '');

    // Eliminar caracteres que no sean letras, espacios o caracteres especiales permitidos
    valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    // Convertir la primera letra de cada palabra a mayúscula
    valor = valor.replace(/\b\w/g, (letra) => letra.toUpperCase());

    // Actualizar el valor del input
    input.value = valor;
}
