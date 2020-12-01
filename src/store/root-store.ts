import DataStore from "./data/data-store";
import UIStore from "./ui/ui-store";


export default class RootStore {
    dataStores: DataStore;
    uiStores: UIStore;

    constructor() {
        this.dataStores = new DataStore(this);
        this.uiStores = new UIStore(this);
    }
}