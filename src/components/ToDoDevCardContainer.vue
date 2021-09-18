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
              <v-tab-item class="my-3">
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
                    class="py-1"
                  >
                    <game-component-card
                      :cardTitle="card.title"
                      :gameComponent="cardComponent"
                    ></game-component-card>
                  </v-col>

                  <v-col
                    cols="12"
                    v-for="(state, index) in card.gameEntityFSM.states"
                    :key="`card-to-prototype-state${index}`"
                    class="py-1"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        v-for="(
                          cardComponent, index
                        ) in getComponentsToPrototypeFromState(state)"
                        :key="`card-component-to-prototype-from-state${index}`"
                      >
                        <game-component-card
                          :cardTitle="card.title"
                          :gameComponent="cardComponent"
                        ></game-component-card>
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
import GameComponentCard from "@/components/GameComponentCard";

export default {
  components: {
    "game-component-card": GameComponentCard,
  },

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