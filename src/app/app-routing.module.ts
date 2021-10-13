import { BlogComponent } from './blog/blog.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
   {
      path: '', 
       component: HomeComponent 
   },
   {
    path: 'admin', 
     component: AdminComponent 
  },
  {
    path: 'blog/:id', 
     component: BlogComponent 
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
