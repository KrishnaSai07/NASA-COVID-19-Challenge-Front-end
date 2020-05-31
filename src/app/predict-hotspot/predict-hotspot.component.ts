import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Chart} from 'chart.js';
import { DataSetService } from '../data-set.service';
import { StateInfo } from '../model/stateInfo';

@Component({
  selector: 'app-predict-hotspot',
  templateUrl: './predict-hotspot.component.html',
  styleUrls: ['./predict-hotspot.component.css']
})
export class PredictHotspotComponent implements OnInit {

  chart;

  place:string;

  category: string = 'state';

  populationDensity: number ;

  urbanisation: number ;

  literacy:number ;

  state: string = 'Andhra Pradesh';

  totalData: StateInfo[]=[];

  showChart: boolean = false;

  message: string;

  statesInfo:string []=[];

  resultant: string;

  constructor(private dataSetService: DataSetService) { }

  ngOnInit() {
      this.dataSetService.getAllStatesInfo().subscribe((res) =>{
        console.log(res);
        res.forEach((d) =>{
          this.totalData.push(d);
        });
        console.log(this.totalData);
        this.totalData.forEach((d) =>{
          this.statesInfo.push(d.state);
        })
      })
  }

  optionChanged(value)
  {
    this.state = value;
    console.log(this.state);
  }

  selectOptionState(value)
  {
    console.log(value);
    this.category = value;
    console.log(this.category);
  }
  formData(e)
  {
    let score= 0;
    let xdata =[];
    let ydata=[];
    e.preventDefault();
    console.log(this.populationDensity);
    console.log(this.urbanisation);
    console.log(this.literacy);

    if(this.category == 'state')
    {

    if(this.populationDensity!=null && this.urbanisation!=null && this.literacy!=null && this.place !=null)
    {
      this.message = '';
      if(this.populationDensity >= 383)
      {
        score = score + 4;
      }
      else
      {
        score = score + 0;
      }
      if(this.urbanisation >= 33)
      {
        score = score +2;
      }
      else
      {
        score = score+0;
      }
      if(this.literacy >= 74)
      {
        score = score +0;
      }
      else
      {
        score = score + 1;
      }
     xdata = this.checkForStage(score);
     ydata = this.checkForColor(score);

     this.adjustChart(xdata,ydata);


    }
    else
    {
      this.message = "Some fields are empty.Please enter all the fields"
    }
  }
  else
  {
    let pd;
    let litPercent;
    let urbanPercent;
    this.totalData.forEach((d) =>{
      if(d.state == this.state)
      {
        pd = d.density;
        litPercent = d.literacyPercent;
        urbanPercent = d.urbanPercent;
      }
    });
    console.log(pd,litPercent,urbanPercent);
    if(this.populationDensity!=null && this.urbanisation!=null && this.literacy!=null && this.state!=null && this.place!=null)
    {
      this.message = '';
      if(this.populationDensity >= pd)
      {
        score = score + 4;
      }
      else
      {
        score = score + 0;
      }
      if(this.urbanisation >= urbanPercent)
      {
        score = score +2;
      }
      else
      {
        score = score+0;
      }
      if(this.literacy >= litPercent)
      {
        score = score +0;
      }
      else
      {
        score = score + 1;
      }
     xdata = this.checkForStage(score);
     ydata = this.checkForColor(score);
      console.log(score);
     this.adjustChart(xdata,ydata);
    }
    else
    {
      this.message = "Some fields are empty.Please enter all the fields"
    }
  }
   
  }

  checkForStage(val)
  {
    if(val ==7 || val ==6)
    {
      return [80,20];
    }
    else if(val == 5 || val == 4)
    {
      return [60,40];
    }
    else if(val == 3 || val == 2)
    {
      return [40,60];
    }
    else {
      return [20,80];
    }
  }

  checkForColor(val)
  {
    if(val ==7 || val ==6)
    {
      return ["red","white"];
    }
    else if(val == 5 || val == 4)
    {
      return ["orange","white"];
    }
    else if(val == 3 || val == 2)
    {
      return ["yellow","white"];
    }
    else {
      return ["green","White"];
    }
  }

  formDataReset()
  {
    if(this.state != undefined)
    {
      console.log(this.state);
      this.state=null;
    }
    this.populationDensity =null;
    this.urbanisation = null;
    this.literacy = null; 
    if(this.chart!=undefined)
    {
    this.chart.destroy();
    }
    this.message = '';
    this.showChart = false;
    this.place = null;
  }

  adjustChart(xdata,ydata)
  {
    if(xdata!=undefined)
    {
      if(xdata[xdata.length -2 ] == 80)
      {
        this.resultant = " is definitely prime hotspot";
      }
      else if(xdata[xdata.length -2 ] == 60)
      {
        this.resultant = " has a good chance to be a hotspot"
      }
      else if(xdata[xdata.length -2 ] == 40)
      {
        this.resultant = " has a less chance to be a hotspot"
      }
      else if(xdata[xdata.length -2] == 20)
      {
        this.resultant = " is very unlikely to be a hotspot"
      }

    }
    this.showChart =true;
    if(this.chart!=undefined)
    {
    this.chart.destroy();
    }
    this.chart = new Chart('canvas', {  

      type: 'doughnut',  

      data: {  

        labels: ['Hotspot Predictor'],  

        datasets: [  

          {  

            data: xdata,  

            borderColor: '#3cba9f',  

            backgroundColor: ydata,  

            fill: true  

          }  

        ]  

      },  

      options: {  

        legend: {  

          display: true  

        },  

        scales: {  

          xAxes: [{  

            display: false  

          }],  

          yAxes: [{  

            display: false  

          }],  

        }  

      }  

    });
  }

}
