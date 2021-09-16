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
            <span>
                <v-chip label outlined small>
                    <v-icon color="primary" left small>mdi-state-machine</v-icon>
                    {{ card.gameEntityFSM.states.length }}
                </v-chip>
            </span>
          </v-col>
          <v-col cols="4" class="text-right">
              {{ totalEffort() }}
              <v-icon color="primary" small>mdi-timer-sand</v-icon>
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
  },

  methods: {
    showCard() {
      // show card on click
    },

    groupComponentsByType(componentsList) {
      const componentsByType = componentsList.reduce((acc, component) => {
        if (!Object.prototype.hasOwnProperty.call(acc, component.gec.name)) {
          acc[component.gec.name] = [];
        }

        acc[component.gec.name].push(component);

        return acc;
      }, {});
      console.log(componentsByType);
      return componentsByType;
    },

    totalEffort() {
        let effort = 0

        for (let gameComponent in this.card.gameCardComponents) {
            effort += new Number(gameComponent.effort)
        }

        for (let fsmState in this.card.gameEntityFSM.states) {
            for (let gameComponent in fsmState.gameCardComponents) {
                effort += new Number(gameComponent.effort)
            }
        }

        return effort
    }
  },

  computed: {},
};
</script>