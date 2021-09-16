// Project's cards on dev board
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/index'

const state = {
    cards: []
}

const getters = {
    cards: state => {
        return state.cards
    },

    cardsWithComponentsToPrototype: (state, getters, rootState, rootGetters) => {
        const TO_PROTOTYPE = rootGetters['cardComponents/CARD_STATES']['NOT_STARTED']
        // To do: Check for components in FSM
        return state.cards.filter(card => {
            return card.gameCardComponents.some(component => {
               return component.cardState == TO_PROTOTYPE
            })
        })
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