// Controller: ListController
import { Controller } from "stimulus";

// This file automatically initialised by stimulus-webpack-helper
export default class extends Controller {
    items = [];

    connect() {
        // Collect elements and hide elements without by flag
        for (var i = 0; i < this.element.children.length; i++) {
            let frame = this.element.children[i];
            let item = frame.children[0];
            
            if (item?.dataset.buy) {
                this.items.push(item);
            

                if (item.dataset.buy === 'False') {
                    item.hidden = true;
                }
            }
        }
    }

    switch() {
        this.items.forEach((elem) => elem.hidden = !elem.hidden);
    }

}