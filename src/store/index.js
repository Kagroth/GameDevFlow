import Vue from "vue"
import Vuex from "vuex"
import home from "./home"
import cardComponents from "./card-components"
import devBoard from "./dev-board"
import timeTracker from "./time-tracker"

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    modules: {
        home,
        cardComponents,
        devBoard,
        timeTracker
    }
})