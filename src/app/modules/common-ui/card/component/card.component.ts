import { Component, Input } from '@angular/core';

import { ICard } from '@modules/common-ui/card/interface';

@Component({
    selector: 'app-card-component',
    templateUrl: './card.component.html',
    styleUrls: [
        './card.component.scss'
    ]
})
export class CardComponent {

    @Input() card: ICard;
}
