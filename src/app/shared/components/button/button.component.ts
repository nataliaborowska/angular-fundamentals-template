import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  fas = fas;
  @Input() buttonText?: string = '';
  @Input() iconName?: IconName;
  @Input() type?: 'button' | 'submit' = 'button';
  @Input() isDisabled?: boolean = false;
  @Input() iconBtn?: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick?.emit();
    }
  }
}
