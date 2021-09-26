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

    timeTrackingStartTime: state => {
        return state.timeTrackingStartTime
    }
}

const mutations = {
    init() {

    },

    startTimeTracking(state, payload) {
        if (payload) {
            state.contextCardComponent = payload.cardComponent
        }

        state.timeTrackingStartTime = performance.now()
        state.isTracking = true
    },

    pauseTimeTracking(state) {
        state.isTracking = false
    },

    stopTimeTracking(state) {
        state.isTracking = false

        const endTime = performance.now()
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