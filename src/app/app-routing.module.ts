import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UrbanVsRuralComponent } from './urban-vs-rural/urban-vs-rural.component';
import { EffectOfMigrationComponent } from './effect-of-migration/effect-of-migration.component';
import { WeatherEventsComponent } from './weather-events/weather-events.component';
import { HomeComponent } from './home/home.component';
import { RuralClusterComponent } from './rural-cluster/rural-cluster.component';
import { PredictHotspotComponent } from './predict-hotspot/predict-hotspot.component';

const routes: Routes = [
  {path:  "", pathMatch:"full",redirectTo:"home"},
  { path: 'migration', component: EffectOfMigrationComponent },
  {path: 'urban',component: UrbanVsRuralComponent},
  {path: 'rural',component: RuralClusterComponent},
  { path: 'weatherImpact', component: WeatherEventsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'predictor', component: PredictHotspotComponent }
];

@NgModule({
  
    imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
