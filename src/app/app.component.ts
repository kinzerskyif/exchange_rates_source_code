import { Component } from '@angular/core';
import { RatesService } from './rates.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart = [];
  
  constructor(private _rates: RatesService) {}


  ngOnInit() {
    this._rates.dailyRates ()
      .subscribe(res => {
        
        //console.log(res.response.cex.pairChart['BTC_EUR'].map(res => res.name));
        //console.log(res.response);
        
        let valuesBTC_USD  = res['response'].cex.pairChart['BTC_USD'].map(res => res.value);
        let valuesBTC_EUR  = res['response'].cex.pairChart['BTC_EUR'].map(res => res.value);
        let values_ZEC_BTC  = res['response'].cex.pairChart['ZEC_GBP'].map(res => res.value);
        let times = res['response'].cex.pairChart['BTC_EUR'].map(res => res.name);
        
        let timeDates = []
        times.forEach((res) => {
          let jsdate = new Date(res)
          timeDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        console.log(timeDates)

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: timeDates,
            datasets: [
              { 
                data: valuesBTC_USD,
                borderColor: "#3cba9f",
                fill: false,
                label: 'BTC_USD',
                lineTension: 0
              },
              { 
                data: valuesBTC_EUR,
                borderColor: "#ffcc00",
                fill: false,
                label: 'BTC_EUR',
                lineTension: 0
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      })
  }



}
