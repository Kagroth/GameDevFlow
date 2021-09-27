const state = {
    // current card component for time tracking
    isTrackerActive: false,
    isTracking: false,
    contextCardComponent: {},
    timeTrackingStartTime: {},
    contextElapsedTime: 0,
    previousTime: null
}

const getters = {
    isTrackerActive: state => {
        return state.isTrackerActive
    },

    isTracking: state => {
        return state.isTracking
    },

    trackedCardComponent: state => {
        return state.contextCardComponent
    },

    timeTrackingStartTime: state => {
        return state.timeTrackingStartTime
    },

    elapsedTime: state => {
        return state.contextElapsedTime
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
        state.isTrackerActive = true
        state.previousTime = null
    },

    pauseTimeTracking(state) {
        state.isTracking = false
        state.previousTime = null
    },

    stopTimeTracking(state) {
        state.isTrackerActive = false
        state.isTracking = false
        state.previousTime = null
        state.contextElapsedTime = 0
        state.contextCardComponent = {}
    },

    updateTimeTracker(state) {
        const prevTime = performance.now()
        let elapsedTime = null
  
        if (state.previousTime) {
            elapsedTime = prevTime - state.previousTime
        }
        else {
            elapsedTime = prevTime - state.timeTrackingStartTime;
        }
  
        state.previousTime = prevTime
        state.contextElapsedTime += elapsedTime
        state.contextCardComponent.workedTime += elapsedTime
    },
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