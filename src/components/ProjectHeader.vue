<template>
  <div>
    <v-row>
      <v-col cols="1" align="left">
        <v-btn tile large @click="goToBoard('Home')">
          <v-icon left>mdi-home</v-icon>
          Back
        </v-btn>
      </v-col>
      <v-col cols="3" align="left">
        <p class="text-h4">{{ project.name }}</p>
      </v-col>
      <v-col class="text-right">
        <time-tracker></time-tracker>
      </v-col>
    </v-row>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="pa-6" @click="goToBoard('DesignBoard')" tile>
          <v-icon left color="blue">mdi-pencil-ruler</v-icon>
          Design Board
        </v-btn>
        <v-btn class="pa-6" @click="goToBoard('DevBoard')" tile>
          <v-icon left color="orange">mdi-cog</v-icon>
          Dev Board
        </v-btn>
        <v-btn class="pa-6" @click="goToBoard('StatsBoard')" tile>
          <v-icon left color="green">mdi-chart-line</v-icon>
          Stats Board
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col cols="12" align="left"></v-col>
    </v-row>
  </div>
</template>
<script>
import TimeTracker from "@/components/TimeTracker"

export default {
  props: {
    project: Object,
  },

  components: {
    "time-tracker": TimeTracker
  },

  methods: {
    goToBoard(boardName) {
      this.$router.push({ name: boardName });
    },
  },
};
</script>