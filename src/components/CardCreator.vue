<template>
    <div>
        <v-card>
            <v-card-title>
                New card creator
            </v-card-title>
            <v-card-text>
                <v-text-field label="Card name" v-model="newCard.title"></v-text-field>
                <v-btn-toggle>
                    <v-btn>Custom</v-btn>
                    <v-btn disabled>State based</v-btn>
                </v-btn-toggle>
            </v-card-text>
            <v-card-title>
                <v-row>
                    <v-col cols="6">
                        Game Entity Components
                    </v-col>
                    <v-col cols="6">
                        Selected
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6" class="text-left">
                        <v-btn v-for="(gec, index) in gameEntityComponents" :key="`gec-${index}`" :color="gec.color" block tile>
                            {{ gec.name }}
                        </v-btn>
                        <!-- <v-switch v-for="(gec, index) in gameEntityComponents" :key="`gec-${index}`" :label="gec.name" :color="gec.color" inset></v-switch> -->
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="6">

                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
            <v-card-actions>
                <v-btn color="primary" @click="createCard">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newCard: {
                title: ""
            }
        }
    },

    methods: {
        createCard() {
            this.$emit("create-card", this.newCard)

            for (let field in this.newCard) {
                this.newCard[field] = ""
            }
        }
    },

    computed: {
        gameEntityComponents() {
            return this.$store.getters['cardComponents/components']
        }
    }
}
</script>