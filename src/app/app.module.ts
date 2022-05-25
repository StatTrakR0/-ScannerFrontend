import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { RouterModule } from '@angular/router';
import { CarouselPageComponent } from './carousel-page/carousel-page.component';

const routes = [
  {path: '', component:FileUploadComponent},
  {path: '3DModel', component: ModelPageComponent},
  {path: 'carousel', component: CarouselPageComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ModelPageComponent,
    CarouselPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
