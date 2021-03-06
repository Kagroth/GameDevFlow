// Project's cards on dev board
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/index'

const state = {
    cards: []
}

const getters = {
    cards: state => {
        return state.cards
    },

    allCardComponents: (state) => {
        const gameCardComponents = state.cards.map(card => {
            return card.gameCardComponents
        }).flat()

        const gameFSMCardComponents = state.cards.map(card => {
            return card.gameEntityFSM.states.map(state => {
                return state.gameCardComponents
            }).flat()
        }).flat()

        return gameCardComponents.concat(gameFSMCardComponents)
    },

    allCardComponentsWithCardTitle: (state) => {
        const gameCardComponents = state.cards.map(card => {
            return card.gameCardComponents.map(gcc => {
                return {
                    title: card.title,
                    gameCardComponent: gcc
                }
            })
        }).flat()

        const gameFSMCardComponents = state.cards.map(card => {
            return card.gameEntityFSM.states.map(state => {
                return state.gameCardComponents.map(gcc => {
                    return {
                        title: card.title,
                        stateName: state.name,
                        gameCardComponent: gcc
                    }
                })
            }).flat()
        }).flat()

        return gameCardComponents.concat(gameFSMCardComponents)
    },

    cardComponentsWithState: (state, getters) => (cardComponentState) => {
        const allCardComponents = getters.allCardComponents

        const allCardComponentsWithState = allCardComponents.filter(cc => {
            return cc.cardState === cardComponentState
        })
        
        return allCardComponentsWithState
    },

    cardComponentsWithCardTitleAndState: (state, getters) => (cardComponentState) => {
        const cardComponentsWithCardTitle = getters.allCardComponentsWithCardTitle
    
        const cardComponentsWithTitleAndState = cardComponentsWithCardTitle.filter(cc => {
            return cc.gameCardComponent.cardState === cardComponentState
        })

        return cardComponentsWithTitleAndState
    },
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

    changeCardComponentState(state, payload) {
        const cardComponent = payload.cardComponent 
        const newState = payload.newState
        
        cardComponent.cardState = newState
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