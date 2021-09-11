<template>
  <div>
    <v-app-bar app>
      <v-btn @click="clearProjects" color="error">Clear projects</v-btn>
    </v-app-bar>
    <v-container>
      <v-row align="center">
        <v-col cols="3">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 20 : 2"
              height="200px"
              @click="projectCreatorModal = true"
            >
              <v-card-title></v-card-title>
              <v-card-text class="text-h4">
                <v-row>
                  <v-col cols="12">
                    Create new project
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-icon color="primary" large>mdi-plus</v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="3" v-for="(project, index) in projects" :key="`${project.name}-${index}`">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 20 : 2" height="200px" @click="goToProject(project.name)">
              <v-card-title></v-card-title>
              <v-card-text class="text-h4">
                <v-row>
                  <v-col cols="12">
                    {{ project.name }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-icon color="warning" large>mdi-google-controller</v-icon>
                  </v-col>
                </v-row>
                <br/>
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

      if (!Array.isArray(this.projects)) {
        this.$store.commit("home/addProject", this.projectName);
        this.projectCreatorModal = false;
        this.projectName = "";
        return;
      }

      const projectNames = this.projects.map(project => project.name)
      
      if (projectNames.includes(this.projectName)) {
        console.log("Project name already taken")
        return;  
      }

      this.$store.commit("home/addProject", this.projectName);
      this.projectCreatorModal = false;
      this.projectName = "";
    },

    goToProject(projectName) {
      this.$router.push({name: 'ProjectView', params: {projectName: projectName}});
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
