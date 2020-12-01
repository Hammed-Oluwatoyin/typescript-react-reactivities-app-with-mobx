import {makeObservable, observable, computed, autorun} from "mobx";
import RootStore from "../root-store";

export default class GlobalView {
    @observable
    color: string = "green";
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore =rootStore;

      

        makeObservable(this, {
            color: observable,
            stats: computed
        })
        autorun( () => {
            console.log(this.stats);
        });
    }

@computed 
get stats() {
    return  `User Names: ${this.rootStore.dataStores.usersStore.users.map(user => user.name)},
    Total Todos: ${this.rootStore.dataStores.todoStore.todoList.length}

    `
}
}
