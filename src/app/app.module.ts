import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { AppRoutingModule } from './app-routing.module';
// import { WINDOW } from './auth/services/window.token';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // { provide: WINDOW, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
