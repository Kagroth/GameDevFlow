<template>
  <v-row class="text-body-2 primary--text grey darken-4">
    <v-col cols="2" class="text-left text-body-1 d-flex align-center">
      <v-icon color="primary" left>mdi-timer</v-icon>
      Tracker
    </v-col>
    <v-col cols="7">
      <div
        v-if="
          trackedCardComponent && Object.keys(trackedCardComponent).length !== 0
        "
      >
        <v-row>
          <v-col cols="3" class="d-flex align-center">
            <v-icon left :color="trackedCardComponent.gec.color">{{ trackedCardComponent.gec.icon }}</v-icon>
            {{
              trackedCardComponent.title || trackedCardComponent.gec.name || ""
            }}
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <v-row>
              <v-col cols="12" class="text-left">
                Estimation: 
                {{ trackedCardComponent.effort }}h
              </v-col>
              <v-col cols="12">
                <v-progress-linear 
                  :value="workProgress(trackedCardComponent)" 
                  :color="workProgress(trackedCardComponent) > trackedCardComponent.effort ? 'red darken-3' : 'primary'">
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-row>
              <v-col cols="6">Current time: </v-col>
              <v-col cols="6">
                {{ convertFromMiliseconds(elapsedTime) }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Total time: </v-col>
              <v-col cols="6">
                {{ convertFromMiliseconds(trackedCardComponent.workedTime) }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div v-else>No tracking</div>
    </v-col>
    <v-col offset="2" cols="1" class="text-right pa-0">
      <v-btn
        v-if="isTracking"
        :disabled="trackedCardComponent === null"
        tile
        block
        color="blue darken-3"
        height="100%"
        @click="pauseTimeTracking"
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        v-else
        tile
        block
        color="blue darken-3"
        height="100%"
        :disabled="trackedCardComponent === null"
        @click="resumeTimeTracking"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      intervalHandler: null,
      previousTime: null,
    };
  },

  methods: {
    toggleTracking() {
      if (!this.isTracking) {
        this.resumeTimeTracking();
      }
      else {
        this.pauseTimeTracking();
      }
    },

    timeTrack() {
      this.intervalHandler = setInterval(this.trackingBehaviour, 1000);
    },

    pauseTimeTracking() {
      clearInterval(this.intervalHandler);
      this.$store.commit("timeTracker/pauseTimeTracking");
    },

    resumeTimeTracking() {
      this.$store.commit("timeTracker/startTimeTracking");
    },

    trackingBehaviour() {
      this.$store.commit("timeTracker/updateTimeTracker");
    },

    convertFromMiliseconds(ms) {
      let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((ms / (1000 * 60)) % 60);
      let seconds = Math.floor((ms / 1000) % 60);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return `${hours}:${minutes}:${seconds}`;
    },

    workProgress(cardComponent) {
      const workedTimeInMiliseconds = cardComponent.workedTime
      const estimatedEffortInHours = cardComponent.effort
      const estimatedEffortInMiliseconds = estimatedEffortInHours * 60 * 60 * 1000

      return workedTimeInMiliseconds / estimatedEffortInMiliseconds * 100
    }
  },

  computed: {
    isTrackerActive() {
      return this.$store.getters["timeTracker/isTrackerActive"];
    },

    isTracking() {
      const isTracking = this.$store.getters["timeTracker/isTracking"];

      if (isTracking) {
        this.timeTrack();
      } /* else {
        this.pauseTimeTracking();
      } */

      return isTracking;
    },

    trackedCardComponent() {
      return this.$store.getters["timeTracker/trackedCardComponent"];
    },

    trackingStartTime() {
      return this.$store.getters["timeTracker/timeTrackingStartTime"];
    },

    elapsedTime() {
      return this.$store.getters["timeTracker/elapsedTime"];
    },
  },
};
</script>