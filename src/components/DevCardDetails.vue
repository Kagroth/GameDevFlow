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
          <v-col offset="1" cols="10">
            <v-row>
              <v-col cols="7">Component</v-col>
              <v-col cols="5">
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
              <v-col cols="3" class="text-left"
                ><span v-if="gameCardComponent.title !== ''">
                  {{ gameCardComponent.title }}
                </span>
                <span v-else>
                  {{ gameCardComponent.gec.name }}
                </span>
              </v-col>
              <v-col cols="2 d-flex align-center justify-end">
                {{ gameCardComponent.effort }}
                <v-icon small color="primary">mdi-timer-sand</v-icon>
              </v-col>
              <v-col cols="5" class="d-flex align-center">
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
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-tabs vertical v-model="currentStateTab">
                  <v-tab
                    v-for="(state, index) in card.gameEntityFSM.states"
                    :key="`game-entity-state-${index}`"
                  >
                    <v-icon left small color="primary"
                      >mdi-state-machine</v-icon
                    >
                    {{ state.name }}
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-col cols="9" class="text-left">
                <v-tabs-items v-model="currentStateTab">
                  <v-tab-item
                    v-for="(state, index) in card.gameEntityFSM.states"
                    :key="`game-entity-state-${index}`"
                  >
                    <v-row
                      v-for="(
                        gameCardComponent, index
                      ) in state.gameCardComponents"
                      :key="`$state-game-card-component-${index}`"
                      class="pt-3"
                    >
                      <v-col cols="1">
                        <v-icon :color="gameCardComponent.gec.color">{{
                          gameCardComponent.gec.icon
                        }}</v-icon>
                      </v-col>
                      <v-col cols="2" class="text-left">
                        <span v-if="gameCardComponent.title !== ''">
                          {{ gameCardComponent.title }}
                        </span>
                        <span v-else>
                          {{ gameCardComponent.gec.name }}
                        </span>
                      </v-col>
                      <v-col cols="2 d-flex align-center justify-end">
                        {{ gameCardComponent.effort }}
                        <v-icon small color="primary">mdi-timer-sand</v-icon>
                      </v-col>
                      <v-col cols="7" class="d-flex align-center">
                        <v-row>
                          <v-col>
                            <v-progress-linear
                              :value="
                                gameCardComponent.cardState ===
                                  CARD_STATES.PROTOTYPE ||
                                gameCardComponent.cardState ===
                                  CARD_STATES.TO_DO
                                  ? 100
                                  : 0
                              "
                            ></v-progress-linear>
                          </v-col>
                          <v-col
                            ><v-progress-linear
                              :value="
                                gameCardComponent.cardState ===
                                  CARD_STATES.DONE ||
                                gameCardComponent.cardState ===
                                  CARD_STATES.TO_POLISH
                                  ? 100
                                  : 0
                              "
                            ></v-progress-linear
                          ></v-col>
                          <v-col
                            ><v-progress-linear
                              :value="
                                gameCardComponent.cardState ===
                                CARD_STATES.POLISHED
                                  ? 100
                                  : 0
                              "
                            ></v-progress-linear
                          ></v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    card: Object,
    totalEffort: Number,
  },

  data() {
    return {
      currentStateTab: 0,
    };
  },

  computed: {
    CARD_STATES() {
      return this.$store.getters["cardComponents/CARD_STATES"];
    },
  },
};
</script>