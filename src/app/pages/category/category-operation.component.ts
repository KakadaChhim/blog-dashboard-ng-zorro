import {Component, inject, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {CategoryUiService, nzData} from "./category-ui.service";
import {Category, CategoryService, Model} from "./category.service";

@Component({
  selector: 'app-category-operation',
  template: `
    <div *nzModalTitle>
      <span>Add</span>
    </div>
    <div class="modal-content">
      <form nz-form [formGroup]="frm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>{{
            "Name"
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
            <input nz-input formControlName="category" />
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
    <div *nzModalFooter>
      <div *ngIf="!this.modal.isView">
        <button nz-button nzType="primary" [disabled]="!frm.valid || loading" (click)="onSubmit()">
          <i *ngIf="loading" nz-icon nzType="loading"></i>
          Save</button>
        <button nz-button nzType="default" (click)="cancel()">Cancel</button>
      </div>
      <div *ngIf="this.modal.isView">
        <a (click)="uiService.showEdit(modal.id || '0')" *ngIf="!loading">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
          <span class="action-text"> {{ "Edit"  }}</span>
        </a>
        <a nz-typography (click)="cancel()" style="color: gray;">
          <i nz-icon nzType="close" nzTheme="outline"></i>
          <span class="action-text"> {{ "Close" }}</span>
        </a>
      </div>
    </div>
  `
})
export class CategoryOperationComponent implements OnInit{
  frm!: FormGroup;
  model: any;
  refreshSub$: any;
  loading: boolean = false;
  readonly modal: nzData = inject(NZ_MODAL_DATA);
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<CategoryOperationComponent>,
    private service: CategoryService,
    public uiService: CategoryUiService
              ) {
  }
  ngOnInit(): void {
    // console.log(this.modal.id);
    this.initControl();
    let id = this.modal.id;
    if (this.modal.isView && id != '0'){
      this.frm.disable();
      this.refreshSub$ = this.uiService.refresher.subscribe(e=>{
        if (e.key === 'edited'){
          this.loading = true;
          this.service.find(this.modal.id).subscribe((results: any) => {
            this.model = results;
            this.setFormValue();
            this.loading = false;
          }, (error: any) => {
            console.log(error);
          });
        }else {
          this.ref.triggerCancel();
        }
      })
    }

    if (id && id != '0') {
      // console.log("this is edit area");
      this.loading = true;
      this.service.find(id).subscribe((results: any) => {
        // console.log(results);
        this.model = results;
        // console.log(this.model);
        this.setFormValue();
        this.loading = false;
      });
    }
  }

  initControl(){
    this.frm = this.fb.group({
      category: [null]
    })
  }

  onSubmit(){
    if (this.frm.valid){
      let id = this.modal.id;
      if (id && id != '0'){
        // console.log("Edit Data!");
        this.service.updateData(id, this.frm.value);
      }else {
        // console.log("Add New Category!");
        this.loading = true;
        this.service.Add(this.frm.value);
        // console.log(this.frm.value);
      }
      this.ref.triggerOk().then();
      this.loading = false;
    }
  }

  cancel(){
    this.ref.triggerCancel().then();
  }

  setFormValue(){
    this.frm.setValue({
      category: this.model.category
    })
  }
}
