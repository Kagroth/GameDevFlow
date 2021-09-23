<template>
  <v-row>
    <v-col>
      <v-progress-linear
        :value="
          cardComponentState === CARD_STATES.PROTOTYPE ||
          cardComponentState === CARD_STATES.TO_DO || 
          cardComponentState === CARD_STATES.DONE ||
          cardComponentState === CARD_STATES.PRODUCTION ||
          cardComponentState === CARD_STATES.TO_POLISH
            ? 100
            : 0
        "
      ></v-progress-linear>
    </v-col>
    <v-col
      ><v-progress-linear
        :value="
          cardComponentState === CARD_STATES.DONE ||
          cardComponentState === CARD_STATES.TO_POLISH ||
          cardComponentState === CARD_STATES.POLISHED
            ? 100
            : 0
        "
      ></v-progress-linear
    ></v-col>
    <v-col
      ><v-progress-linear
        :value="cardComponentState === CARD_STATES.POLISHED ? 100 : 0"
      ></v-progress-linear
    ></v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    cardComponentState: String,
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>