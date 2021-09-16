<template>
  <div>
    <v-card>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text class="text-left">
        Total effort: {{ totalEffort }}
        <v-icon color="primary" small>mdi-timer-sand</v-icon>
      </v-card-text>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="8">
            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="(gameCardComponent, index) in card.gameCardComponents"
                :key="`$game-card-component-${index}`"
              >
                <v-list-item-avatar>
                  <v-icon :color="gameCardComponent.gec.color">{{
                    gameCardComponent.gec.icon
                  }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    <span v-if="gameCardComponent.title !== ''">
                      {{ gameCardComponent.title }}
                    </span>
                    <span v-else>
                      {{ gameCardComponent.gec.name }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <change-component-state-menu :componentState="gameCardComponent.cardState"></change-component-state-menu>
                </v-list-item-action>
              </v-list-item>
              <v-divider class="my-2"></v-divider>
              <v-list-group
                v-for="(state, index) in card.gameEntityFSM.states"
                :key="`game-entity-state-${index}`"
                prepend-icon="mdi-state-machine"
                class="ml-2"
              >
                <template v-slot:activator>
                  <v-list-item-content class="text-left">
                    <v-list-item-title>{{ state.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(gameCardComponent, index) in state.gameCardComponents"
                  :key="`$state-game-card-component-${index}`"
                  class="pl-12"
                >
                  <v-list-item-avatar>
                    <v-icon :color="gameCardComponent.gec.color">{{
                      gameCardComponent.gec.icon
                    }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-left">
                      <span v-if="gameCardComponent.title !== ''">
                        {{ gameCardComponent.title }}
                      </span>
                      <span v-else>
                        {{ gameCardComponent.gec.name }}
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <change-component-state-menu :componentState="gameCardComponent.cardState"></change-component-state-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import ChangeComponentStateMenu from "@/components/ChangeComponentStateMenu";

export default {
  props: {
    card: Object,
    totalEffort: Number,
  },

  components: {
    "change-component-state-menu": ChangeComponentStateMenu,
  },
};
</script>