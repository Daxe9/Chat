import {createStore} from "vuex";
import {MessageBackend} from "../types";

export default createStore({
    state: {
        messages: [] as MessageBackend[] | null,
    },
    mutations: {
        SET_MESSAGE_HISTORY(state, messages: MessageBackend[]) {
            state.messages = messages;
        },
    },
    actions: {
        getHistory({commit}, payload) {
            commit("SET_MESSAGE_HISTORY", payload);
        }
    }
})