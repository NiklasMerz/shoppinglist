// Controller: ListController
import { Controller } from "stimulus";

// This file automatically initialised by stimulus-webpack-helper
export default class extends Controller {
    static targets = ['item', 'search']
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

        this.searchTarget.addEventListener('ionChange', (ev) => {
            const searchterm = ev.detail.value;
            this.items.forEach((elem) => elem.hidden = !elem.dataset.text?.includes(searchterm));
        });
    }

    switch() {
        this.items.forEach((elem) => elem.hidden = !elem.hidden);
    }

}