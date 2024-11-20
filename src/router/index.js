// Importa los módulos necesarios de Firebase Authentication y Vue Router.
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

// Crea una instancia del enrutador de Vue con un historial basado en la API del navegador.
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../components/Home.vue") },
        { path: "/Register", component: () => import("../components/Register.vue") },
        { path: "/SignIn", component: () => import("../components/SignIn.vue") },
        {
            path: "/Feed",
            component: () => import("../components/Feed.vue"),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

// Función que obtiene al usuario autenticado actual.
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            (error) => {
                removeListener();
                reject(error);
            }
        );
    });
};

// Middleware global que se ejecuta antes de cada cambio de ruta.
router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        try {
            const user = await getCurrentUser();
            if (user) {
                next();
            } else {
                alert("You don't have access!");
                next("/SignIn");
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            next("/SignIn");
        }
    } else {
        next();
    }
});

export default router;
