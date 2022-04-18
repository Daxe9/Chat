import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized
} from "vue-router";
import Home from "../views/Home.vue";
import ContactChat from "../views/ContactChat.vue";
import { ContactType } from "../types";
import { API } from "../services/SocketManager";

// every routes
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
    },
    {
        path: "/chat/:id",
        name: "ContactChat",
        props: true,
        component: ContactChat,
        beforeEnter: (to: RouteLocationNormalized) => {
            const id = to.params.id;
            const contact: ContactType | undefined = API.userList.find(
                (user) => {
                    return user.userID === id;
                }
            );
            if (!contact) {
                return false;
            }
            API.currentContact = contact;
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        const hasUsername = !!localStorage.getItem("username");
        if (to.name !== "Login" && !hasUsername) {
            next({ name: "Login" });
        } else {
            next();
        }
    }
);

export default router;
