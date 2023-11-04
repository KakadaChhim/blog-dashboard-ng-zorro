import {Component, EventEmitter, forwardRef, OnInit, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CategoryService} from "./category.service";
import {CategoryUiService} from "./category-ui.service";

@Component({
  selector: 'app-category-select',
  template: `
    <nz-select
      nzShowSearch
      [(ngModel)]="selectedValue"
      (ngModelChange)="onModalChange()"
    >
      <nz-option *ngFor="let item of categoryList" nzCustomContent [nzValue]="item" [nzLabel]="item.data.category">
        <span>{{item.data.category}}</span>
      </nz-option>
    </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectComponent),
      multi: true
    }
  ]
})
export class CategorySelectComponent implements OnInit, ControlValueAccessor{
  loading: boolean = false;
  categoryList: any;
  @Output() valueChanged = new EventEmitter<any>();

  constructor(
    private service: CategoryService,
    public uiService: CategoryUiService,
  ) {
  }

  selectedValue : any;
  refreshSub$: any;

  onChangeCallback: any = () => {};
  onTouchedCallback: any = () => {};

  ngOnInit(): void {
    this.service.loadData().subscribe(value => {
      this.categoryList = value;
    })
    this.refreshSub$ = this.uiService.refresher.subscribe(e =>{
      if (e.key === 'added'){
        this.loading = true;
        this.selectedValue = e.value.id;
        this.service.find(this.selectedValue).subscribe(value => {
          this.loading = false;
          this.categoryList = value;
          this.onModalChange();
        })
      }
    })
  }

  onModalChange(){
    this.valueChanged.emit(this.selectedValue);
    this.onChangeCallback(this.selectedValue);
    this.onTouchedCallback(this.selectedValue);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(obj: any): void {
    this.selectedValue = obj;
  }
}
