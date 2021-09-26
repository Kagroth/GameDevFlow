<template>
  <div class="grey darken-1">
    <v-row>
      <v-col cols="3" class="text-left">
          <v-icon></v-icon>
          Tracker
        </v-col>
      <v-col cols="3">
        <v-btn v-if="isTracking" tile>
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn v-else tile>
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <div v-if="isTracking">
          {{ trackedCardComponent.title || trackedCardComponent.gec.name }}
          {{ convertFromMiliseconds(elapsedTime) }}
        </div>
        <div v-else>
            No tracking
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      intervalHandler: null,
      elapsedTime: null,
    };
  },

  methods: {
    toggleTracking() {
      if (!this.isTracking) this.$store.commit("timeTracker/startTimeTracking");
      else this.$store.commit("timeTracker/pauseTimeTracking");
    },

    timeTrack() {
      this.intervalHandler = setInterval(this.trackingBehaviour, 1000);
    },

    trackingBehaviour() {
      this.elapsedTime = performance.now() - this.trackingStartTime;
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
  },

  computed: {
    isTracking() {
      const isTracking = this.$store.getters["timeTracker/isTracking"];

      if (isTracking) {
        this.timeTrack();
      } else {
        window.clearInterval(this.intervalHandler);
      }

      return isTracking;
    },

    trackedCardComponent() {
      return this.$store.getters["timeTracker/trackedCardComponent"];
    },

    trackingStartTime() {
      return this.$store.getters["timeTracker/timeTrackingStartTime"];
    },
  },
};
</script>