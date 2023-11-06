import {Component, inject, Input, OnInit} from "@angular/core";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {nzData, PostUiService} from "./post-ui.service";
import {PostService} from "./post.service";

@Component({
  selector: 'app-post-operation',
  template: `
    <div *nzModalTitle>
      <span>Add</span>
    </div>
    <div class="modal-content">
      <form nz-form [formGroup]="frm" (ngSubmit)="onSubmit()">
        <div nz-row [nzGutter]="24">
          <div nz-col [nzSpan]="16">
            <nz-form-item>
              <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>Title</nz-form-label>
              <nz-form-control [nzSm]="20" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="title"
                ></textarea>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>Permalink</nz-form-label>
              <nz-form-control [nzSm]="20" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="permalink"
                ></textarea>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>Excerpt</nz-form-label>
              <nz-form-control [nzSm]="20" [nzXs]="24" nzErrorTip="">
                <textarea
                  rows="4"
                  nz-input
                  formControlName="excerpt"
                ></textarea>
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="8">
            <nz-form-item>
              <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>Category</nz-form-label>
              <nz-form-control [nzSm]="16" [nzXs]="24">
                <app-category-select formControlName="category"></app-category-select>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <div>
                <img src="{{imgSrc}}" alt="">
              </div>
              <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>
                Select image
              </nz-form-label>
              <nz-form-control>
                <input type="file" (change)="showPreview($event)"
                       formControlName="postImagePath" accept="*/*">
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="24">
            <nz-form-item>
              <nz-form-control [nzSm]="24" [nzXs]="24">
                  <textarea
                    rows="4"
                    nz-input
                    formControlName="content"
                    placeholder="content"
                  ></textarea>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
      </form>
    </div>
    <div *nzModalFooter>
      <div *ngIf="!this.modal.id">
        <button nz-button nzType="primary"  (click)="onSubmit()">
          <i nz-icon nzType="loading"></i>
          Save</button>
        <button nz-button nzType="default" (click)="cancel()">Cancel</button>
      </div>
      <div *ngIf="this.modal.isView">
        <a (click)="uiService.showEdit(modal.id, modal.postImageURL)" *ngIf="!loading">
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
export class PostOperationComponent implements OnInit{
  frm!: FormGroup;
  model: any;
  formStatus: string = '';
  refreshSub$: any;
  @Input() category: any;
  readonly modal: nzData = inject(NZ_MODAL_DATA);
  imgSrc: any = './assets/none-image.png';
  selectedImage: any = '';
  loading: boolean = false;
  constructor(
    private ref: NzModalRef<PostOperationComponent>,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private service: PostService,
    public uiService: PostUiService
  ) {
  }
  ngOnInit(): void {
    this.initControl();
    // let id = this.modal.id;
    // if (this.modal.isView && id != '0'){
    //   this.frm.disable();
    //   this.refreshSub$ = this.uiService.refresher.subscribe(e=>{
    //     if (e.key === 'edited'){
    //       // this.loading = true;
    //       this.service.find(id).subscribe(value => {
    //         this.model = value;
    //         this.setFormValue();
    //         // this.loading = false;
    //       });
    //     }
    //   });
    // }else {
    //   this.ref.triggerCancel();
    // }

    // if (id && id != '0'){
    //   // this.loading = true;
    //   this.service.find(id).subscribe(value =>{
    //     this.model = value;
    //     this.setFormValue();
    //     // this.loading = false;
    //   });
    // }
  }

  initControl(){
    this.frm = this.fb.group({
      category:[],
      content:[],
      createAt: new Date(),
      excerpt:[],
      isFeatured: false,
      permalink: [],
      postImagePath: [],
      status: [],
      title:[],
      views: [],
    });
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e => {
      this.imgSrc = e.target!.result;
    });
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    // console.log(this.frm.value);
    if (this.frm.valid){
      let Id = this.modal.id;
      if (Id && Id != '0' ){
        console.log("this is Edit area");
        this.formStatus = 'Edit';
        this.service.uploadImage(this.selectedImage, this.frm.value, this.formStatus, Id);
        this.imgSrc = this.selectedImage;
      }else {
        this.service.uploadImage(this.selectedImage, this.frm.value, this.formStatus, Id);
      }
      this.ref.triggerOk().then();
      this.loading = false;
      this.imgSrc = './assets/none-image.png';
    }
  }

  setFormValue(){
    this.frm.setValue({
      category: this.model.category,
      content: this.model.content,
      createAt: this.model.createAt,
      excerpt: this.model.excerpt,
      isFeatured: this.model.isFeatured,
      permalink: this.model.permalink,
      // postImagePath: this.model.postImagePath,
      status: this.model.status,
      title: this.model.title,
      views: this.model.views,
    });
  }

  cancel(){
    this.ref.triggerCancel().then();
  }

}
