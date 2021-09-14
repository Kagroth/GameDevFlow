import Vue from "vue"
import Vuex from "vuex"
import home from "./home"
import cardComponents from "./card-components"
import devBoard from "./dev-board"

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    modules: {
        home,
        cardComponents,
        devBoard
    }
})