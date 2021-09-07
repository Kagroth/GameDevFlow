import { getFromLocalStorage, saveToLocalStorage } from "@/utils"

const state = {
    projects: {}
}

const getters = {
    projects: state => {
        return state.projects
    }
}

const mutations = {
    init(state) {
        state.projects = getFromLocalStorage("projects")
    },

    addProject(state, projectName) {
        if (!Array.isArray(state.projects)) {
            state.projects = []
        }
 
        state.projects.push({
            name: projectName
        })

        saveToLocalStorage("projects", state.projects)
    },

    clearProjects(state) {
        saveToLocalStorage("projects", {})
        state.projects = getFromLocalStorage("projects")
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
