<template>
  <div>
    <div v-if="componentState === CARD_STATES.NOT_STARTED">
      <v-btn color="primary" block small tile>
        <v-icon small left>mdi-play</v-icon>
          Start Prototyping
        </v-btn>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-btn color="primary" v-bind="attrs" v-on="on" tile small>
              <v-icon small left>mdi-arrow-down</v-icon>
              Change state
            </v-btn>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn block text small tile> Set 'To Prototype' </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn block text small tile> Start Prototyping </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item></v-list-item>
        </v-list>
      </v-menu> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    componentState: String,
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>