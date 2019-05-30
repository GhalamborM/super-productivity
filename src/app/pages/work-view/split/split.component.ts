import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const ANIMATABLE_CLASS = 'isAnimatable';

@Component({
  selector: 'split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitComponent {
  @Input() splitTopEl;
  @Input() splitBottomEl;
  @Input() containerEl;
  @Input() counter;
  @Input() isAnimateBtn;
  @Output() posChanged: EventEmitter<number> = new EventEmitter();

  pos: number;
  eventSubs: Subscription;
  @ViewChild('buttonEl', {static: true}) buttonEl;
  private _isDrag = false;

  constructor(private _renderer: Renderer2) {
  }

  @Input() set splitPos(pos: number) {
    if (pos !== this.pos) {
      this._renderer.addClass(this.splitTopEl, ANIMATABLE_CLASS);
      this._renderer.addClass(this.splitBottomEl, ANIMATABLE_CLASS);
      this._updatePos(pos, true);
    }
  }

  toggle() {
    this._renderer.addClass(this.splitTopEl, ANIMATABLE_CLASS);
    this._renderer.addClass(this.splitBottomEl, ANIMATABLE_CLASS);
    let newPos = 50;
    if (this.pos > 45 && this.pos < 55) {
      newPos = 100;
    }
    this._updatePos(newPos);
  }

  onTouchStart(ev) {
    this._isDrag = false;
    const touchend$ = fromEvent(document, 'touchend');
    this.eventSubs = touchend$.subscribe((e: TouchEvent) => this.onMoveEnd(e));

    const touchmove$ = fromEvent(document, 'touchmove')
      .pipe(takeUntil(touchend$))
      .subscribe((e: TouchEvent) => this.onMove(e));

    this.eventSubs.add(touchmove$);
  }

  onMouseDown() {
    this._isDrag = false;
    const mouseup$ = fromEvent(document, 'mouseup');
    this.eventSubs = mouseup$.subscribe((e: MouseEvent) => this.onMoveEnd(e));

    const mousemove$ = fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e: MouseEvent) => this.onMove(e));

    this.eventSubs.add(mousemove$);
  }

  onMoveEnd(ev): void {
    if (this.eventSubs) {
      this.eventSubs.unsubscribe();
      this.eventSubs = undefined;
    }

    if (!this._isDrag) {
      this.toggle();
    }
  }

  onMove(ev) {
    const clientY = (typeof ev.clientY === 'number')
      ? ev.clientY
      : ev.touches[0].clientY;
    this._renderer.removeClass(this.splitTopEl, ANIMATABLE_CLASS);
    this._renderer.removeClass(this.splitBottomEl, ANIMATABLE_CLASS);
    this._isDrag = true;
    const bounds = this.containerEl.getBoundingClientRect();
    const h = this.containerEl.offsetHeight;
    const headerHeight = bounds.top;

    let percentage = (clientY - headerHeight) / h * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    this._updatePos(percentage);
  }

  private _updatePos(pos: number, isWasOutsideChange = false) {
    this.pos = pos;
    if (this.splitTopEl && this.splitBottomEl) {
      this._renderer.setStyle(
        this.splitTopEl,
        'height',
        `${pos}%`,
      );
      this._renderer.setStyle(
        this.splitBottomEl,
        'height',
        `${100 - pos}%`,
      );
      // this._renderer.setStyle(
      //   this._el.nativeElement,
      //   'top',
      //   `${pos}%`,
      // );

      if (!isWasOutsideChange) {
        this.posChanged.emit(pos);
      }
    }
  }
}
