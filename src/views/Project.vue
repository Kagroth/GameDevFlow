<template>
    <div>
        <project-header :project="project"></project-header>
        <v-container>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import ProjectHeader from '@/components/ProjectHeader'

export default {
    components: {
        "project-header": ProjectHeader
    },

    data() {
        return {
            projectName: ""
        }
    },

    created() {
        this.projectName = this.$route.params.projectName
    },

    computed: {
        project() {
            return this.$store.getters['home/getProjectByName'](this.projectName)
        }
    }
}
</script>