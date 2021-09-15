<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col :cols="firstCol">
            <dev-card-container title="Backlog" :cards="cards">
              <template v-slot:header-control>
                <div>
                  <v-tooltip bottom open-delay="1000">
                    <template v-slot:activator="{ on, attr }">
                      <v-btn
                        small
                        icon
                        outlined
                        tile
                        color="primary"
                        @click="openCardCreator"
                        v-on="on"
                        v-bind="attr"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <p>Create new card</p>
                  </v-tooltip>
                </div>
              </template>
              <template v-slot:card="data">
                <dev-card :card="data.card"></dev-card>
              </template>
            </dev-card-container>
          </v-col>
          <v-col cols="3">
            <dev-card-container title="To do"></dev-card-container>
          </v-col>
          <v-col cols="3">
            <dev-card-container title="In Progress"></dev-card-container>
          </v-col>
          <v-col cols="3">
            <dev-card-container title="Done"></dev-card-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--  Dialogs -->
    <div>
        <v-dialog v-model="isCardCreatorVisible" width="1000" persistent>
            <card-creator @create-card="onCardCreate" @cancel="isCardCreatorVisible = false"></card-creator>
        </v-dialog>
    </div>
  </div>
</template>
<script>
import DevCardContainer from "@/components/DevCardContainer";
import DevCard from "@/components/DevCard";
import CardCreator from "@/components/CardCreator"

export default {
  components: {
    "dev-card-container": DevCardContainer,
    "dev-card": DevCard,
    "card-creator": CardCreator,
  },

  data() {
    return {
      firstCol: 3,
      // gameElements: [],
      isCardCreatorVisible: false,
    };
  },

  created() {
    this.$store.commit("devBoard/loadCards", this.$route.params.projectName)
  },

  methods: {
    changeSize() {
      let size = 1;

      if (this.firstCol === 2) size = 3;
      else size = 2;

      this.firstCol = size;
    },

    openCardCreator() {
      this.isCardCreatorVisible = true;
    },

    onCardCreate(createdCardData) {
        // this.gameElements.push(createdCardData)
        this.$store.commit("devBoard/addCard", createdCardData)
    }
  },

  computed: {
    cards() {
      return this.$store.getters['devBoard/cards']
    }
  }
};
</script>