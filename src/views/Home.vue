<template>
  <div>
    <v-app-bar app>
      <v-btn @click="clearProjects" color="error">Clear projects</v-btn>
    </v-app-bar>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="3">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 20 : 2"
              height="200px"
              @click="projectCreatorModal = true"
            >
              <v-card-title></v-card-title>
              <v-card-text class="text-h4">
                Create new project
                <br />
                <v-icon color="primary" large class="pt-5">mdi-plus</v-icon>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="3" v-for="(project, index) in projects" :key="`${project.name}-${index}`">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 20 : 2" height="200px">
              <v-card-title></v-card-title>
              <v-card-text class="text-h4">
                {{ project.name }}
                <br/>
                <v-icon color="warning" large class="pt-5">mdi-google-controller</v-icon>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-dialog v-model="projectCreatorModal" persistent max-width="800px">
        <v-card>
          <v-card-title>Set up project name</v-card-title>
          <v-card-text>
            <v-text-field label="Project name" v-model="projectName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="projectCreatorModal = false">Cancel</v-btn>
            <v-btn color="primary" @click="createProject">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectCreatorModal: false,
      projectName: ""
    };
  },

  methods: {
    createProject() {
      if (this.projectName === "") {
        console.warn("Project name not set!");
        return;
      }

      this.$store.commit("home/addProject", this.projectName)
    },

    clearProjects() {
      this.$store.commit("home/clearProjects")
    }
  },

  computed: {
    projects() {
      return this.$store.getters["home/projects"];
    },
  },
};
</script>
