<template>
  <div>
    <v-card>
      <v-card-title class="pb-2">
        <v-row>
          <v-col cols="3" class="text-left pb-1">To do</v-col>
          <v-col cols="9" class="px-0 pb-1"> </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle class="mt-1 px-0">
        <v-btn
          class="mx-1 mt-2"
          v-for="(builtInComponent, index) in builtInGameComponents"
          :key="`built-in-components-${index}`"
          :color="builtInComponent.color"
          tile
          small
          :plain="!filters[index].active"
          :outlined="!filters[index].active"
          @click="onFilterButtonClick(index)"
        >
          <v-icon small>{{ builtInComponent.icon }}</v-icon>
        </v-btn>
      </v-card-subtitle>
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
          <v-col cols="12" class="px-1">
            <v-tabs-items v-model="selectedTab">
              <!-- To Prototype Tab -->
              <v-tab-item class="my-3">
                <v-virtual-scroll
                  :bench="2"
                  :items="filteredCardComponents"
                  :height="160 * 5"
                  :item-height="160"
                  :width="800"
                >
                  <template v-slot:default="{ item }">
                    <div class="pa-1">
                      <game-component-card
                        :cardTitle="item.title"
                        :stateName="item.stateName"
                        :gameComponent="item.gameCardComponent"
                        controls
                      ></game-component-card>
                    </div>
                  </template>
                </v-virtual-scroll>
              </v-tab-item>

              <!-- To Production Tab -->
              <v-tab-item class="my-3">
                <v-virtual-scroll
                  :bench="2"
                  :items="filteredCardComponentsToDo"
                  :height="160 * 5"
                  :item-height="160"
                  :width="800"
                >
                  <template v-slot:default="{ item }">
                    <div class="pa-1">
                      <game-component-card
                        :cardTitle="item.title"
                        :stateName="item.stateName"
                        :gameComponent="item.gameCardComponent"
                        controls
                      ></game-component-card>
                    </div>
                  </template>
                </v-virtual-scroll>
              </v-tab-item>

              <!-- To Polish Tab -->
              <v-tab-item class="my-3">
                <v-virtual-scroll
                  :bench="2"
                  :items="filteredCardComponentsToPolish"
                  :height="160 * 5"
                  :item-height="160"
                  :width="800"
                >
                  <template v-slot:default="{ item }">
                    <div class="pa-1">
                      <game-component-card
                        :cardTitle="item.title"
                        :stateName="item.stateName"
                        :gameComponent="item.gameCardComponent"
                        controls
                      ></game-component-card>
                    </div>
                  </template>
                </v-virtual-scroll>
              </v-tab-item>
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
      filters: [],
    };
  },

  created() {
    if (this.builtInGameComponents) {
      this.filters = this.builtInGameComponents.map((bigc) => {
        return {
          builtInComponent: bigc,
          active: false,
        };
      });
    }
  },

  methods: {
    onFilterButtonClick(index) {
      if (this.filters.length === 0) {
        this.filters = this.builtInGameComponents.map((bigc) => {
          return {
            builtInComponent: bigc,
            active: false,
          };
        });
      }

      this.filters[index].active = !this.filters[index].active;

      this.$forceUpdate();
    },

    applyFilters(cardComponentsArray) {
      if (this.filters.length === 0) {
        return cardComponentsArray;
      }

      const isAnyFilterActive = this.filters.some((filter) => {
        return filter.active;
      });

      if (!isAnyFilterActive) {
        return cardComponentsArray;
      }

      const activeFilters = this.filters
        .filter((componentFilter) => {
          return componentFilter.active;
        })
        .map((componentFilter) => {
          return componentFilter.builtInComponent.name;
        });

      return cardComponentsArray.filter((cardComponent) => {
        if (activeFilters.includes(cardComponent.gameCardComponent.gec.name)) {
          return true;
        }

        return false;
      });
    },
  },

  computed: {
    cardComponentsWithCardTitleToPrototype() {
      const toPrototype =
        this.$store.getters["devBoard/cardComponentsWithCardTitleAndState"](
          "NOT_STARTED"
        );

      const prototype =
        this.$store.getters["devBoard/cardComponentsWithCardTitleAndState"](
          "PROTOTYPE"
        );

      return toPrototype.concat(prototype);
    },

    cardComponentsWithCardTitleToDo() {
      return this.$store.getters[
        "devBoard/cardComponentsWithCardTitleAndState"
      ]("TO_DO");
    },

    cardComponentsWithCardTitleToPolish() {
      return this.$store.getters[
        "devBoard/cardComponentsWithCardTitleAndState"
      ]("TO_POLISH");
    },

    builtInGameComponents() {
      return this.$store.getters["cardComponents/components"];
    },

    // To Prototype cards filtered
    filteredCardComponents() {
      return this.applyFilters(this.cardComponentsWithCardTitleToPrototype);
    },

    // To Production cards filtered
    filteredCardComponentsToDo() {
      return this.applyFilters(this.cardComponentsWithCardTitleToDo);
    },

    // To Production cards filtered
    filteredCardComponentsToPolish() {
      return this.applyFilters(this.cardComponentsWithCardTitleToPolish);
    },
  },
};
</script>
<style>
.v-virtual-scroll {
  overflow-x: hidden;
}

.v-virtual-scroll::-webkit-scrollbar {
  width: 0.1rem;
}

.v-virtual-scroll::-webkit-scrollbar-track {
  background-color: #0D47A1;
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #2979FF;
}
</style>