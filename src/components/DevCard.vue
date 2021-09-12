<template>
    <div>
        <v-card @click="showCard">
            <v-card-title>
                {{ card.title }}
            </v-card-title>
            <v-card-text class="text-left">
                Card Info
                {{ card }}
            </v-card-text>
        </v-card>    
    </div>
</template>
<script>
export default {
    props: {
        card: Object
    },

    methods: {
        showCard() {

        }
    }
}
</script>