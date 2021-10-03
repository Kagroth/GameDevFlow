<template>
  <div>
    <v-card>
      <v-card-title>
          <v-row>
              <v-col :cols="hasHeaderControlSlot ? 8 : 12" :class="[`text-left`, titleDense ? `text-subtitle-2` : `` ]">{{ title }}</v-col>
              <v-col cols="4" class="text-right" v-if="hasHeaderControlSlot">
                  <slot name="header-control"></slot>
              </v-col>
          </v-row>
      </v-card-title>
      <v-card-text class="pt-3">
          <v-row v-for="(card, index) in cards" :key="`card-${index}`">
              <v-col cols="12" class="py-1">
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
        titleDense: Boolean,
        cards: Array
    },

    data() {
        return {
            isCollapsed: false
        }
    },

    methods: {

    },

    computed: {
        hasHeaderControlSlot() {
            return !!this.$slots['header-control']
        }
    }
}
</script>