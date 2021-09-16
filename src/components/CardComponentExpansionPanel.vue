<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row align="center">
        <v-col cols="2">
          <v-icon :color="cardComponent.gec.color">{{ cardComponent.gec.icon }}</v-icon>
        </v-col>
        <v-col cols="6">
          <div v-if="cardComponent.title">
            {{ cardComponent.title.substr(0, 20) }}
          </div>
          <div v-else>
            {{ cardComponent.gec.name }}
          </div>
        </v-col>
        <v-col cols="3" v-if="cardComponent.effort" class="text-right">
          {{ cardComponent.effort }} h
          <v-icon left small color="primary">mdi-timer-sand</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="8">
          <v-text-field label="Title" v-model="cardComponent.title"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field label="Effort Hours" v-model="cardComponent.effort" @input="parseEffort"></v-text-field>
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
</template>

<script>
export default {
    props: {
        cardComponent: Object
    },

    methods: {
        removeEntityComponent(index) {
            this.$emit('remove-entity-component', index)
        },

        parseEffort(value) {
            if (!value) value = 0
            this.cardComponent.effort = parseInt(value)
        }
    }
}
</script>