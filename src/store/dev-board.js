// Project's cards on dev board
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/index'

const state = {
    cards: []
}

const getters = {

}

const mutations = {
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

    addCard(state, card) {
        state.cards.push(card)
    }
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