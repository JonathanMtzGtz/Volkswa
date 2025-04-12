$(document).ready(() => {
    // Configuración inicial
    const link = "https://apirest-mysql-ywx2.onrender.com";
    const endpoints = {
        loginClave: link + "/api/token/loginClave",
        saveusuario: link + "/api/vweb/saveusuario",
        getEmail: link + "/api/vweb/getEmail"
    };

    // Elementos del DOM
    const elements = {
        passwordInput: document.getElementById("password-input"),
        botonClave: document.getElementById("boton_clave"),
        btnForm: document.getElementById("btn_form"),
        form: document.getElementById("form"),
        contrasenia: document.getElementById("contrasenia"),
        validarContrasenia: document.getElementById("validar-contrasenia"),
        email: document.getElementById("correo"),
        card1: document.getElementById("card-1"),
        crearCuenta: document.getElementById("crear-cuenta")
    };

    // Validar unicidad del correo electrónico
    elements.email.addEventListener("change", async () => {
        const email = elements.email.value.trim();
        if (!email) return;

        try {
            const response = await fetch(endpoints.getEmail, {
                method: "POST",
                body: JSON.stringify({ correo: email }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (data.length > 0) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Correo ya registrado",
                    text: "Este correo electrónico ya está en uso. Por favor utiliza otro.",
                    confirmButtonColor: '#0056b3',
                    confirmButtonText: 'Entendido'
                });
                elements.email.value = "";
                elements.email.focus();
            }
        } catch (error) {
            console.error("Error al validar correo:", error);
        }
    });

    // Validar coincidencia de contraseñas
    elements.validarContrasenia.addEventListener("change", () => {
        if (elements.validarContrasenia.value !== elements.contrasenia.value) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Contraseñas no coinciden",
                text: "Las contraseñas ingresadas no son iguales. Por favor verifica.",
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
            elements.validarContrasenia.value = "";
            elements.validarContrasenia.focus();
        }
    });

    // Validar fortaleza de contraseña
    elements.contrasenia.addEventListener("change", () => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        if (!regex.test(elements.contrasenia.value)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Contraseña débil",
                html: "La contraseña debe tener:<ul><li>Mínimo 8 caracteres</li><li>Al menos una letra</li><li>Al menos un número</li></ul>",
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
            elements.contrasenia.value = "";
            elements.contrasenia.focus();
        }
    });

    // Toggle visibilidad de contraseña
    function setupToggleVisibility() {
        document.querySelectorAll('.toggle-visibility').forEach(icon => {
            icon.addEventListener('click', () => {
                const input = icon.previousElementSibling;
                input.type = input.type === 'password' ? 'text' : 'password';
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        });
    }
    setupToggleVisibility();

    // Envío del formulario de registro
    elements.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!validateForm()) return;

        // Deshabilitar botón y mostrar spinner
        const originalText = elements.btnForm.innerHTML;
        elements.btnForm.disabled = true;
        elements.btnForm.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registrando...';

        try {
            // Preparar datos del formulario
            const formData = prepareFormData();
            
            // Registrar usuario
            const registroResult = await registerUser(formData);
            
            if (registroResult.status === "CORRECTO") {
                // Mostrar mensaje de éxito y redirigir al login
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    html: 'Tu cuenta ha sido creada correctamente.<br><br>Serás redirigido al login en 5 segundos...',
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    willClose: () => {
                        window.location.href = "login.html";
                    }
                });
                
                // Redirección automática
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 5000);
            } else {
                throw new Error(registroResult.message || 'Error en el registro');
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error en el registro',
                html: `Ocurrió un error al registrar tu cuenta: <strong>${error.message}</strong><br><br>Por favor intenta nuevamente o contacta a soporte técnico.`,
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
        } finally {
            // Restaurar botón
            elements.btnForm.disabled = false;
            elements.btnForm.innerHTML = originalText;
        }
    });

    // Función para validar el formulario completo
    function validateForm() {
        // Validar que todos los campos requeridos estén completos
        const requiredFields = elements.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos requeridos.',
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
            return false;
        }
        
        // Validar contraseñas coincidentes
        if (elements.contrasenia.value !== elements.validarContrasenia.value) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Las contraseñas ingresadas no son iguales.',
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
            return false;
        }
        
        return true;
    }

    // Preparar datos del formulario
    function prepareFormData() {
        const formData = {};
        
        $('#form .form-control').each(function() {
            const fieldName = this.id.replace(/\[\]/g, '');
            if (!formData[fieldName]) formData[fieldName] = [];
            formData[fieldName].push(this.value);
        });
        
        $('#form .name').each(function() {
            const fieldName = this.id.replace(/\[\]/g, '');
            const combo = this;
            const selected = combo.options[combo.selectedIndex].text;
            
            if (!formData[fieldName + 'DES']) formData[fieldName + 'DES'] = [];
            formData[fieldName + 'DES'].push(selected);
        });
        
        return formData;
    }

    // Registrar usuario en el backend
    async function registerUser(formData) {
        const userData = {
            nombre: formData.nombre[0],
            apeido_paterno: formData.apellido_paterno[0],
            apeido_materno: formData.apellido_materno[0],
            correo: formData.correo[0],
            password: formData.contrasenia[0],
            ciudad: formData.ciudad[0],
            sucursal: formData.sucursal[0],
            usuario: formData.correo[0]
        };
        
        const response = await fetch(endpoints.saveusuario, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await response.json();
    }

    // Validación de clave (parte inicial del formulario)
    elements.botonClave.addEventListener("click", async () => {
        const clave = elements.passwordInput.value.trim();
        if (!clave) return;
        
        // Mostrar spinner
        const originalText = elements.botonClave.innerHTML;
        elements.botonClave.disabled = true;
        elements.botonClave.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Validando...';
        
        try {
            const response = await fetch(endpoints.loginClave, {
                method: "POST",
                body: JSON.stringify({ clave }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (data.message === "Incorrect clave") {
                throw new Error('Clave incorrecta');
            } else {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Clave válida',
                    text: 'Ahora puedes completar tu registro.',
                    confirmButtonColor: '#0056b3',
                    confirmButtonText: 'Continuar'
                });
                
                elements.card1.style.display = 'none';
                elements.crearCuenta.style.display = 'block';
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al validar la clave',
                confirmButtonColor: '#0056b3',
                confirmButtonText: 'Entendido'
            });
        } finally {
            elements.botonClave.disabled = false;
            elements.botonClave.innerHTML = originalText;
        }
    });

    // Función para validar nombres (solo letras)
    function validar(input) {
        let valor = input.value
            .replace(/[0-9]/g, '') // Eliminar números
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Eliminar caracteres especiales no permitidos
        
        // Convertir a mayúscula la primera letra de cada palabra
        valor = valor.toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase());
        
        input.value = valor;
    }
});