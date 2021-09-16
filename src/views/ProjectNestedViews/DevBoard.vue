<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-btn color="red darken-2" @click="clearCards" tile>Clear cards</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="2" class="px-1">
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
          <v-col cols="4" class="px-1">
            <to-do-dev-card-container></to-do-dev-card-container>
          </v-col>
          <v-col cols="3" class="px-1">
            <dev-card-container title="In Progress"></dev-card-container>
          </v-col>
          <v-col cols="3" class="px-1">
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
import ToDoDevCardContainer from "@/components/ToDoDevCardContainer";
import DevCard from "@/components/DevCard";
import CardCreator from "@/components/CardCreator"

export default {
  components: {
    "dev-card-container": DevCardContainer,
    "to-do-dev-card-container": ToDoDevCardContainer,
    "dev-card": DevCard,
    "card-creator": CardCreator,
  },

  data() {
    return {
      firstCol: 3,
      isCardCreatorVisible: false,
    };
  },

  created() {
    window.addEventListener("unload", () => {
      this.$store.commit("devBoard/saveCards", this.$route.params.projectName)
    })

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
        this.$store.commit("devBoard/addCard", createdCardData)
    },

    clearCards() {
      this.$store.commit("devBoard/clearCards", this.$route.params.projectName)
    }
  },

  computed: {
    cards() {
      return this.$store.getters['devBoard/cards']
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit("devBoard/saveCards", this.$route.params.projectName)
    next()
  }
};
</script>