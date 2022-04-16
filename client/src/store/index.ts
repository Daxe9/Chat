import {createStore} from "vuex";
import {ContactType} from "../types";

export default createStore({
    state: {
        username: "",
        contacts: [] as ContactType[],
        currentContact: {} as ContactType
    },
    mutations: {
        SET_USERNAME(state, username: string) {
            state.username = username;
            localStorage.setItem("username", username);
        },
        UNSET_USERNAME(state) {
            state.username = "";
            localStorage.removeItem("username");
        }
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
