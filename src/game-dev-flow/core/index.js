export default class GameEntityComponent {
    constructor(name, color, icon) {
        this.name = name
        this.color = color
        this.icon = icon 
    }
}

export class GameCardComponent {
    constructor(gameEntityComponent, title, effort, description) {
        this.gec = gameEntityComponent
        this.title = title
        this.effort = effort
        this.description = description
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
    constructor(gameCardComponents) {
        this.gameCardComponents = gameCardComponents
    }
}