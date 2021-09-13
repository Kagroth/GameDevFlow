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
        <p>Card type</p>
        <v-btn-toggle v-model="cardType" mandatory>
          <v-btn :value="cardTypes.CUSTOM">Custom</v-btn>
          <v-btn :value="cardTypes.STATE">State based</v-btn>
        </v-btn-toggle>
      </v-card-text>
      <div class="mt-2"></div>
      <div v-if="cardType === cardTypes.CUSTOM">
        <v-card-title>
          <v-row>
            <v-col cols="4"> Game Entity Components </v-col>
            <v-col cols="8"> Selected </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
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
                <v-expansion-panel
                  v-for="(ec, index) in newCard.entityComponents"
                  :key="`ec-${index}`"
                >
                  <v-expansion-panel-header>
                    <v-row align="center">
                      <v-col cols="2">
                        <v-icon :color="ec.gec.color">{{ ec.gec.icon }}</v-icon>
                      </v-col>
                      <v-col cols="6">
                        <div v-if="ec.title">
                          {{ ec.title.substr(0, 12) }}
                        </div>
                        <div v-else>
                          {{ ec.gec.name }}
                        </div>
                      </v-col>
                      <v-col cols="3" v-if="ec.effort" class="text-right">
                        {{ ec.effort }} h
                        <v-icon left small color="primary"
                          >mdi-timer-sand</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="8">
                        <v-text-field
                          label="Title"
                          v-model="ec.title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          label="Effort Hours"
                          v-model="ec.effort"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="text-right">
                        <v-btn
                          tile
                          color="red darken-3"
                          small
                          @click="removeEntityComponent(index)"
                          >Remove</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <div v-else-if="cardType === cardTypes.STATE">
        <v-card-title>
          <v-row>
            <v-col cols="3">States</v-col>
            <v-col cols="5">State Data</v-col>
            <v-col cols="4">Game Entity Components</v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-btn block text tile color="primary" @click="addEntityState">
                <v-icon left>mdi-plus</v-icon>
                New State
              </v-btn>
              <v-btn
                block
                tile
                v-for="(state, index) in newCard.fsm.states"
                :key="`state-${index}`"
                class="mt-1"
                :disabled="entityStateContext.index === index"
                @click="setEntityStateContext(index)"
              >
                {{ state.name }}
              </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="5">
              <div v-if="entityStateContext.state">
                <v-text-field
                  outlined
                  label="State name"
                  v-model="entityStateContext.state.name"
                ></v-text-field>
              </div>
              <v-divider></v-divider>
              <v-expansion-panels tile hover>
                <v-expansion-panel
                  v-for="(ec, index) in entityStateContext.state.gameCardComponents"
                  :key="`ec-${index}`"
                >
                  <v-expansion-panel-header>
                    <v-row align="center">
                      <v-col cols="2">
                        <v-icon :color="ec.gec.color">{{ ec.gec.icon }}</v-icon>
                      </v-col>
                      <v-col cols="6">
                        <div v-if="ec.title">
                          {{ ec.title.substr(0, 12) }}
                        </div>
                        <div v-else>
                          {{ ec.gec.name }}
                        </div>
                      </v-col>
                      <v-col cols="3" v-if="ec.effort" class="text-right">
                        {{ ec.effort }} h
                        <v-icon left small color="primary"
                          >mdi-timer-sand</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="8">
                        <v-text-field
                          label="Title"
                          v-model="ec.title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          label="Effort Hours"
                          v-model="ec.effort"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="text-right">
                        <v-btn
                          tile
                          color="red darken-3"
                          small
                          @click="removeEntityComponent(index)"
                          >Remove</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
        </v-card-text>
      </div>

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
} from "@/game-dev-flow/core/index";

export default {
  data() {
    return {
      cardTypes: {
        CUSTOM: "Custom",
        STATE: "State",
      },

      cardType: "State",
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
      this.$emit("create-card", this.newCard);

      for (let field in this.newCard) {
        this.newCard[field] = "";
      }
    },

    cancel() {
      this.newCard.title = "";
      this.newCard.entityComponents = [];
      this.newCard.fsm = new GameEntityFSM([])
      this.entityStateContext.index = "";
      this.entityStateContext.state = ""
      this.$emit("cancel");
    },

    addEntityComponent(component) {
      const newComponent = new GameCardComponent(component);

      if (this.cardType === this.cardTypes.CUSTOM) {
          this.newCard.entityComponents.push(newComponent);
      }
      else if (this.cardType === this.cardTypes.STATE) {
          this.entityStateContext.state.addCardComponent(newComponent)
      }
    },

    removeEntityComponent(index) {
        if (this.cardType === this.cardTypes.CUSTOM) {
            this.newCard.entityComponents.splice(index, 1);
        }
        else if (this.cardType === this.cardTypes.STATE) {
            this.entityStateContext.state.removeCardComponent(index)
        }
    },

    addEntityState() {
      const index = this.newCard.fsm.states.length;
      const ges = new GameEntityState(`State ${index}`, []);
      this.newCard.fsm.addState(ges);
    },

    setEntityStateContext(index) {
      this.entityStateContext.index = index;
      this.entityStateContext.state = this.newCard.fsm.states[index];
    },
  },

  computed: {
    gameEntityComponents() {
      return this.$store.getters["cardComponents/components"];
    },
  },
};
</script>