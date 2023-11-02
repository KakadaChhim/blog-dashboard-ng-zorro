import {Component, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> CategorySelectComponent),
    multi: true
  }],
  selector: 'app-category-select',
  template: `
    <nz-select
      nzShowSearch
      [nzServerSearch]="true"
      [(ngModel)]="selectedValue"
      (ngModelChange)="onChangeCallback()"
    >
      <nz-option *ngIf="showAllOption" [nzValue]="'0'" [nzLabel]="'AllCategory'"></nz-option>
    </nz-select>
  `
})
export class CategorySelectComponent{
  showAllOption!: boolean;
  selectedValue: number = 0;

  onChangeCallback: any = () => {};
  onTouchedCallback: any = () => {};
}
