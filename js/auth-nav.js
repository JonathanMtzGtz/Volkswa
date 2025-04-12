// auth-nav.js - Versión mejorada con manejo de páginas públicas
document.addEventListener('DOMContentLoaded', function() {
    // Lista de páginas que requieren autenticación
    const protectedPages = ['campañas.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Solo verificar autenticación en páginas protegidas
    if (protectedPages.includes(currentPage)) {
        if (!isLoggedIn()) {
            window.location.href = "login.html";
            return;
        }
    }
    
    // Cargar navegación (siempre se carga, pero el contenido cambia según autenticación)
    loadNavigation();
    
    // Configurar logout si está autenticado
    if (isLoggedIn()) {
        setupLogout();
    }
});

function isLoggedIn() {
    const token = sessionStorage.getItem("token");
    return token && token !== "null" && token !== "undefined";
}

function loadNavigation() {
    const navbarContainer = document.getElementById('navbar-container');
    
    if (!navbarContainer) {
        console.error('No se encontró el contenedor del navbar');
        return;
    }

    navbarContainer.innerHTML = isLoggedIn() ? getAuthNavHTML() : getPublicNavHTML();
}

function getAuthNavHTML() {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo.png" alt="Un Día para el Futuro" height="50" class="d-inline-block align-top">
                </a>
                
                <a href="index.html" class="d-none d-lg-block ms-3">
                    <img src="img/logovolws2.png" alt="Voluntarios WS" height="50" class="d-inline-block align-top">
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="index.html">Inicio</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="campañas.html">Campañas</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="informe.html">Informe</a>
                        </li>
                        
                        <li class="nav-item mx-2">
                            <a class="nav-link logout-btn" id="logout" href="#">
                                <span class="logout-content">
                                    <i class="fas fa-sign-out-alt me-2"></i>
                                    <span class="logout-text">Cerrar sesión</span>
                                    <i class="fas fa-chevron-right ms-2 arrow-icon"></i>
                                </span>
                            </a>
                        </li>
                       
                        <li class="nav-item ms-2">
                            <a class="btn btn-primary px-3" href="#donar">Donar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function getPublicNavHTML() {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white px-3 py-2">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo.png" alt="Volkswagen México" height="50" class="d-inline-block align-top logo-hover">
                </a>

                <a href="index.html" class="d-none d-lg-block ms-3">
                    <img src="img/logovolws2.png" alt="Un Día para el Futuro" height="50" class="d-inline-block align-top">
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="index.html">Inicio</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="campañas.html">Campañas</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="informe.html">Informe</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="login.html">Login</a>
                        </li>
                        <li class="nav-item ms-2">
                            <a class="btn btn-primary btn-sm px-3" href="Registro.html">Registrarse</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function setupLogout() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('#logout')) {
            e.preventDefault();
            
            Swal.fire({
                title: '¿Cerrar sesión?',
                text: "¿Estás seguro que deseas salir de tu cuenta?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0056b3',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem("token");
                    window.location.href = "index.html";
                }
            });
        }
    });
}