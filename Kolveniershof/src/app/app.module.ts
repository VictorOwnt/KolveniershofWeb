import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from "./components/nav/nav.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule , MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { FooterComponent } from './components/footer/footer.component';
import {MatButtonModule, MatButton} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
