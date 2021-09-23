<template>
    <div>
        <v-card>
            <v-card-title>Done</v-card-title>
            <v-card-text>
                <v-row v-for="(cardComponent, index) in cardComponentsWithCardTitlePolished" :key="`card-component-done${index}`">
                    <v-col class="text-left">
                        <game-component-card 
                            :cardTitle="cardComponent.title"
                            :gameComponent="cardComponent.gameCardComponent"
                        ></game-component-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import GameComponentCard from "@/components/GameComponentCard";

export default {    
  components: {
    "game-component-card": GameComponentCard,
  },

  computed: {
    cardComponentsWithCardTitlePolished() {
      return this.$store.getters[
        "devBoard/cardComponentsWithCardTitleAndState"
      ]("POLISHED");
    },
  }
}
</script>