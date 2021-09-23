<template>
    <div>
        Tracker
        {{ isTracking }}
        <v-btn @click="toggleTracking">Toggle tracker</v-btn>
    </div>
</template>
<script>
export default {
    methods: {
        toggleTracking() {
            if (!this.isTracking) this.$store.commit("timeTracker/startTimeTracking")
            else this.$store.commit("timeTracker/stopTimeTracking")
        }
    },

    computed: {
        isTracking() {
            return this.$store.getters["timeTracker/isTracking"]
        },

        trackedCardComponent() {
            return this.$store.getters["timeTracker/trackedCardComponent"]
        },
    }
}
</script>