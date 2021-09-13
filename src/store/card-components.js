// this module provides built-in game components and cards context project
import GameEntityComponent from "../game-dev-flow/core"

const state = {
    components: [],
}

const getters = {
    components: state => {
        return state.components
    }
}

const mutations = {
    init(state) {
        const gameEntityComponents = []
        const scriptComponent = new GameEntityComponent("Script", "orange darken-3", "mdi-code-braces")
        const animationComponent = new GameEntityComponent("Animation", "deep-purple darken-2", "mdi-animation-play")
        const model3DComponent = new GameEntityComponent("3D Model", "yellow darken-2", "mdi-cube-outline")
        const particleEffectComponent = new GameEntityComponent("Particle Effect", "teal darken-2", "mdi-star-shooting")
        const spriteComponent = new GameEntityComponent("Sprite", "blue darken-2", "mdi-texture-box")
        const textureComponent = new GameEntityComponent("Texture", "indigo darken-2", "mdi-texture")
        const audioComponent = new GameEntityComponent("Audio", "red darken-2", "mdi-volume-high")
        const userInterfaceComponent = new GameEntityComponent("User Interface", "green darken-2", "mdi-newspaper-variant")
        
        gameEntityComponents.push(scriptComponent, animationComponent, model3DComponent, particleEffectComponent, spriteComponent, textureComponent, audioComponent, userInterfaceComponent)

        state.components = gameEntityComponents
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}