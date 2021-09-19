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