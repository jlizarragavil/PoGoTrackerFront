import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XpLogComponent } from './xp-log/xp-log.component';
import { CatchingCalculatorComponent } from './catching-calculator/catching-calculator.component';
import { LoginComponent } from './login/login.component';
import { GBLComponent } from './gbl/gbl.component';
import { GblGameComponent } from './gbl-game/gbl-game.component';
import { RegisterComponent } from './register/register.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'xp-tracker', component: XpLogComponent },
  { path: 'catching-calculator', component: CatchingCalculatorComponent },
  { path: 'gbl', component: GBLComponent },
  { path: 'gbl-game', component: GblGameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'battle-log', component: BattleLogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
