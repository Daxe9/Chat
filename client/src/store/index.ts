import {createStore} from "vuex";

export default createStore({
    state: {
        username: "",
    },
    mutations: {
        SET_USERNAME(state, username: string) {
            state.username = username;
            localStorage.setItem("username", username);
        },
        UNSET_USERNAME(state) {
            state.username = "";
            localStorage.removeItem("username");
        },
    },
    actions: {
        login({commit}, username: string) {
            commit("SET_USERNAME", username);
        },
        logout({commit}, username: string) {
            commit("UNSET_USERNAME", username);
        }
    }
});
