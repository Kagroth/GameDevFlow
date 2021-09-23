const state = {
    // current card component for time tracking 
    isTracking: false,
    contextCardComponent: {},
    timeTrackingStartTime: {}
}

const getters = {
    isTracking: state => {
        return state.isTracking
    },

    trackedCardComponent: state => {
        return state.contextCardComponent
    },
}

const mutations = {
    init() {

    },

    startTimeTracking(state, payload) {
        if (payload) {
            state.contextCardComponent = payload.cardComponent
        }

        state.timeTrackingStartTime = new Date()
        state.isTracking = true
    },

    stopTimeTracking(state) {
        state.isTracking = false
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