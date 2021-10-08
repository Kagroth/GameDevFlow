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
          <change-card-component-state-button
            :gameComponent="gameComponent"
          ></change-card-component-state-button>
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
          <worked-time-indicator
            :gameCardComponent="gameComponent"
          ></worked-time-indicator>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ChangeCardComponentStateButton from "@/components/ChangeCardComponentStateButton";
import WorkedTimeIndicator from "@/components/WorkedTimeIndicator";

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

  components: {
    "change-card-component-state-button": ChangeCardComponentStateButton,
    "worked-time-indicator": WorkedTimeIndicator,
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>