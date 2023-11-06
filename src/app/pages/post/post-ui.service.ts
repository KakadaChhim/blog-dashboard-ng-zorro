import {EventEmitter, Injectable} from "@angular/core";
import {NzModalService} from "ng-zorro-antd/modal";
import {PostOperationComponent} from "./post-operation.component";
import {PostDeleteComponent} from "./post-delete.component";

export interface nzData{
  id: string;
  isView: boolean;
  postImageURL: string;
}
@Injectable({
  providedIn: "root"
})
export class PostUiService{
  refresher = new EventEmitter<{key: string, value?: any , componentId?: any}>();
  constructor(private modalService: NzModalService) {
  }
  showAdd(componentId: any = ''): void{
    this.modalService.create({
      nzContent:PostOperationComponent,
      nzData: {id: '0', isView: false},
      nzFooter:null,
      nzClosable: true,
      nzWidth: '1000px',
      nzBodyStyle: {paddingBottom: '10px'},
      nzMaskClosable:false,
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.model, componentId});
      }
    })
  }

    showEdit(id: string, postImageURL: string): void{
        this.modalService.create({
            nzContent: PostOperationComponent,
            // nzComponentParams: {id}, we are no longer use this one! use nzData instead of it.
            nzData: {id: id, isView: false, postImageURL: postImageURL},
            nzFooter: null,
            nzClosable: true,
            nzWidth: '415px',
            nzBodyStyle: {paddingBottom: '10px'},
            nzMaskClosable: false,
            nzOnOk: (e) => {
                this.refresher.emit({key: 'edited', value: e.model});
            }
        });
    }

    showDelete(id: string, postImageURL: string ): void{
        this.modalService.create({
            nzContent: PostDeleteComponent,
            // nzComponentParams: {id},
            nzData: {id: id, isView: false, postImageURL: postImageURL},
            nzClosable: true,
            nzWidth: '480px',
            nzBodyStyle: {height: '63px', padding: '0', display: 'flex', alignItems: 'center'},
            nzMaskClosable: false,
            nzOnOk: (e) => {
                // this.refresher.emit({key: 'deleted', value: e.model});
            }
        });
    }

    showView(id: string): void{
        this.modalService.create({
            nzContent: PostOperationComponent,
            nzData: {id: id, isView: true},
            nzClosable: true,
            nzWidth: '415px',
            nzBodyStyle: {paddingBottom: '10px'},
            nzMaskClosable: false,
        });
    }
}
