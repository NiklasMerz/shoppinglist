// Controller: ListController
import { Controller } from "stimulus";

// This file automatically initialised by stimulus-webpack-helper
export default class extends Controller {
    static targets = ['item' ]
    items = [];

    connect() {
        // Collect elements and hide elements without by flag
        for (const item of this.itemTargets) {
            if (item?.dataset.buy) {
                this.items.push(item);
            

                if (item.dataset.buy === 'False') {
                    item.hidden = true;
                }
            }
        }

        console.debug(items);
    }

    switch() {
        this.items.forEach((elem) => elem.hidden = !elem.hidden);
    }

}