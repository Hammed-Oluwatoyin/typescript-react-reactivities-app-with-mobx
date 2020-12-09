import {makeObservable, observable, computed, autorun, action} from "mobx";
import RootStore from "../root-store";


export enum Views {
    Todos,
    Users
}

export default class GlobalView {
    
    
    private rootStore: RootStore;

    @observable currentView: Views = Views.Todos;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

      

        makeObservable(this, {
            currentView: observable,
            stats: computed,
            setView: action
        })
        autorun( () => {
            console.log(this.stats);
        });
    }

    @action setView(view: Views) {
        this.currentView = view;
    }




@computed 
get stats() {
    return  `User Names: ${this.rootStore.dataStores.usersStore.users.map(user => user.name)},
    Total Todos: ${this.rootStore.dataStores.todoStore.todoList.length}

    `
}
}
