import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./pages/page.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryListComponent} from "./pages/category/category-list.component";
import {PostListComponent} from "./pages/post/post-list.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '', component: PageComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'category', component: CategoryListComponent},
      {path: 'post', component: PostListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
