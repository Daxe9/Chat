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
    },
    actions: {
        login({commit}, username: string) {
            commit("SET_USERNAME", username);
        },
    }
});
