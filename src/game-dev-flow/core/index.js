export default class GameEntityComponent {
    constructor(name, color, icon) {
        this.name = name
        this.color = color
        this.icon = icon 
    }
}

export class GameCardComponent {
    constructor(gameEntityComponent, title, effort, cardState, description) {
        this.gec = gameEntityComponent
        this.title = title
        this.effort = effort
        this.cardState = cardState
        this.description = description
        this.workedTime = 0
    }
}

export class GameEntityState {
    constructor(name, gameCardComponents) {
        this.name = name
        this.gameCardComponents = gameCardComponents
    }

    addCardComponent(cardComponent) {
        this.gameCardComponents.push(cardComponent)
    }

    removeCardComponent(index) {
        this.gameCardComponents.splice(index, 1)
    }
}

export class GameEntityFSM {
    constructor(states) {
        this.states = states
    }

    addState(state) {
        this.states.push(state)
    }
}

export class GameCard {
    constructor(title, gameCardComponents, gameEntityFSM) {
        this.title = title
        this.gameCardComponents = gameCardComponents
        this.gameEntityFSM = gameEntityFSM
    }
}