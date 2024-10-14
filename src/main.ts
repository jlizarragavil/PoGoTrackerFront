import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
