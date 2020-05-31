import { Component, OnInit } from '@angular/core';
import { DataSetService } from '../data-set.service';
import { DisasterDataSet } from '../model/DisasterDataSet';
import {Chart} from 'chart.js';
import { IndiaDataSet } from '../model/IndiaDataSet';

@Component({
  selector: 'app-rural-cluster',
  templateUrl: './rural-cluster.component.html',
  styleUrls: ['./rural-cluster.component.css']
})
export class RuralClusterComponent implements OnInit {

  states:string[]=['Rajasthan','Bihar','Odisha','Jharkhand']

  category:string[]=['Density','Literacy Rate','Total Cases'];

  selectCategory: string = 'Density';

  total_data: DisasterDataSet[]=[];

  total_India_data : IndiaDataSet[]=[];

  temp_India_data: IndiaDataSet[]=[];

  ruralPercent:number = 60;

  term :string = '<='

  total_chart;

  other_total_chart;
  // chosen_times=[];
  // total_cases=[];

  currentState:string= 'Rajasthan';

  constructor(private dataSetService: DataSetService) { }

  ngOnInit() {

    let chosen_times=[];
   let  total_cases=[];

   let density_data=[];
   let total_areas=[];
   let literacy_data =[];
   let areas_data = [];

    this.dataSetService.getAllDiasaterDataSet().subscribe((data) =>{
    console.log(data);
    data.forEach((d) =>{
      this.total_data.push(d);
      if(d.place == 'Rajasthan')
      {
        chosen_times.push(d.timelineDate);
        total_cases.push(d.totalCases);
      }
      
    });

    

    this.adjustCharts(chosen_times,total_cases);
    });

    this.dataSetService.getAllIndiaDataSet().subscribe((data) =>{
      console.log(data);
      data.forEach((d) =>{
        if(d.ruralPercent >= this.ruralPercent)
        {
          this.total_India_data.push(d);
          if(this.selectCategory == 'Density')
          {
            density_data.push(d.density);
            total_areas.push(d.areaName);
            
          }
        }
      });
      console.log(density_data);
    console.log(total_areas);
    this.adjustChartsLiteracy(density_data,total_areas);
    })

  }

  setRural(value)
  {
    this.temp_India_data =[];
    console.log(value);
    this.ruralPercent = value;
    let new_data = [];
    let xdata=[];
    let ydata=[];
    this.total_India_data.forEach((d) =>{
        if(d.ruralPercent >= value)
        {
          this.temp_India_data.push(d);
        }
    });
    this.temp_India_data.forEach((d) =>{
      if(this.selectCategory == 'Density')
      {
        xdata.push(d.density);
        ydata.push(d.areaName);
      }
      else if(this.selectCategory == 'Literacy Rate')
      {
        xdata.push(d.ruralLitPercent);
        ydata.push(d.areaName);
      }
      else if( this.selectCategory == 'Total Cases')
      {
        xdata.push(d.totalCases);
        ydata.push(d.areaName);
      }
    });
    this.adjustChartsLiteracy(xdata,ydata);
    
  }
  optionChangedFor(value)
  {
    console.log(value);
    this.selectCategory = value;
    if(this.temp_India_data.length <1)
    {
      this.temp_India_data = this.total_India_data;
    }
    let ydata=[];
    let xdata=[];
    this.temp_India_data.forEach((d) =>{
      if(value == 'Density')
      {
        xdata.push(d.density);
        ydata.push(d.areaName);
      }
      else if(value == 'Literacy Rate')
      {
        xdata.push(d.ruralLitPercent);
        ydata.push(d.areaName);
      }
      else if( value == 'Total Cases')
      {
        xdata.push(d.totalCases);
        ydata.push(d.areaName);
      }
    });
    this.adjustChartsLiteracy(xdata,ydata);
  }
  optionChanged(value)
  {
    console.log(value);
    let chosen_times=[];
    let total_cases=[];
    this.total_data.forEach((cas) =>{
      if(cas.place == value)
      {
        chosen_times.push(cas.timelineDate);
        total_cases.push(cas.totalCases);

      }
    });
    this.adjustCharts(chosen_times,total_cases);
  }

  adjustCharts(time,cases)
  {
    if(this.total_chart !=undefined)
    {
      this.total_chart.destroy();
    }
   let time1= time;
   let cases2= cases;
    this.total_chart = new Chart('commonCanvas',{
      type:'line',
      data: {
        labels:  time1,
        datasets: [
          {
            data:  cases2,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options:{
        legend: {
          display :false
        },
        scales: {
          xAxes:[{
            display:true
          }],
          yAxes :[{
            display:true
          }]
        }
      }
    })
  }

  adjustChartsLiteracy(data1,places)
  {
    if(this.other_total_chart !=undefined)
    {
      this.other_total_chart.destroy();
    }
  //  let time1= time;
  //  let cases2= cases;
    this.other_total_chart = new Chart('commonLit',{
      type:'line',
      data: {
        labels:  places,
        datasets: [
          {
            data:  data1,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options:{
        legend: {
          display :false
        },
        scales: {
          xAxes:[{
            display:true
          }],
          yAxes :[{
            display:true
          //   ticks: {
          //     max: 100,
          //     min: 0,
          //     stepSize: 10
          // }
          }]
        }
      }
    })
  }

}
