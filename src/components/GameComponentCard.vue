<template>
  <v-card outlined flat tile>
    <v-card-title class="pa-0">
      <v-progress-linear
        value="0"
        :color="gameComponent.gec.color"
      ></v-progress-linear>
    </v-card-title>
    <v-card-title v-if="showState" class="text-subtitle-2">
      <v-row>
        <v-col cols="2">
          <v-icon
            v-if="gameComponent.cardState === CARD_STATES.PROTOTYPING"
            color="primary"
            >mdi-pencil-ruler</v-icon
          >
          <v-icon
            v-else-if="gameComponent.cardState === CARD_STATES.PRODUCTION"
            color="primary"
            >mdi-tools</v-icon
          >
          <v-icon
            v-else-if="gameComponent.cardState === CARD_STATES.POLISHING"
            color="primary"
            >mdi-diamond-stone</v-icon
          >
        </v-col>
        <v-col cols="10">
          {{ gameComponent.cardState }}
        </v-col>
      </v-row>
    </v-card-title>
    
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    <v-card-title class="text-subtitle-1 pb-1">
      <v-row>
        <v-col cols="2">
          <v-icon :color="gameComponent.gec.color">{{
            gameComponent.gec.icon
          }}</v-icon>
        </v-col>
        <v-col cols="7">
          <span v-if="gameComponent.title">
            {{ gameComponent.title }}
          </span>
          <span v-else>
            {{ gameComponent.gec.name }}
          </span>
        </v-col>
        <v-col cols="3" v-if="controls" class="text-right pr-3 pt-2">
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
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10">
          {{ cardTitle }}
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col>
          Estimated time: {{ gameComponent.effort }}
          <v-icon small color="primary">mdi-timer-sand</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    cardTitle: String,
    gameComponent: Object,
    controls: {
      type: Boolean,
      default: false,
    },
    showState: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateState(newState) {
      const payload = {
        cardComponent: this.gameComponent,
        newState: newState,
      }

      this.$store.commit("devBoard/changeCardComponentState", payload);
      this.$store.commit("timeTracker/startTimeTracking", payload);
      
      if (newState === this.CARD_STATES.PROTOTYPING ||
          newState === this.CARD_STATES.PRODUCTION ||
          newState === this.CARD_STATES.POLISHING) {
          this.$store.commit("timeTracker/startTimeTracking", payload);
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