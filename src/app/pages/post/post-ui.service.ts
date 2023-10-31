import {EventEmitter, Injectable} from "@angular/core";
import {NzModalService} from "ng-zorro-antd/modal";
import {PostOperationComponent} from "./post-operation.component";
export interface nzData{
  id: string;
  isView: boolean;
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
      nzWidth: '900px',
      nzBodyStyle: {paddingBottom: '10px'},
      nzMaskClosable:false,
      nzOnOk: (e) => {
        // this.refresher.emit({key: 'added', value: e.model, componentId});
      }
    })
  }
}
