import {Component} from "@angular/core";

@Component({
  selector: 'app-category',
  template: `
    <nz-layout>
      <nz-header>
        <nz-space>
          <button nz-button nzType="primary" >
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Add</button>
        </nz-space>
      </nz-header>
      <nz-content>
        Content
      </nz-content>
    </nz-layout>
  `,
  styles: [`
    nz-header{
      display: flex;
      justify-content: end;
      align-items: center;
    }
  `]
})
export class CategoryComponent{

}
