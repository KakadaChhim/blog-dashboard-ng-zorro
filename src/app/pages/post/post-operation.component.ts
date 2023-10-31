import {Component, OnInit} from "@angular/core";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-post-operation',
  template: `
    <div *nzModalTitle>
      <span>Add</span>
    </div>
    <div class="modal-content">
      <form [formGroup]="frm">
        <div nz-row [nzGutter]="24">
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label>Title</nz-form-label>
              <nz-form-control>
                <input nz-input formControlName="title">
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
      </form>
    </div>
  `
})
export class PostOperationComponent implements OnInit{
  frm!: FormGroup;
  constructor(
    private ref: NzModalRef<PostOperationComponent>
  ) {
  }
  ngOnInit(): void {
  }

}
