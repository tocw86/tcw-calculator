import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tcw-nip',
  templateUrl: './nip.component.html',
  styleUrls: ['./nip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NipComponent implements OnInit {
  @Input() public form!: FormGroup;
  constructor() {}

  public ngOnInit(): void {
    this.form?.addControl('nip', new FormControl('', { nonNullable: true }));
  }
}
