import { Component, OnInit } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { Month } from 'src/app/common/Month';
import { HttpClient } from '@angular/common/http';
import { MonthEN } from 'src/app/common/MonthEN';

@Component({
  selector: 'app-visits-count',
  templateUrl: './visits-count.component.html',
  styleUrls: ['./visits-count.component.scss']
})
export class VisitsCountComponent implements OnInit {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/VisitCount';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');

    if (this.lang == 'GEO') {
      this.country = "ყველა"
    }
    else{
      this.country = "Total"
    }
  }

  lang: any;

  ngOnInit(): void {

    this.getCountryes();
    
    this.getYears();
    this.getYearsReverced();


    if (this.lang == 'GEO') {
      
      this.monthies.push({name: "აირჩიეთ თვე", value: 0, isDisabled: false});
      this.monthiesEnd.push({name: "აირჩიეთ თვე", value: 0, isDisabled: false});

      Object.keys(Month).filter(v => isNaN(Number(v))).forEach((element: string) => {
      this.monthies.push({name: element, value: Object.values(Month).indexOf(element) + 1, isDisabled: false}),
      this.monthiesEnd.push({name: element, value: Object.values(Month).indexOf(element) + 1, isDisabled: false})
      });
    }
    else{
      this.monthies.push({name: "Select a Month", value: 0, isDisabled: false});
      this.monthiesEnd.push({name: "Select a Month", value: 0, isDisabled: false});

      this.startM = {name: "Select a Month", value: 0, isDisabled: false};
      this.endM = {name: "Select a Month", value: 0, isDisabled: false};

      Object.keys(MonthEN).filter(v => isNaN(Number(v))).forEach((element: string) => {
      this.monthies.push({name: element, value: Object.values(MonthEN).indexOf(element) + 1, isDisabled: false}),
      this.monthiesEnd.push({name: element, value: Object.values(MonthEN).indexOf(element) + 1, isDisabled: false})
      });
    }

    this.getVisitsChart(this.year, this.yearEnd, this.startM.value, this.endM.value, this.country);
  }


  countryes: string[] = [];
  country!: string;
  


  years!: number[];
  year: number = 2015;

  yearsReverced!: number[];
  yearEnd: number = 2022;


  monthies: IDropDown[] = [];
  startM: IDropDown = {name: "აირჩიეთ თვე", value: 0, isDisabled: false};

  monthiesEnd: IDropDown[] = [];
  endM: IDropDown = {name: "აირჩიეთ თვე", value: 0, isDisabled: false};

  denger: boolean = false;


  getCountryes(){
    if (this.lang == 'GEO') {
      this.countryes.push("ყველა");
    }
    else{
      this.countryes.push("Total");      
    }

    this.http.get<string[]>(this.APIUrl + '/countryes' + '?lang=' + this.lang).subscribe(data => {
      
      data.forEach(element => {
        this.countryes.push(element);
      });
    })
  }

  getYears(){
    this.http.get<number[]>(this.APIUrl + '/years').subscribe(years => {
      this.years = years;
    })
  }

  getYearsReverced(){
    this.http.get<number[]>(this.APIUrl + '/yearsReverced').subscribe(years => {
      this.yearsReverced = years;
    })
  }

  changedenger(){
    this.denger = false;
  }

  getVisitChart(){
    if(Number(this.year) >= Number(this.yearEnd) && Number(this.startM.value) > Number(this.endM.value)){
      this.denger = true;
    }
    else{
      if(this.startM.value == 0 && this.endM.value != 0){
        this.getVisitsChart(this.year, this.yearEnd, 1, this.endM.value, this.country);
      }
      else if(this.endM.value == 0 && this.startM.value != 0){
      this.getVisitsChart(this.year, this.yearEnd, this.startM.value, 12, this.country);
      }
      else{
      this.getVisitsChart(this.year, this.yearEnd, this.startM.value, this.endM.value, this.country);
      }      
    }
  }

  getVisitsChart(st: number, en: number, stM: number, enM: number, cntr: string) {
    this.http.get<any>(this.APIUrl + '/visitorsCount?start=' + st + '&end=' + en + '&startM=' + stM + '&endM=' + enM + '&country=' + cntr + '&lang=' + this.lang).subscribe(data => {
      this.helpChart(data, "", "visitsChart");
    })
    
  }

  helpChart(res: any, chart: any, chartDiv: string) {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    chart = am4core.create(chartDiv, am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = "#.%";
    valueAxis.renderer.grid.template.location = 0;
    if (this.lang == 'GEO') {
      valueAxis.title.text = "ვიზიტები";
    }
    else{
      valueAxis.title.text = "Visits";
    }

    if(Number(this.startM.value) != 0 || Number(this.endM.value != 0))
    {
      res.forEach((element: { year: string; }) => {
        let st: string = "";

        st = String(element.year);

        let stY: string = st.slice(0, 4);

        let stQ: string = st.slice(5);

        if (stQ == '1') {
          if (this.lang == 'GEO') {
            stQ = 'იან, ';
          }
          else{
            stQ = 'Jan, ';
          }
        } else if (stQ == '2') {
          if (this.lang == 'GEO') {
            stQ = 'თებ, ';
          }
          else{
            stQ = 'Feb, ';
          }          
        } else if (stQ == '3') {
          if (this.lang == 'GEO') {
            stQ = 'მარ, ';
          }
          else{
            stQ = 'Mar, ';
          }          
        } else if (stQ == '4') {
          if (this.lang == 'GEO') {
            stQ = 'აპრ, ';
          }
          else{
            stQ = 'Apr, ';
          }
          
        } else if (stQ == '5') {
          if (this.lang == 'GEO') {
            stQ = 'მაი, ';
          }
          else{
            stQ = 'May, ';
          }
          
        } else if (stQ == '6') {
          if (this.lang == 'GEO') {
            stQ = 'ივნ, ';
          }
          else{
            stQ = 'Jun, ';
          }
          
        } else if (stQ == '7') {
          if (this.lang == 'GEO') {
            stQ = 'ივლ, ';
          }
          else{
            stQ = 'Jul, ';
          }
          
        } else if (stQ == '8') {
          if (this.lang == 'GEO') {
            stQ = 'აგვ, ';
          }
          else{
            stQ = 'Aug, ';
          }
          
        } else if (stQ == '9') {
          if (this.lang == 'GEO') {
            stQ = 'სექ, ';
          }
          else{
            stQ = 'Sep, ';
          }
          
        } else if (stQ == '10') {
          if (this.lang == 'GEO') {
            stQ = 'ოქტ, ';
          }
          else{
            stQ = 'Oct, ';
          }
          
        } else if (stQ == '11') {
          if (this.lang == 'GEO') {
            stQ = 'ნოე, ';
          }
          else{
            stQ = 'Nov, ';
          }
          
        } else if (stQ == '12') {
          if (this.lang == 'GEO') {
            stQ = 'დეკ, ';
          }
          else{
            stQ = 'Dec, ';
          }
          
        }

        let fnSt: string = `${stQ} ${stY}`


        element.year = fnSt;
      });
    }
    chart.data = res;



    Object.keys(res[0]).filter(x => x != "year").forEach((element: string) => {
      this.createSeries(element, element, chart, element);
    });

    chart.legend = new am4charts.Legend();

    // let legendContainer = am4core.create("legenddiv", am4core.Container);
    // legendContainer.width = am4core.percent(100);
    // legendContainer.height = am4core.percent(100);

    // chart.legend.parent = legendContainer;

    // chart.legend.maxHeight = 50;
    // chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;
    // let marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(7, 7, 7, 7);
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");
    // marker.template.

    //chart.cursor = new am4charts.XYCursor();

    //chart.legend.markers.template.disabled = true;

    chart.logo.disabled = true;

    chart.exporting.menu = new am4core.ExportMenu();

    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
    
  }

  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.LineSeries());

    // series.stroke = am4core.color("#ff0000"); // red
    series.strokeWidth = 3;

    series.tooltipText = '{yearNo} წელს, {value}';
    

    series.dataFields.categoryX = "year";
    series.dataFields.valueY = field;

    series.name = name;
    

    chart.language.locale["_thousandSeparator"] = " ";
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    series.strokeWidth = 3;
    series.tensionX = 0.7;
    series.bullets.push(new am4charts.CircleBullet());

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    if (this.lang == 'GEO') {
	    if (this.country == "ყველა") {
	      bullet.tooltipText = 'საწყის პერიოდთან შედარებით, ვიზიტების საერთო რაოდენობა\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
	    }
	    else{
	      bullet.tooltipText = '[bold]{name}[/]დან შემომსვლელ ვიზიტორტა რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
	    }
    }
    else{
      if (this.country == "Total") {
	      bullet.tooltipText = 'Compared to the initial period, in {year} year Total number of visits\n has Changed by [bold]{valueY.formatNumber("#.%")}';
	    }
	    else{
	      bullet.tooltipText = 'From [bold]{name}[/] amount of visitors, compared to\n{year} Year, has Changed By [bold]{valueY.formatNumber("#.%")}';        
	    }
    }
    

    return series;
  }

}
