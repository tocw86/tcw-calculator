import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VatRate, vatRates } from 'src/app/core/models/vat';
import { CalculationsService } from 'src/app/core/services/calculations.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'tcw-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceItemComponent implements OnInit {
  @ViewChild('inputNet') public inputNet!: ElementRef;
  @ViewChild('inputVat') public inputVat!: ElementRef;
  @ViewChild('inputGross') public inputGross!: ElementRef;

  @Input() public form!: FormGroup;
  @Output() public emmitRemoveItem: EventEmitter<string> = new EventEmitter();
  public readonly vatRates: VatRate[] = vatRates;

  constructor(
    private calculations: CalculationsService,
    private eventService: EventService,
  ) {}

  public get vatRate(): number {
    return this.form.get('vatRate')?.value ?? 0;
  }
  public get net(): number {
    return this.form.get('net')?.value ?? 0;
  }
  public get gross(): number {
    return this.form.get('gross')?.value ?? 0;
  }

  public ngOnInit(): void {}

  public removeItem(): void {
    this.emmitRemoveItem.emit();
  }

  public onValueChanged(): void {
    if (this.vatRate && this.net) {
      const vat = this.calculations.caluculateVat(this.net, this.vatRate);
      const gross = this.calculations.caluculateGross(this.net, vat);
      this.form.get('vat')?.setValue(vat);
      this.form.get('gross')?.setValue(gross);
      this.eventService.dispatchBlur(this.inputGross);
      this.eventService.dispatchBlur(this.inputVat);
    }
  }

  public onGrossValueChanged(): void {
    if (this.vatRate && this.gross) {
      const net = this.calculations.calculateNet(this.net, this.vatRate);
      this.form.get('net')?.setValue(net);
      const vat = this.calculations.caluculateVat(this.net, this.vatRate);
      this.form.get('vat')?.setValue(vat);

      this.eventService.dispatchBlur(this.inputNet);
      this.eventService.dispatchBlur(this.inputVat);
    }
  }
}
