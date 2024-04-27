<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crear Cuenta</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
</head>
<body>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-6 p-0">
      <div class="img-container">
        <div class="overlay">
          <h1 class=" mb-4">¡Bienvenido!</h1>
          <p class="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6 p-0">
      <div class="card bg-light">
        <div class="card-body d-flex align-items-center justify-content-center">
          <div class="logo-container">
            <a href="index.html"> <img src="img/logosv.png" alt="Logo" class="logo" height="200px"></a>
           
          </div>
          <form action="php/users.php" method="POST" style="width: 80%;">
    <h1 class="card-title mb-4">Crear Cuenta</h1>
    <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre">
    </div>
    <div class="form-group">
        <label for="correo">Correo Electrónico</label>
        <input type="email" class="form-control" id="correo" name="correo" placeholder="Ingresa tu correo electrónico">
    </div>
    <div class="form-group">
        <label for="contraseña">Contraseña</label>
        <input type="password" class="form-control" id="contraseña" name="contrasena" placeholder="Ingresa tu contraseña">
    </div>
    <div class="form-group">
    <label for="opcion">Selecciona tu Sucursal:</label>
  <select id="opcion" name="planta" class="form-control">
    <option value="oPlanta 1">Planta 1</option>
    <option value="Planta 2">Planta 2</option>
    <option value="Planta 3">Planta 3</option>
  </select>
  </div>
  <div class="form-group">
        <label for="contraseña">Indica tu puesto</label>
        <input type="text" class="form-control" id="puesto" name="puesto" placeholder="Ingresa tu puesto">
    </div>
    
    
    <button type="submit" class="btn btn-primary btn-block">Crear Cuenta</button>
    <div class="login-link text-center mt-4">
        <span style="background-color: #491818; padding: 0 10px;">o</span>
        <span class="px-2">Iniciar Sesión</span>
        <span style="background-color: #4d0d0d; padding: 0 10px;">o</span>
    </div>
</form>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS y dependencias jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
