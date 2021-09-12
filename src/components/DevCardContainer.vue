<template>
  <div>
    <v-card>
      <v-card-title>
          <v-row>
              <v-col cols="6" class="text-left">{{ title }}</v-col>
              <v-col cols="6" class="text-right">
                  <slot name="header-control"></slot>
              </v-col>
          </v-row>
      </v-card-title>
      <v-card-text>
          <v-row v-for="(card, index) in cards" :key="`card-${index}`">
              <v-col cols="12">
                  <slot name="card" v-bind:card="card"></slot>
              </v-col>
          </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
    props: {
        title: String,
        cards: Array
    },

    data() {
        return {
            isCollapsed: false
        }
    },

    methods: {

    }
}
</script>