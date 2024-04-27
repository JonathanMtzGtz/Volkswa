<?php
// Datos de conexión a la base de datos
$servername = "sql10.freemysqlhosting.net";
$username = "sql10702396";
$password = "rzNmv4avbu";
$database = "sql10702396";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

$nombre = $_POST['nombre'];
$email = $_POST['correo'];
$password = $_POST['contrasena'];
$planta = $_POST['planta'];
$telefono = $_POST['telefono'];
$fecha = $_POST['fecha_registro'];
$puesto = $_POST['puesto'];
$rol = $_POST['rol'];
// Encriptar la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insertar datos en la base de datos
$sql = "INSERT INTO usuarios (nombre, correo, contraseña, planta, telefono,fecha-registro,puesto,rol) VALUES ('$nombre', '$email', '$hashed_password','$planta','$telefono','$fecha','$puesto','$rol')";


$iniciar= mysqli_query($sql);
if ($conn->query($sql) === TRUE) {
  echo "Usuario registrado correctamente";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

?>