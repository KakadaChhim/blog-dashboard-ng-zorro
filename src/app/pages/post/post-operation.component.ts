import {Component, inject, OnInit} from "@angular/core";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {FormGroup} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {nzData} from "./post-ui.service";

@Component({
  selector: 'app-post-operation',
  template: `
    <div *nzModalTitle>
      <span>Add</span>
    </div>
    <div class="modal-content">
      <form nz-form>
        <nz-form-item>
          <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired>Title</nz-form-label>
          <nz-form-control [nzSm]="19" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="title"
                ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired>Permalink</nz-form-label>
          <nz-form-control [nzSm]="19" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="permalink"
                ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired>Excerpt</nz-form-label>
          <nz-form-control [nzSm]="19" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="excerpt"
                ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired>Category</nz-form-label>
          <nz-form-control [nzSm]="19" [nzXs]="24">
            <app-category-select formControlName="categoryId"></app-category-select>
          </nz-form-control>
        </nz-form-item>

      </form>
    </div>
    <div *nzModalFooter>
      <div>
        <button nz-button nzType="primary"  (click)="onSubmit()">
          <i nz-icon nzType="loading"></i>
          Save</button>
        <button nz-button nzType="default" (click)="cancel()">Cancel</button>
      </div>
<!--      <div *ngIf="this.modal.isView">-->
<!--        <a (click)="uiService.showEdit(modal.id || '0')" *ngIf="!loading">-->
<!--          <i nz-icon nzType="edit" nzTheme="outline"></i>-->
<!--          <span class="action-text"> {{ "Edit"  }}</span>-->
<!--        </a>-->
<!--        <a nz-typography (click)="cancel()" style="color: gray;">-->
<!--          <i nz-icon nzType="close" nzTheme="outline"></i>-->
<!--          <span class="action-text"> {{ "Close" }}</span>-->
<!--        </a>-->
<!--      </div>-->
    </div>
  `
})
export class PostOperationComponent implements OnInit{
  frm!: FormGroup;
  model: any;
  readonly modal: nzData = inject(NZ_MODAL_DATA);
  imgSrc: any = './assets/none-image.png';
  constructor(
    private ref: NzModalRef<PostOperationComponent>,
    private msg: NzMessageService
  ) {
  }
  ngOnInit(): void {
  }

  onSubmit(){

  }

  cancel(){

  }

}
