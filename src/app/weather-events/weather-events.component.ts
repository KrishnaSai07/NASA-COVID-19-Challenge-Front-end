import { Component, OnInit } from '@angular/core';
import { DataSetService } from '../data-set.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-weather-events',
  templateUrl: './weather-events.component.html',
  styleUrls: ['./weather-events.component.css']
})
export class WeatherEventsComponent implements OnInit {

   bengal_chart=[];
   croatia_chart=[];

  constructor(private dataSetService: DataSetService) { }

  ngOnInit() {
    
    let bengal_cases =[];
    let bengal_dates = [];
    let croatia_cases =[];
    let croatia_dates = [];

    this.dataSetService.getAllDiasaterDataSet().subscribe((data) =>{
      console.log(data);
      data.forEach((d) =>{
        if(d.place == 'Bengal')
        {
          bengal_cases.push(d.totalCases);
          bengal_dates.push(d.timelineDate);
        }
        else if(d.place == 'Croatia')
        {
          croatia_cases.push(d.totalCases);
          croatia_dates.push(d.timelineDate);
        }
      })
      this.bengal_chart = new Chart('bengalCanvas',{
        type:'line',
        data: {
          labels: bengal_dates,
          datasets: [
            {
              data: bengal_cases,
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

      this.croatia_chart= new Chart('croatiaCanvas',{
        type:'line',
        data: {
          labels: croatia_dates,
          datasets: [
            {
              data: croatia_cases,
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

    })
  }

}
