import settings from "@/config/settings"

export function getFromLocalStorage(fieldName) {
    const projectsProperty = `${settings.localStoragePrefix}-${fieldName}`
    let projects = localStorage.getItem(projectsProperty)
    
    if (projects) {
        projects = JSON.parse(projects)
        return projects
    }
    else {
        return {}
    }
}

export function saveToLocalStorage(fieldName, objectToSave) {
    const propertyName = `${settings.localStoragePrefix}-${fieldName}`
    const propertyToSave = JSON.stringify(objectToSave)
    
    localStorage.setItem(propertyName, propertyToSave)
}