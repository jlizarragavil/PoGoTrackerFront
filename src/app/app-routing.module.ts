import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XpLogComponent } from './xp-log/xp-log.component';
import { CatchingCalculatorComponent } from './catching-calculator/catching-calculator.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'xp-tracker', component: XpLogComponent },
  { path: 'catching-calculator', component: CatchingCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
