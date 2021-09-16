<template>
  <div>
    <v-card @click="showCard">
      <v-card-title>
        {{ card.title }}
      </v-card-title>
      <v-card-text class="text-left">
        <v-row>
          <v-col cols="8">
            <span
              v-for="(componentsGroup, index) in groupComponentsByType(
                card.gameCardComponents
              )"
              :key="`component-by-group-${index}`"
            >
              <v-chip class="mr-1" label outlined small>
                <v-icon :color="componentsGroup[0].gec.color" left small>
                  {{ componentsGroup[0].gec.icon }}
                </v-icon>
                {{ componentsGroup.length }}
              </v-chip>
            </span>
            <span v-if="card.gameEntityFSM.states.length > 0">
                <v-chip label outlined small>
                    <v-icon color="primary" left small>mdi-state-machine</v-icon>
                    {{ card.gameEntityFSM.states.length }}
                </v-chip>
            </span>
          </v-col>
          <v-col cols="4" class="text-right">
              {{ totalEffort }}
              <v-icon color="primary" small>mdi-timer-sand</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showCardDetails" width="1000">
      <dev-card-details :card="card" :totalEffort="totalEffort"></dev-card-details>
    </v-dialog>
  </div>
</template>
<script>
import DevCardDetails from '@/components/DevCardDetails'

export default {
  props: {
    card: Object,
  },

  components: {
    "dev-card-details": DevCardDetails
  },

  data() {
    return {
      showCardDetails: false
    }
  },

  methods: {
    showCard() {
      this.showCardDetails = true
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

    calculateTotalEffort() {
        let effort = 0

        for (let gameComponent of this.card.gameCardComponents) {
            effort += gameComponent.effort
        }

        for (let fsmState of this.card.gameEntityFSM.states) {
            for (let gameComponent of fsmState.gameCardComponents) {
              console.log(gameComponent.effort);
                effort += gameComponent.effort
            }
        }

        return effort
    }
  },

  computed: {
    totalEffort() {
      return this.calculateTotalEffort()
    }
  },
};
</script>