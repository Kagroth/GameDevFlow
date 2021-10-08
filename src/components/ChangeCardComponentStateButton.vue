<template>
  <div>
    <v-btn
      v-if="
        gameComponent.cardState === CARD_STATES.NOT_STARTED ||
        gameComponent.cardState === CARD_STATES.PROTOTYPE
      "
      x-small
      outlined
      tile
      color="primary"
      @click="updateState(CARD_STATES.PROTOTYPING)"
    >
      <v-icon left>mdi-play</v-icon>
      Start
    </v-btn>
    <div v-else-if="gameComponent.cardState === CARD_STATES.PROTOTYPING">
      <v-btn
        x-small
        outlined
        block
        tile
        color="yellow darken-3"
        @click="updateState(CARD_STATES.PROTOTYPE)"
      >
        <v-icon left>mdi-pause</v-icon>
        Pause
      </v-btn>
      <div class="py-1"></div>
      <v-btn
        x-small
        outlined
        block
        tile
        color="red darken-2"
        @click="updateState(CARD_STATES.TO_DO)"
      >
        <v-icon left>mdi-stop</v-icon>
        End
      </v-btn>
    </div>

    <v-btn
      v-if="gameComponent.cardState === CARD_STATES.TO_DO"
      x-small
      outlined
      tile
      color="primary"
      @click="updateState(CARD_STATES.PRODUCTION)"
    >
      <v-icon left>mdi-play</v-icon>
      Start
    </v-btn>

    <div v-else-if="gameComponent.cardState === CARD_STATES.PRODUCTION">
      <v-btn
        x-small
        outlined
        block
        tile
        color="yellow darken-3"
        @click="updateState(CARD_STATES.TO_DO)"
      >
        <v-icon left>mdi-pause</v-icon>
        Pause
      </v-btn>
      <div class="py-1"></div>
      <v-btn
        x-small
        outlined
        block
        tile
        color="red darken-2"
        @click="updateState(CARD_STATES.TO_POLISH)"
      >
        <v-icon left>mdi-stop</v-icon>
        End
      </v-btn>
    </div>

    <div v-else-if="gameComponent.cardState === CARD_STATES.TO_POLISH">
      <v-btn
        x-small
        outlined
        block
        tile
        color="primary"
        @click="updateState(CARD_STATES.POLISHING)"
      >
        <v-icon left>mdi-play</v-icon>
        Start
      </v-btn>
      <div class="py-1"></div>
      <v-btn
        x-small
        outlined
        block
        tile
        color="yellow darken-3"
        @click="updateState(CARD_STATES.POLISHED)"
      >
        <v-icon left>mdi-stop</v-icon>
        Finish
      </v-btn>
    </div>

    <div v-else-if="gameComponent.cardState === CARD_STATES.POLISHING">
      <v-btn
        x-small
        outlined
        block
        tile
        color="yellow darken-3"
        @click="updateState(CARD_STATES.TO_POLISH)"
      >
        <v-icon left>mdi-pause</v-icon>
        Pause
      </v-btn>
      <div class="py-1"></div>
      <v-btn
        x-small
        outlined
        block
        tile
        color="red darken-2"
        @click="updateState(CARD_STATES.POLISHED)"
      >
        <v-icon left>mdi-stop</v-icon>
        End
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameComponent: Object,
  },

  methods: {
    updateState(newState) {
      const payload = {
        cardComponent: this.gameComponent,
        newState: newState,
      };

      this.$store.commit("devBoard/changeCardComponentState", payload);

      if (
        newState === this.CARD_STATES.PROTOTYPING ||
        newState === this.CARD_STATES.PRODUCTION ||
        newState === this.CARD_STATES.POLISHING
      ) {
        this.$store.commit("timeTracker/startTimeTracking", payload);
        return;
      }

      if (
        newState === this.CARD_STATES.PROTOTYPE ||
        newState === this.CARD_STATES.TO_DO ||
        newState === this.CARD_STATES.TO_POLISH
      ) {
        this.$store.commit("timeTracker/stopTimeTracking");
        return;
      }
    },
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>