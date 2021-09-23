<template>
  <div>
    <v-card>
      <v-card-title> In progress </v-card-title>
      <v-card-text>
        <v-row
          v-for="(
            cardComponent, index
          ) in cardComponentsWithCardTitlePrototyping"
          :key="`game-component-card-in-progress-${index}`"
        >
          <v-col cols="12" class="text-left py-1">
            <game-component-card
              :gameComponent="cardComponent.gameCardComponent"
              :cardTitle="cardComponent.title"
              controls
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
    cardComponentsWithCardTitlePrototyping() {
      const prototypingCards =
        this.$store.getters["devBoard/cardComponentsWithCardTitleAndState"](
          "PROTOTYPING"
        );

      const productionCards =
        this.$store.getters["devBoard/cardComponentsWithCardTitleAndState"](
          "PRODUCTION"
        );

      const polishingCards =
        this.$store.getters["devBoard/cardComponentsWithCardTitleAndState"](
          "POLISHING"
        );

      return prototypingCards.concat(productionCards).concat(polishingCards);
    },
  },
};
</script>