// this module provides built-in game components and cards context project
import GameEntityComponent from "../utils/gameEntityComponent"

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
        const scriptComponent = new GameEntityComponent("Script", "orange")
        const animationComponent = new GameEntityComponent("Animation", "deep-purple")
        const model3DComponent = new GameEntityComponent("3D Model", "yellow")
        const particleEffectComponent = new GameEntityComponent("Particle Effect", "teal")
        const spriteComponent = new GameEntityComponent("Sprite", "blue")
        const textureComponent = new GameEntityComponent("Texture", "indigo")
        const audioComponent = new GameEntityComponent("Audio", "red")
        const userInterfaceComponent = new GameEntityComponent("User Interface", "green")
        
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