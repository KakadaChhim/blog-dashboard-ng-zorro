import {Component, OnInit} from "@angular/core";
import {PostService} from "./post.service";
import {PostUiService} from "./post-ui.service";

@Component({
  selector: 'app-post-list',
  template: `
    <nz-layout>
      <nz-header>
        <nz-space>
          <button nz-button nzType="primary" (click)="uiService.showAdd()">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Add
          </button>
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
<!--            <th nzWidth="16%"  nzColumnKey="code">{{ 'Code'  }}</th>-->
            <th nzWidth="12%" nzColumnKey="name">{{ 'POST IMAGE'  }}</th>
            <th nzColumnKey="name">{{ 'TITLE'  }}</th>
            <th nzColumnKey="name">{{ 'EXCERPT'  }}</th>
            <th nzColumnKey="name">{{ 'CATEGORY'  }}</th>
            <th nzColumnKey="name">{{ 'DATE'  }}</th>
            <th nzColumnKey="name">{{ 'FEATURE'  }}</th>
            <th nzWidth="165px"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let data of list; let i = index">
            <td nzEllipsis>
              {{i+1}}
            </td>
<!--            <td nzEllipsis>-->
<!--              <a>Xtes0987</a>-->
<!--            </td>-->
            <td nzEllipsis>
              <img src="{{data.data.postImagePath}}" alt="">
            </td>
            <td nzEllipsis>
              <span>{{data.data.title}}</span>
            </td>
            <td nzEllipsis>
              <span>{{data.data.excerpt}}</span>
            </td>
            <td nzEllipsis>
              <span>{{data.data.category.data.category}}</span>
            </td>
            <td nzEllipsis>
              <span>{{data.data.createAt.toMillis() | date}}</span>
            </td>
            <td nzEllipsis>
              <span>FEATURE</span>
            </td>
            <td >
              <nz-space [nzSplit]="spaceSplit">
                <ng-template #spaceSplit>
                  <nz-divider nzType="vertical"></nz-divider>
                </ng-template>
                <ng-container>
                  <a *nzSpaceItem  nz-typography >
                    <i nz-icon nzType="edit" nzTheme="outline" style="padding-right: 5px"></i>
                    {{'Edit' }}
                  </a>
                </ng-container>
                <ng-container>
                  <a *nzSpaceItem nz-typography style="color: #F31313" (click)="uiService.showDelete(data.id || '0')">
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
    img{
      width: 16px;
      height: 16px;
    }
  `]
})
export class PostListComponent implements OnInit{

  list: any;
  constructor(
    private service: PostService,
    public uiService: PostUiService,
  ) {
  }
  ngOnInit(): void {
    this.service.loadData().subscribe(value => {
      // console.log(value)
      this.list = value;
      console.log(this.list)
    })
  }

}
