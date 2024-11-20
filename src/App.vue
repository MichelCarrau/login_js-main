<template>
  <div class="main-container">
    <!-- Barra de navegacion -->
    <nav class="navigation">
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          Home
        </router-link>
        <router-link to="/Feed" class="nav-link" active-class="active">
          Feed
        </router-link>
        <router-link to="/Register" class="nav-link" active-class="active">
          Register
        </router-link>
        <router-link to="/SignIn" class="nav-link" active-class="active">
          Sign In
        </router-link>
        <button @click="handleSignOut" v-if="isLoggedIn"> Sign out</button>
      </div>
    </nav>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>About Us</h3>
          <p>Your platform for connecting and sharing with the community.</p>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/feed">Feed</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/sign-in">Login</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@yoursite.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: Your Location</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"; // Corregí la importación
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #272829;
}

#app {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e4e5e6;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navigation {
  background-color: #983E00;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #B1D690;
  background-color: rgba(52, 152, 219, 0.1);
}

.nav-link.active {
  color: #B1D690;
  background-color: rgba(52, 152, 219, 0.1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #B1D690;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.content {
  margin-top: 80px;
  padding: 2rem;
  flex-grow: 1;
}

/* Footer Styles */
.footer {
  background-color: #983E00;
  color: #ffffff;
  padding-top: 3rem;
  margin-top: auto;
}

.footer h3 {
    color: #fff; /* Establece el color del texto del encabezado h5 en blanco. */
    font-weight: 600; /* Establece el peso de la fuente a semi-negrita. */
    margin-bottom: 20px; /* Define un margen inferior de 20px. */
    position: relative; /* Posiciona el encabezado de manera relativa para el uso de pseudo-elementos. */
    display: inline-block; /* Permite que el encabezado se comporte como un elemento en línea con características de bloque. */
}

.footer h3::after {
    content: ''; /* Crea un pseudo-elemento después del encabezado h5. */
    position: absolute; /* Posiciona el pseudo-elemento de forma absoluta. */
    left: 0; /* Lo alinea a la izquierda del elemento padre. */
    bottom: -5px; /* Lo posiciona 5px debajo del encabezado. */
    width: 50px; /* Establece un ancho inicial de 50px para el pseudo-elemento. */
    height: 2px; /* Establece una altura de 2px para el subrayado. */
    background-color: #B1D690; /* Establece el color de fondo utilizando la variable de color hover. */
    transition: width 0.3s ease; /* Transición suave para el cambio de ancho. */
}

.footer h3:hover::after {
    width: 100%; /* Cambia el ancho del pseudo-elemento al 100% al pasar el mouse. */
}


.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.footer-section {
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #B1D690;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #B1D690;
}

.footer-bottom {
  background: linear-gradient(to right, #FF4300, #FF6400);
  padding: 1rem;
  text-align: center;
  margin-top: 2rem;
}

.footer-bottom p {
  font-size: 0.9rem;
  color: #FFF;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .navigation {
    padding: 0.5rem;
  }

  .content {
    margin-top: 120px;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-section {
    text-align: center;
  }
}
</style>
