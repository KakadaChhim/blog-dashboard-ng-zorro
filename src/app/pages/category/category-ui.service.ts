import {EventEmitter, Injectable} from "@angular/core";
import {NzModalService} from "ng-zorro-antd/modal";
import {CategoryOperationComponent} from "./category-operation.component";
import {CategoryDeleteComponent} from "./category-delete.component";
export interface nzData{
  id: string;
  isView: boolean;
}
@Injectable({
  providedIn: "root"
})
export class CategoryUiService{

  refresher = new EventEmitter<{key: string, value?: any , componentId?: any}>();
  constructor(private modalService: NzModalService) {
  }
  showAdd(componentId: any = ''): void{
    this.modalService.create({
      nzContent:CategoryOperationComponent,
      nzData: {id: '0', isView: false},
      nzFooter:null,
      nzClosable: true,
      nzWidth: '415px',
      nzBodyStyle: {paddingBottom: '10px'},
      nzMaskClosable:false,
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.model, componentId});
      }
    })
  }

  showEdit(id: string): void{
    this.modalService.create({
      nzContent: CategoryOperationComponent,
      // nzComponentParams: {id}, we are no longer use this one! use nzData instead of it.
      nzData: {id: id, isView: false},
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

  showDelete(id: string ): void{
    this.modalService.create({
      nzContent: CategoryDeleteComponent,
      // nzComponentParams: {id},
      nzData: {id: id, isView: false},
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
      nzContent: CategoryOperationComponent,
      nzData: {id: id, isView: true},
      nzClosable: true,
      nzWidth: '415px',
      nzBodyStyle: {paddingBottom: '10px'},
      nzMaskClosable: false,
    });
  }
}
