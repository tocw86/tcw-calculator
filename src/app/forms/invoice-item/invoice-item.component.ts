import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
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

  @Input() public form!: UntypedFormGroup;
  @Output() public emmitRemoveItem: EventEmitter<string> = new EventEmitter();
  @Output() public emmitNeedCalculateTotal: EventEmitter<boolean> =
    new EventEmitter();
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

  public ngOnInit(): void {
    if (this.form) {
      this.form.get('vatRate')?.markAsTouched();
      this.form.get('net')?.markAsTouched();
      this.form.get('gross')?.markAsTouched();
      this.form.get('vat')?.markAsTouched();
    }
  }

  public removeItem(): void {
    this.emmitRemoveItem.emit();
    this.emmitNeedCalculateTotal.emit(true);
  }

  public onValueChanged(): void {
    if (this.vatRate && this.net) {
      const vat = this.calculations.caluculateVat(this.net, this.vatRate);
      const gross = this.calculations.caluculateGross(this.net, vat);
      this.form.get('vat')?.setValue(vat);
      this.form.get('gross')?.setValue(gross);
    } else if (this.vatRate === 0 && this.net) {
      this.form.get('vat')?.setValue(0);
      this.form.get('gross')?.setValue(this.net);
    }
    this.eventService.dispatchBlur(this.inputGross);
    this.eventService.dispatchBlur(this.inputVat);
    this.emmitNeedCalculateTotal.emit(true);
  }

  public onGrossValueChanged(): void {
    if (this.vatRate && this.gross) {
      const net = this.calculations.calculateNet(this.net, this.vatRate);
      this.form.get('net')?.setValue(net);
      const vat = this.calculations.caluculateVat(this.net, this.vatRate);
      this.form.get('vat')?.setValue(vat);

      this.eventService.dispatchBlur(this.inputNet);
      this.eventService.dispatchBlur(this.inputVat);
    } else if (this.vatRate === 0 && this.gross) {
      this.form.get('net')?.setValue(this.gross);
      this.form.get('vat')?.setValue(0);
    }

    this.eventService.dispatchBlur(this.inputNet);
    this.eventService.dispatchBlur(this.inputVat);
    this.emmitNeedCalculateTotal.emit(true);
  }

  public onChanged(): void {
    this.emmitNeedCalculateTotal.emit(true);
  }
}
