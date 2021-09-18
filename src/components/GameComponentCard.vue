<template>
  <v-card outlined flat tile>
    <v-card-title class="pa-0">
      <v-progress-linear
        value="0"
        :color="gameComponent.gec.color"
      ></v-progress-linear>
    </v-card-title>
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
        <v-col cols="3" class="text-right pr-3 pt-2">
          <v-btn x-small outlined tile color="primary">
            <v-icon left>mdi-play</v-icon>
            Start
          </v-btn>
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
        gameComponent: Object
    }
};
</script>