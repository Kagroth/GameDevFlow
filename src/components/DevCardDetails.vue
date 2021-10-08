<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col offset="1" class="text-left">
            {{ card.title }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="text-left">
        <v-row>
          <v-col offset="1">
            Total effort: {{ totalEffort }}
            <v-icon color="primary" small>mdi-timer-sand</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col offset="1" cols="10">
            <v-row>
              <v-col cols="4">Component</v-col>
              <v-col cols="2"> Estimated Effort </v-col>
              <v-col cols="3"> Worked time </v-col>
              <v-col cols="3"> Action </v-col>
            </v-row>
            <v-row
              v-for="(gameCardComponent, index) in card.gameCardComponents"
              :key="`$game-card-component-${index}`"
            >
              <v-col cols="2">
                <v-icon :color="gameCardComponent.gec.color">
                  {{ gameCardComponent.gec.icon }}
                </v-icon>
              </v-col>
              <v-col cols="3" class="text-left">
                <span v-if="gameCardComponent.title !== ''">
                  {{ gameCardComponent.title }}
                </span>
                <span v-else>
                  {{ gameCardComponent.gec.name }}
                </span>
              </v-col>
              <v-col cols="1 d-flex align-center justify-end">
                {{ gameCardComponent.effort }}
                <v-icon small color="primary">mdi-timer-sand</v-icon>
              </v-col>
              <v-col cols="3" class="d-flex align-center">
                <worked-time-indicator
                  :gameCardComponent="gameCardComponent"
                ></worked-time-indicator>
              </v-col>
              <v-col cols="3" class="text-center">
                <change-card-component-state-button :gameComponent="gameCardComponent"></change-card-component-state-button>
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
                      <v-col cols="4" class="d-flex align-center">
                        <worked-time-indicator
                          :gameCardComponent="gameCardComponent"
                        ></worked-time-indicator>
                      </v-col>
                      <v-col cols="3">
                        <change-card-component-state-button :gameComponent="gameCardComponent"></change-card-component-state-button>
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
import ChangeCardComponentStateButton from "@/components/ChangeCardComponentStateButton";
import WorkedTimeIndicator from "@/components/WorkedTimeIndicator";

export default {
  props: {
    card: Object,
    totalEffort: Number,
  },

  components: {
    "change-card-component-state-button": ChangeCardComponentStateButton,
    "worked-time-indicator": WorkedTimeIndicator,
  },

  data() {
    return {
      currentStateTab: 0,
    };
  },
};
</script>