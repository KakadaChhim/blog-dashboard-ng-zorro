import {Component, OnInit} from "@angular/core";
import {CategoryUiService} from "./category-ui.service";
import {Category, CategoryService, Model} from "./category.service";

@Component({
  selector: 'app-category',
  template: `
    <nz-layout>
      <nz-header>
        <nz-space>
          <button nz-button nzType="primary" (click)="uiService.showAdd()">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Add</button>
        </nz-space>
      </nz-header>
      <nz-content>
        <nz-table
          nzSize="small"
          nzShowSizeChanger
          #fixedTable
          nzTableLayout="fixed"
          [nzData]="list"
          [nzNoResult]="noResult"
          [nzFrontPagination]="false"
        >
          <ng-template #noResult>
            Not Data!
          </ng-template>
          <thead>
          <tr>
            <th class="col-header" nzWidth="45px">#</th>
            <th nzWidth="16%"  nzColumnKey="code">{{ 'Code'  }}</th>
            <th nzColumnKey="name">{{ 'Name'  }}</th>
            <th nzWidth="165px"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let data of list; let i = index">
            <td nzEllipsis>
              {{ i+1 }}
            </td>
            <td nzEllipsis>
              <a (click)="uiService.showView(data.id!)">{{data.id}}</a>
            </td>
            <td nzEllipsis>
              <span>{{data.data.category}}</span>
            </td>
            <td >
              <nz-space [nzSplit]="spaceSplit">
                <ng-template #spaceSplit>
                  <nz-divider nzType="vertical"></nz-divider>
                </ng-template>
                <ng-container>
                  <a *nzSpaceItem (click)="uiService.showEdit(data.id || '0')" nz-typography >
                    <i nz-icon nzType="edit" nzTheme="outline" style="padding-right: 5px"></i>
                    {{'Edit' }}
                  </a>
                </ng-container>
                <ng-container>
                  <a *nzSpaceItem (click)="uiService.showDelete(data.id || '0')" nz-typography style="color: #F31313" >
                    <i nz-icon nzType="delete" nzTheme="outline" style="padding-right: 5px"></i>
                    {{'Delete' }}
                  </a>
                </ng-container>
              </nz-space>
            </td>
          </tr>
          </tbody>
        </nz-table>
      </nz-content>
    </nz-layout>
  `,
  styles: [`
    nz-header{
      display: flex;
      justify-content: end;
      align-items: center;
      background-color: white;
      padding: 0;
    }
  `]
})
export class CategoryListComponent implements OnInit{
  constructor(
    public uiService: CategoryUiService,
    private service: CategoryService
    ) {
  }

  list: any;
  ngOnInit(): void {
    this.service.loadData().subscribe(value => {
      // console.log(value);
      this.list = value;
      // this.modalArray = value;
    })
  }

}
