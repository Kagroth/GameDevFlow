// Project's cards on dev board
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/index'

const state = {
    cards: []
}

const getters = {
    cards: state => {
        return state.cards
    },

    // Refactor to "Get Cards with state"
    cardsWithComponentsToPrototype: (state, getters, rootState, rootGetters) => {
        const TO_PROTOTYPE = rootGetters['cardComponents/CARD_STATES']['NOT_STARTED']

        const cardComponents = state.cards.filter(card => {
            return card.gameCardComponents.some(component => {
               return component.cardState == TO_PROTOTYPE
            })
        }) 

        const fsmCardComponents = state.cards.filter(card => {
            if (cardComponents.includes(card)) { 
                return false 
            }

            if (card.gameEntityFSM.states.length === 0) {
                return false
            }

            const gameCardComponentsByState = card.gameEntityFSM.states.map(state => state.gameCardComponents)

            const gameCardComponentsByStateFlatten = gameCardComponentsByState.flat()
            
            return gameCardComponentsByStateFlatten.some(gameCardComponent => {
                return gameCardComponent.cardState == TO_PROTOTYPE
            }) 
        })

        const finalArr = cardComponents.concat(fsmCardComponents)
        return finalArr
    }
}

const mutations = {
    init() {

    },

    saveCards(state, projectName) {
        const fieldName = `${projectName}-dev-board-cards`
        saveToLocalStorage(fieldName, state.cards)
    },

    loadCards(state, projectName) {
        const fieldName = `${projectName}-dev-board-cards`
        state.cards = getFromLocalStorage(fieldName)
        
        if (!Array.isArray(state.cards)) {
            state.cards = []
        }
    },

    clearCards(state, projectName) {
        state.cards = []
        const fieldName = `${projectName}-dev-board-cards`
        saveToLocalStorage(fieldName, state.cards)
    },

    addCard(state, card) {
        state.cards.push(card)
    },
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}