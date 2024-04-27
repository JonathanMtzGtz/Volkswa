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
$contrasena = $_POST['contrasena'];
$planta=$_POST['planta'];
$puesto=$_POST['puesto'];



// Encriptar la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insertar datos en la base de datos
$sqli = "INSERT INTO usuarios (nombre, correo, contrasena,planta ,puesto) VALUES ('$nombre', '$email', '$contrasena','$planta','$puesto')";



if ($conn->query($sqli) === TRUE) {
  echo "Usuario registrado correctamente";
} else {
  echo "Error: " . $sqli . "<br>" . $conn->error;
}
echo "<script>window.location.href = '../index.html';</script>";
?>