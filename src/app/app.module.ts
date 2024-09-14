import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { XpLogComponent } from './xp-log/xp-log.component';
import { GBLComponent } from './gbl/gbl.component';
import { CatchingCalculatorComponent } from './catching-calculator/catching-calculator.component';
import { LoginComponent } from './login/login.component';
import { GblGameComponent } from './gbl-game/gbl-game.component';
import { SidebarModule } from 'primeng/sidebar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule  } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    XpLogComponent,
    CatchingCalculatorComponent,
    LoginComponent,
    GBLComponent,
    GblGameComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    ChartModule,
    CardModule,
    AutoCompleteModule,
    PanelModule,
    DialogModule,
    MenubarModule,
    ClipboardModule,
    BrowserModule,
    RouterModule, // No necesitas importar RouterModule.forRoot([]) aquí si ya lo has hecho en tu AppRoutingModule
    AppRoutingModule, // Importa y agrega tu AppRoutingModule aquí
    SidebarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    TableModule ,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    PanelMenuModule,
    ScrollTopModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule
  ],
  providers: [PrimeIcons,MessageService ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
