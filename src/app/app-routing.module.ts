import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XpLogComponent } from './xp-log/xp-log.component';
import { CatchingCalculatorComponent } from './catching-calculator/catching-calculator.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'xp-tracker', component: XpLogComponent },
  { path: 'catching-calculator', component: CatchingCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
