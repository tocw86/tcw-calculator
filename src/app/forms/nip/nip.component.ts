import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcw-nip',
  templateUrl: './nip.component.html',
  styleUrls: ['./nip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NipComponent implements OnInit {
  @Input() public form: FormGroup | undefined;
  constructor() {}

  public ngOnInit(): void {
    if (this.form?.get('nip')?.errors) {
      this.form.get('nip')?.markAsTouched();
    }
  }
}
