import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatInput } from '@angular/material';

@Component({
  selector: 'keyboard-input',
  templateUrl: './keyboard-input.component.html',
  styleUrls: ['./keyboard-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardInputComponent extends FieldType {
  @ViewChild(MatInput, {static: true}) formFieldControl: MatInput;

  get type() {
    return this.to.type || 'text';
  }

  onKeyDown(ev) {
    // the tab key should continue to behave normally
    if (ev.keyCode === 9 || ev.key === 'Tab') {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();

    // focus out on escape
    if (ev.keyCode === 27 || ev.key === 'Escape') {
      // element.blur();
    } else if (ev.keyCode === 13 || ev.key === 'Enter') {
      // element.blur();
    } else if (ev.keyCode === 16 || ev.keyCode === 17 || ev.keyCode === 18) {
      // don't update if event is for ctrl alt or shift down itself
      return;
    } else {
      let val = '';
      if (ev.ctrlKey) {
        val += 'Ctrl+';
      }
      if (ev.altKey) {
        val += 'Alt+';
      }
      if (ev.shiftKey) {
        val += 'Shift+';
      }
      if (ev.metaKey) {
        val += 'Meta+';
      }

      // fail safe for MacOsX crashing bug
      if (ev.key === 'Meta') {
      } else {
        this.formControl.setValue(val + ev.key);
      }
    }
  }
}
