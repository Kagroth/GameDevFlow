<template>
  <div>
    <v-card>
      <v-card-title> New card creator </v-card-title>
      <v-card-text class="text-left">
        <v-text-field
          outlined
          label="Card name"
          v-model="newCard.title"
        ></v-text-field>
        <div class="mt-2"></div>
        <v-tabs v-model="cardTab" color="primary">
          <v-tab>
            <v-icon left>mdi-cog</v-icon>
            Components
          </v-tab>
          <v-tab>
            <v-icon left>mdi-state-machine</v-icon>
            States
          </v-tab>
        </v-tabs>
      </v-card-text>
      <div class="mt-2"></div>
      <v-card-text>
        <v-tabs-items v-model="cardTab">
          <v-tab-item :value="cardTabs.COMPONENT">
            <v-row>
              <v-col cols="4"> Game Entity Components </v-col>
              <v-col cols="8"> Selected </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-btn
                  v-for="(gec, index) in gameEntityComponents"
                  :key="`gec-${index}`"
                  :color="gec.color"
                  block
                  tile
                  outlined
                  class="mt-1 font-weight-light"
                  @click="addEntityComponent(gec)"
                >
                  <v-icon left small>{{ gec.icon }}</v-icon>
                  {{ gec.name }}
                </v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="8">
                <v-expansion-panels tile hover>
                  <card-component-expansion-panel
                    v-for="(ec, index) in newCard.entityComponents"
                    :key="`ec-${index}`"
                    :cardComponent="ec"
                    :componentIndex="index"
                    @remove-entity-component="removeEntityComponent"
                  >
                  </card-component-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item :value="cardTabs.STATES">
            <v-row>
              <v-col cols="3">States</v-col>
              <v-col cols="5">State Data</v-col>
              <v-col cols="4">Game Entity Components</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-btn block text tile color="primary" @click="addEntityState">
                  <v-icon left>mdi-plus</v-icon>
                  New State
                </v-btn>
                <v-row class="pt-3">
                  <v-col
                    cols="12"
                    v-for="(state, index) in newCard.fsm.states"
                    :key="`state-${index}`"
                    class="py-1"
                  >
                    <v-row>
                      <v-col cols="3" v-if="entityStateContext.index === index" class="pt-3 pb-2">
                        <v-btn color="red darken-2" block tile text @click="deleteEntityState(index)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col :cols="entityStateContext.index === index ? '9' : '12'" class="py-2">
                        <v-btn
                          block
                          tile
                          class="mt-1"
                          :disabled="entityStateContext.index === index"
                          @click="setEntityStateContext(index)"
                        >
                          {{ state.name.substr(0, 10) }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="5">
                <div v-if="entityStateContext.state">
                  <div>
                    <v-text-field
                      outlined
                      dense
                      label="State name"
                      v-model="entityStateContext.state.name"
                    ></v-text-field>
                  </div>
                  <v-divider></v-divider>
                  <v-expansion-panels tile hover>
                    <card-component-expansion-panel
                      v-for="(ec, index) in entityStateContext.state
                        .gameCardComponents"
                      :key="`ec-${index}`"
                      :cardComponent="ec"
                      :componentIndex="index"
                      @remove-entity-component="removeEntityComponent"
                    >
                    </card-component-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="4">
                <v-btn
                  v-for="(gec, index) in gameEntityComponents"
                  :key="`gec-${index}`"
                  :color="gec.color"
                  block
                  tile
                  outlined
                  class="mt-1 font-weight-light"
                  @click="addEntityComponent(gec)"
                  :disabled="entityStateContext.state === ''"
                >
                  <v-icon left small>{{ gec.icon }}</v-icon>
                  {{ gec.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-title>Summary</v-card-title>
      <v-card-text>
        <v-row class="text-left">
          <v-col cols="4">
            Components:
            <span
              v-for="(componentsGroup, index) in groupComponentsByType(
                newCard.entityComponents
              )"
              :key="`component-by-group-${index}`"
            >
              <v-chip class="mr-1" label outlined>
                <v-icon :color="componentsGroup[0].gec.color" dense left small>
                  {{ componentsGroup[0].gec.icon }}
                </v-icon>
                {{ componentsGroup.length }}</v-chip
              >
            </span>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="8">
            <v-row>
              <v-col cols="2" class="pt-2"> States: </v-col>
              <v-col cols="10">
                <v-row>
                  <v-col
                    cols="12"
                    v-for="(state, index) in newCard.fsm.states"
                    :key="`state-${index}`"
                    class="pa-1"
                  >
                    {{ state.name }}:
                    <span
                      v-for="(componentsGroup, index) in groupComponentsByType(
                        state.gameCardComponents
                      )"
                      :key="`state-component-by-group-${index}`"
                    >
                      <v-chip class="mr-1" label outlined>
                        <v-icon
                          :color="componentsGroup[0].gec.color"
                          dense
                          left
                          small
                        >
                          {{ componentsGroup[0].gec.icon }}
                        </v-icon>
                        {{ componentsGroup.length }}</v-chip
                      >
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile color="red darken-2" @click="cancel"> Cancel </v-btn>
        <v-btn tile color="primary" @click="createCard"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {
  GameCardComponent,
  GameEntityState,
  GameEntityFSM,
  GameCard,
} from "@/game-dev-flow/core/index";

import CardComponentExpansionPanel from "@/components/CardComponentExpansionPanel";

export default {
  components: {
    "card-component-expansion-panel": CardComponentExpansionPanel,
  },

  data() {
    return {
      cardTab: 0,
      cardTabs: {
        COMPONENTS: 0,
        STATES: 1,
      },

      newCard: {
        title: "",
        entityComponents: [],
        fsm: new GameEntityFSM([]),
      },

      entityStateContext: {
        index: "",
        state: "",
      },
    };
  },

  methods: {
    createCard() {
      let gameCard = new GameCard(
        this.newCard.title,
        this.newCard.entityComponents,
        this.newCard.fsm
      );

      this.$emit("create-card", gameCard);
      this.cancel();
    },

    cancel() {
      this.newCard.title = "";
      this.newCard.entityComponents = [];
      this.newCard.fsm = new GameEntityFSM([]);
      this.entityStateContext.index = "";
      this.entityStateContext.state = "";
      this.$emit("cancel");
    },

    addEntityComponent(component) {
      const newComponent = new GameCardComponent(component, "", 0, this.initCardState);

      if (this.cardTab === this.cardTabs.COMPONENTS) {
        this.newCard.entityComponents.push(newComponent);
      } else if (this.cardTab === this.cardTabs.STATES) {
        this.entityStateContext.state.addCardComponent(newComponent);
      }
    },

    removeEntityComponent(index) {
      if (this.cardTab === this.cardTabs.COMPONENTS) {
        this.newCard.entityComponents.splice(index, 1);
      } else if (this.cardTab === this.cardTabs.STATES) {
        this.entityStateContext.state.removeCardComponent(index);
      }
    },

    addEntityState() {
      const index = this.newCard.fsm.states.length;
      const ges = new GameEntityState(`State ${index}`, []);
      this.newCard.fsm.addState(ges);
    },

    deleteEntityState(index) {
      this.entityStateContext.index = "";
      this.entityStateContext.state = "";
      this.newCard.fsm.states.splice(index, 1);
    },

    setEntityStateContext(index) {
      this.entityStateContext.index = index;
      this.entityStateContext.state = this.newCard.fsm.states[index];
    },

    groupComponentsByType(componentsList) {
      const componentsByType = componentsList.reduce((acc, component) => {
        if (!Object.prototype.hasOwnProperty.call(acc, component.gec.name)) {
          acc[component.gec.name] = [];
        }

        acc[component.gec.name].push(component);

        return acc;
      }, {});

      return componentsByType;
    },
  },

  computed: {
    gameEntityComponents() {
      return this.$store.getters["cardComponents/components"];
    },

    initCardState() {
      return this.$store.getters["cardComponents/INIT_CARD_STATE"]
    }
  },
};
</script>