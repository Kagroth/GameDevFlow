<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6" class="text-left">To do</v-col>
          <v-col cols="6" class="text-right">
            <slot name="header-control"></slot>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="text-left">
        <v-row>
          <v-col cols="12" class="px-0">
            <v-tabs icons-and-text centered v-model="selectedTab">
              <v-tab
                >To Prototype
                <v-icon small>mdi-pencil-ruler</v-icon>
              </v-tab>
              <v-tab
                >To Production
                <v-icon>mdi-tools</v-icon>
              </v-tab>
              <v-tab
                >To Polish
                <v-icon>mdi-diamond-stone</v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12">
            <v-tabs-items v-model="selectedTab">
              <v-tab-item>
                <v-row
                  v-for="(card, index) in cardsWithToPrototypeComponents"
                  :key="`card-to-prototype-${index}`"
                >
                  <v-col
                    cols="12"
                    v-for="(
                      cardComponent, index
                    ) in getComponentsToPrototypeFromArray(
                      card.gameCardComponents
                    )"
                    :key="`card-component-to-prototype-${index}`"
                  >
                    <v-card outlined flat tile>
                      <v-card-title class="pa-0">
                        <v-progress-linear value="0" :color="cardComponent.gec.color"></v-progress-linear>
                      </v-card-title>
                      <v-card-title class="text-subtitle-1 pb-1">
                        <v-row>
                          <v-col cols="2">
                            <v-icon :color="cardComponent.gec.color">{{
                              cardComponent.gec.icon
                            }}</v-icon>
                          </v-col>
                          <v-col cols="10">
                            <span v-if="cardComponent.title">
                              {{ cardComponent.title }}
                            </span>
                            <span v-else>
                              {{ cardComponent.gec.name }}
                            </span>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-card-subtitle>
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-col cols="10">
                            {{ card.title }}
                          </v-col>
                        </v-row>
                      </v-card-subtitle>
                      <v-card-text>
                        Estimated time: {{ cardComponent.effort }}
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col
                    cols="12"
                    v-for="(state, index) in card.gameEntityFSM.states"
                    :key="`card-to-prototype-state${index}`"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        v-for="(
                          cardComponent, index
                        ) in getComponentsToPrototypeFromState(state)"
                        :key="`card-component-to-prototype-from-state${index}`"
                      >
                        {{ cardComponent.gec.name }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>To Production</v-tab-item>
              <v-tab-item>To Polish</v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {},

  props: {
    title: String,
    containerCount: Number,
  },

  data() {
    return {
      selectedTab: 0,
    };
  },

  methods: {
    getComponentsToPrototypeFromArray(cardComponentsArray) {
      const componentsNotStarted = cardComponentsArray.filter(
        (cardComponent) => {
          return cardComponent.cardState === "NOT_STARTED";
        }
      );

      return componentsNotStarted;
    },

    getComponentsToPrototypeFromState(state) {
      return this.getComponentsToPrototypeFromArray(state.gameCardComponents);
    },
  },

  computed: {
    cardsWithToPrototypeComponents() {
      return this.$store.getters["devBoard/cardsWithComponentsToPrototype"];
    },
  },
};
</script>