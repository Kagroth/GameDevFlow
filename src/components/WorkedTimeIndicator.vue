<template>
    <v-progress-linear
      height="100%"
      :value="workProgress(gameCardComponent)"
      :color="
        workProgress(gameCardComponent) > gameCardComponent.effort
          ? 'red darken-3'
          : 'primary'
      "
    >
      <template v-slot:default>
        <div>
          {{ convertFromMiliseconds(gameCardComponent.workedTime) }}
        </div>
      </template>
    </v-progress-linear>
</template>

<script>
export default {
    props: {
        gameCardComponent: Object
    },

  methods: {
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
      const workedTimeInMiliseconds = cardComponent.workedTime;
      const estimatedEffortInHours = cardComponent.effort;
      const estimatedEffortInMiliseconds =
        estimatedEffortInHours * 60 * 60 * 1000;

      return (workedTimeInMiliseconds / estimatedEffortInMiliseconds) * 100;
    },
  },
};
</script>