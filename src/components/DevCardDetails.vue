<template>
  <div>
    <v-card>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text class="text-left">
        Total effort: {{ totalEffort }}
        <v-icon color="primary" small>mdi-timer-sand</v-icon>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-row>
              <v-col cols="6">Component</v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">Progress</v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col
                        ><v-icon color="primary"
                          >mdi-pencil-ruler</v-icon
                        ></v-col
                      >
                      <v-col><v-icon color="primary">mdi-tools</v-icon></v-col>
                      <v-col
                        ><v-icon color="primary"
                          >mdi-diamond-stone</v-icon
                        ></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-for="(gameCardComponent, index) in card.gameCardComponents"
              :key="`$game-card-component-${index}`"
            >
              <v-col cols="2"
                ><v-icon :color="gameCardComponent.gec.color">{{
                  gameCardComponent.gec.icon
                }}</v-icon>
              </v-col>
              <v-col cols="4" class="text-left"
                ><span v-if="gameCardComponent.title !== ''">
                  {{ gameCardComponent.title }}
                </span>
                <span v-else>
                  {{ gameCardComponent.gec.name }}
                </span>
              </v-col>
              <v-col cols="6" class="d-flex align-center">
                <v-row>
                  <v-col>
                    <v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.PROTOTYPE ||
                        gameCardComponent.cardState === CARD_STATES.TO_DO
                          ? 100
                          : 0
                      "
                    ></v-progress-linear>
                  </v-col>
                  <v-col
                    ><v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.DONE ||
                        gameCardComponent.cardState === CARD_STATES.TO_POLISH
                          ? 100
                          : 0
                      "
                    ></v-progress-linear
                  ></v-col>
                  <v-col
                    ><v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.POLISHED
                          ? 100
                          : 0
                      "
                    ></v-progress-linear
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
            <div
              v-for="(state, index) in card.gameEntityFSM.states"
              :key="`game-entity-state-${index}`"
            >
              <v-row>
                <v-col cols="2" class="d-flex justify-center">
                  <v-icon color="primary"> mdi-state-machine </v-icon>
                </v-col>
                <v-col cols="10" class="text-left">
                  <v-expansion-panels tile flat>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="px-1">
                        {{ state.name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row
                          v-for="(
                            gameCardComponent, index
                          ) in state.gameCardComponents"
                          :key="`$state-game-card-component-${index}`"
                        >
                          <v-col cols="2"
                            ><v-icon :color="gameCardComponent.gec.color">{{
                              gameCardComponent.gec.icon
                            }}</v-icon>
                          </v-col>
                          <v-col cols="4" class="text-left"
                            ><span v-if="gameCardComponent.title !== ''">
                              {{ gameCardComponent.title }}
                            </span>
                            <span v-else>
                              {{ gameCardComponent.gec.name }}
                            </span>
                          </v-col>
                         <v-col>
                    <v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.PROTOTYPE ||
                        gameCardComponent.cardState === CARD_STATES.TO_DO
                          ? 100
                          : 0
                      "
                    ></v-progress-linear>
                  </v-col>
                  <v-col
                    ><v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.DONE ||
                        gameCardComponent.cardState === CARD_STATES.TO_POLISH
                          ? 100
                          : 0
                      "
                    ></v-progress-linear
                  ></v-col>
                  <v-col
                    ><v-progress-linear
                      :value="
                        gameCardComponent.cardState === CARD_STATES.POLISHED
                          ? 100
                          : 0
                      "
                    ></v-progress-linear
                  ></v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
// import ChangeComponentStateMenu from "@/components/ChangeComponentStateMenu";

export default {
  props: {
    card: Object,
    totalEffort: Number,
  },

  components: {
    // "change-component-state-menu": ChangeComponentStateMenu,
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>