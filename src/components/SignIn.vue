<template>
    <!-- Contenedor principal para el formulario de inicio de sesión -->
    <div class="signin-container">
        <!-- Caja central que contiene el formulario -->
        <div class="signin-box">
            <!-- Título del formulario -->
            <h1 class="title">Sign In to an Account</h1>
            <!-- Grupo de formulario para el campo de email -->
            <div class="form-group">
                <!-- Campo de entrada para el email con retroalimentación visual en caso de error -->
                <input
                    type="text"
                    placeholder="Email"
                    v-model="email"
                    :class="{'error': errMsg}" 
                    class="input-field"
                />
            </div>
            <!-- Grupo de formulario para el campo de contraseña -->
            <div class="form-group">
                <!-- Campo de entrada para la contraseña con retroalimentación visual en caso de error -->
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    :class="{'error': errMsg}" 
                    class="input-field"
                />
            </div>
            <!-- Contenedor para mostrar el mensaje de error -->
            <div>
                <!-- Mensaje de error mostrado solo si existe un error -->
                <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
            </div>
            <!-- Grupo de botones para acciones -->
            <div class="button-group">
                <!-- Botón para iniciar sesión -->
                <button
                    @click="register"
                    :disabled="loading"
                    class="submit-btn"
                >
                    <!-- Texto dinámico que muestra el estado de carga -->
                    {{ loading ? 'Signing In...' : 'Sign In' }}
                </button>
                <!-- Botón para iniciar sesión con Google -->
                <button
                    @click="signInWithGoogle"
                    :disabled="loading"
                    class="google-btn"
                >
                    Sign In With Google
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"; // Importa la función ref para manejar estados reactivos
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Importa Firebase Auth
import { useRouter } from "vue-router"; // Importa el enrutador de Vue para redirección

// Estado reactivo para almacenar el email ingresado
const email = ref("");
// Estado reactivo para almacenar la contraseña ingresada
const password = ref("");
// Estado reactivo para almacenar el mensaje de error
const errMsg = ref(); 
// Estado reactivo para indicar si está en proceso de carga
const loading = ref(false); 
// Instancia del enrutador para redirección
const router = useRouter();

// Función para manejar el inicio de sesión
const register = () => {
    const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
    loading.value = true; // Activa el estado de carga
    // Intenta iniciar sesión con email y contraseña
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            console.log("Successfully signed in!"); // Log de éxito
            router.push("/Feed"); // Redirige al usuario a la página "Feed"
        })
        .catch((error) => {
            console.log(error.code); // Log del código de error
            // Manejo de diferentes tipos de errores
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email"; // Email inválido
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found"; // Usuario no encontrado
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password"; // Contraseña incorrecta
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"; // Error genérico
                    break;
            }
        })
        .finally(() => {
            loading.value = false; // Desactiva el estado de carga
        });
};
</script>
<style scoped>
/* Contenedor principal del formulario */
.signin-container {
    display: flex; /* Flexbox para centrar elementos */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    min-height: 100vh; /* Altura mínima para ocupar toda la pantalla */
    padding: 20px; /* Espaciado interno */
}

/* Caja que contiene el formulario */
.signin-box {
    background-color: white; /* Fondo blanco */
    padding: 2rem; /* Espaciado interno */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
    width: 100%; /* Ancho completo */
    max-width: 400px; /* Ancho máximo */
}

/* Título del formulario */
.title {
    color: #333; /* Color del texto */
    font-size: 1.8rem; /* Tamaño de fuente */
    font-weight: 600; /* Peso de la fuente */
    margin-bottom: 1.5rem; /* Margen inferior */
    text-align: center; /* Centrar texto */
}

/* Estilo del grupo de formulario */
.form-group {
    margin-bottom: 1rem; /* Margen inferior entre grupos */
}

/* Estilo de los campos de entrada */
.input-field {
    width: 100%; /* Ancho completo */
    padding: 0.75rem; /* Espaciado interno */
    border: 1px solid #ddd; /* Borde gris claro */
    border-radius: 4px; /* Bordes redondeados */
    font-size: 1rem; /* Tamaño de fuente */
    transition: border-color 0.3s ease; /* Transición suave al cambiar el borde */
}

/* Campo enfocado */
.input-field:focus {
    outline: none; /* Quita el contorno predeterminado */
    border-color: #4a90e2; /* Cambia el color del borde */
}

/* Campo de entrada con error */
.input-field.error {
    border-color: red; /* Borde rojo para error */
}

/* Mensaje de error */
.error-message {
    color: red; /* Texto rojo */
    font-size: 0.9rem; /* Tamaño de fuente más pequeño */
    margin-top: 0.5rem; /* Margen superior */
    text-align: center; /* Centrar texto */
}

/* Grupo de botones */
.button-group {
    display: flex; /* Flexbox para diseño en columna */
    flex-direction: column; /* Dirección vertical */
    gap: 1rem; /* Espaciado entre botones */
    margin-top: 1.5rem; /* Margen superior */
}

/* Estilo general de botones */
.submit-btn,
.google-btn {
    width: 100%; /* Ancho completo */
    padding: 0.75rem; /* Espaciado interno */
    border: none; /* Sin borde */
    border-radius: 4px; /* Bordes redondeados */
    font-size: 1rem; /* Tamaño de fuente */
    cursor: pointer; /* Cursor en forma de mano */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Transición suave */
}

/* Botón principal */
.submit-btn {
    background: linear-gradient(to right, #FF4300, #FF6400); /* Gradiente */
    color: white; /* Texto blanco */
}

/* Efecto hover para el botón principal */
.submit-btn:hover:not(:disabled) {
    background-color: #ff5722; /* Cambia el color de fondo */
}

/* Botón deshabilitado */
.submit-btn:disabled {
    background-color: #ddd; /* Fondo gris */
    cursor: not-allowed; /* Cursor de prohibido */
}

/* Botón de Google */
.google-btn {
    background-color: #fff; /* Fondo blanco */
    color: #757575; /* Texto gris */
    border: 1px solid #ddd; /* Borde gris */
}
</style>
