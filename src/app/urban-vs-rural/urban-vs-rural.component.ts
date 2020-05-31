import { Component, OnInit } from '@angular/core';
import { DataSetService } from '../data-set.service';
import {Chart} from 'chart.js';
import { UnitedStatesDataSets } from '../model/UnitedStatesDataSet';

@Component({
  selector: 'app-urban-vs-rural',
  templateUrl: './urban-vs-rural.component.html',
  styleUrls: ['./urban-vs-rural.component.css']
})
export class UrbanVsRuralComponent implements OnInit {

  category_left: string[]=['Public Transport','Carpool','Drive Alone','Walked'];

  chosenCategory: string = 'Public Transport';

  temp_category_left: UnitedStatesDataSets[]=[];

  total_data_left : UnitedStatesDataSets[]=[];

  percent_left:number=1;
  
  total_chart;

  info:string ='<=';

  constructor(private dataSetService: DataSetService) { }

  ngOnInit() {
      this.dataSetService.getAllIndiaDataSet().subscribe(res =>{
        console.log(res);
      })

      let xdata =[];
      let ydata = [];
      this.dataSetService.getAllUnitedStatesDataSet().subscribe(res =>{
        console.log(res);
        res.forEach((d) =>{
          this.total_data_left.push(d);
          if(d.publicTransport <= this.percent_left)
          {
            
              xdata.push(d.totalCases);
              ydata.push(d.countyName);
          }
        });
        console.log(xdata);
        console.log(ydata);
        this.adjustCharts(xdata,ydata);
       
      });
      
  }

  optionChangedFor(value)
  {
    this.temp_category_left = this.total_data_left; 
    this.chosenCategory = value;  
    console.log(value);
    let ydata=[];
    let xdata=[];
    this.temp_category_left.forEach((d) =>{
      if(value == 'Public Transport')
      {
        if(d.publicTransport <= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '<=';
      }
      else if(value == 'Carpool')
      {
        if(d.carpool <= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '<=';
      }
      else if(value == 'Drive Alone')
      {
        if(d.droveAlone >= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '>=';
      }
      else if(value == 'Walked')
      {
        if(d.walked >= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '>=';
      }
    });
    this.adjustCharts(xdata,ydata);
  }

  setRural(value)
  {
    let xdata=[];
    let ydata=[];
    this.percent_left = value;
    // this.temp_category_left = [];
    console.log(value);
    // this.total_data_left.forEach((d) =>{
    //   if(d.publicTransport >= value)
    //   {
    //     this.temp_category_left.push(d);
    //   }
    // });

    this.total_data_left.forEach((d) =>{
      if(this.chosenCategory == 'Public Transport')
      {
        if(d.publicTransport <= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '<=';
      }
      else if(this.chosenCategory == 'Carpool')
      {
        if(d.carpool <= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '<=';
      }
      else if(this.chosenCategory == 'Drive Alone')
      {
        if(d.droveAlone >= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '>=';
      }
      else if(this.chosenCategory == 'Walked')
      {
        if(d.walked >= this.percent_left)
        {
        xdata.push(d.totalCases);
        ydata.push(d.countyName);
        }
        this.info = '>=';
      }

          
    });

    this.adjustCharts(xdata,ydata);
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
        labels:  cases2,
        datasets: [
          {
            data:  time1,
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
        },
        maintainAspectRatio: true
      }
    })
  }


}
