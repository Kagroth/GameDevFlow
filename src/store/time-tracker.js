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

    pauseTimeTracking(state) {
        state.isTracking = false
    },

    stopTimeTracking(state) {
        state.isTracking = false

        const endTime = new Date()
        const workingTime = endTime - state.timeTrackingStartTime
        state.contextCardComponent.workingTime += workingTime
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