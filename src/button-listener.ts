import type { ButtonEvent } from './button-event';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default class ButtonListener {
    private _buttonEvent: Subject<ButtonEvent> = new Subject<ButtonEvent>();
    private _unsubscribe: Subject<void> = new Subject<void>();

    $buttonEvent = this._buttonEvent.asObservable();

    constructor() {
        fromEvent(document.getElementById('red')!, 'mouseup')
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(() => {
                this._buttonEvent.next((value: string) => {
                    return `${value} from the red button.`;
                });
            });

        fromEvent(document.getElementById('green')!, 'mouseup')
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(() => {
                this._buttonEvent.next((value: string) => {
                    return `${value} from the green button.`;
                });
            });
    }
}