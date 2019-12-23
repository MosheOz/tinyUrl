import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Page404Component } from './page404/page404.component';


const routes: Routes = [
  { path: "home", component: MainComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
