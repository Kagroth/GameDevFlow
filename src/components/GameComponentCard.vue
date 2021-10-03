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
    <v-card-subtitle class="pb-1">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10">
          {{ cardTitle }}
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-subtitle v-if="stateName" class="pt-0">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10">
          {{ stateName }}
          <v-icon x-small color="primary">mdi-state-machine</v-icon>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-subtitle v-else></v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col offset="2" cols="6">
          Estimated time: {{ gameComponent.effort }}
          <v-icon small color="primary">mdi-timer-sand</v-icon>
        </v-col>
        <v-col class="d-flex align-center">
          <v-progress-linear 
            height="100%"
            :value="workProgress(gameComponent)" 
            :color="workProgress(gameComponent) > gameComponent.effort ? 'red darken-3' : 'primary'">
            <template v-slot:default>
              <div>
                {{ convertFromMiliseconds(gameComponent.workedTime) }}
              </div>
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    cardTitle: String,
    stateName: String,
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
      
      if (newState === this.CARD_STATES.PROTOTYPING ||
          newState === this.CARD_STATES.PRODUCTION ||
          newState === this.CARD_STATES.POLISHING) {
          this.$store.commit("timeTracker/startTimeTracking", payload);
          return
      }

      if (newState === this.CARD_STATES.PROTOTYPE ||
          newState === this.CARD_STATES.TO_DO ||
          newState === this.CARD_STATES.TO_POLISH) {
          this.$store.commit("timeTracker/stopTimeTracking");
          return
      }
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
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>