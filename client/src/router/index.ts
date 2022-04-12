import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const hasUsername = !!localStorage.getItem("username");
    if (to.name !== "Login" && !hasUsername) {
        next({name: "Login"});
    } else {
        next();
    }
});

export default router;
