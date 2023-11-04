import {Component, inject, OnInit} from "@angular/core";
import {PostService} from "./post.service";
import {nzData} from "./post-ui.service";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
@Component({
    selector: 'app-post-delete',
    template: `
        <div *nzModalTitle>
            <span>Delete</span>
        </div>
        <div class="delete-body">
            <span nz-icon nzType="exclamation-circle" nzTheme="outline"></span>
            <span>Do you Want to delete these items?</span>
        </div>
        <div *nzModalFooter>
            <button nz-button nzDanger nzType="primary" (click)="onSubmit()">
                <i *ngIf="loading" nz-icon nzType="loading"></i>
                {{ "Delete" }}
            </button>
            <button nz-button nzType="default" (click)="cancel()">
                {{ "Cancel" }}
            </button>
        </div>
    `
})
export class PostDeleteComponent implements OnInit{
  loading: boolean = false;
  readonly modal: nzData = inject(NZ_MODAL_DATA);

  constructor(
    private service: PostService,
    private ref: NzModalRef<PostDeleteComponent>
  ) {
  }
    ngOnInit(): void {
        console.log(this.modal.id);
        // if (this.modal.id){
        //   this.loading = true;
        //   this.service.deleteData(this.modal.id);
        //   this.loading = false;
        // }
    }

    onSubmit(){
        if (this.modal.id){
            this.service.deleteData(this.modal.id);
            this.ref.triggerOk();
        }
    }
    cancel(){
        this.ref.triggerCancel().then();
    }


}
