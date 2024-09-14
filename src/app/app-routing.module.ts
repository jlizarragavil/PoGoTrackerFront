import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XpLogComponent } from './xp-log/xp-log.component';
import { CatchingCalculatorComponent } from './catching-calculator/catching-calculator.component';
import { LoginComponent } from './login/login.component';
import { GBLComponent } from './gbl/gbl.component';
import { GblGameComponent } from './gbl-game/gbl-game.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'xp-tracker', component: XpLogComponent },
  { path: 'catching-calculator', component: CatchingCalculatorComponent },
  { path: 'gbl', component: GBLComponent },
  { path: 'gbl-game', component: GblGameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
