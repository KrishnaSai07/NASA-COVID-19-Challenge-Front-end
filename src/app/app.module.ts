import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { UrbanVsRuralComponent } from './urban-vs-rural/urban-vs-rural.component';
import { EffectOfMigrationComponent } from './effect-of-migration/effect-of-migration.component';
import { WeatherEventsComponent } from './weather-events/weather-events.component';
import { HomeComponent } from './home/home.component';
import { DataSetService } from './data-set.service';
import { RuralClusterComponent } from './rural-cluster/rural-cluster.component';
import { PredictHotspotComponent } from './predict-hotspot/predict-hotspot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UrbanVsRuralComponent,
    EffectOfMigrationComponent,
    WeatherEventsComponent,
    HomeComponent,
    RuralClusterComponent,
    PredictHotspotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
