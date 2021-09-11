<template>
  <div>
    <v-row>
      <v-col cols="3">
        <p class="text-h4">Project name</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <v-btn-toggle tile>
          <v-btn class="pa-6" @click="goToBoard('DesignBoard')">
            <v-icon left color="blue">mdi-pencil-ruler</v-icon>
            Design Board
          </v-btn>
          <v-btn class="pa-6">
            <v-icon left color="orange">mdi-cog</v-icon>
            Dev Board
          </v-btn>
          <v-btn class="pa-6">
            <v-icon left color="green">mdi-chart-line</v-icon>
            Stats Board
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
    methods: {
        goToBoard(boardName) {
            this.$router.push({name: boardName})
        }
    }
};
</script>