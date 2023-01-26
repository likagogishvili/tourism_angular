import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';
import { Month } from 'src/app/common/Month';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-border-type',
  templateUrl: './border-type.component.html',
  styleUrls: ['./border-type.component.scss'],
})
export class BorderTypeComponent implements OnInit {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/VisitCount';

  constructor(private http: HttpClient) {
    this.getYears(1);
    this.getYearsReverced(1);

    this.startM = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };
    this.endM = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };
  }

  ngOnInit(): void {
    Object.keys(Month)
      .filter((v) => isNaN(Number(v)))
      .forEach((element: string) => {
        this.monthies.push({
          name: element,
          value: Object.values(Month).indexOf(element) + 1,
          isDisabled: false,
        }),
          this.monthiesEnd.push({
            name: element,
            value: Object.values(Month).indexOf(element) + 1,
            isDisabled: false,
          });
      });

    this.getVisitsChart(
      this.year,
      this.yearEnd,
      this.startM.value,
      this.endM.value
    );
  }

  years!: number[];
  year: number = 2015;

  yearsReverced!: number[];
  yearEnd: number = 2022;

  monthies: IDropDown[] = [
    { name: 'აირჩიეთ თვე', value: 0, isDisabled: false },
  ];
  startM!: IDropDown;

  monthiesEnd: IDropDown[] = [
    { name: 'აირჩიეთ თვე', value: 0, isDisabled: false },
  ];
  endM!: IDropDown;

  denger: boolean = false;

  tType: number = 1;

  changeFlag(flag: number) {
    this.tType = flag;
  }

  changedenger() {
    this.denger = false;
  }

  getYears(tType: number) {
    this.http
      .get<number[]>(this.APIUrl + '/borderYears?tType=' + tType)
      .subscribe((years) => {
        this.years = years;
      });
    if (tType == 1) {
      this.year = 2015;
    } else {
      this.year = 2019;
    }
  }

  getYearsReverced(tType: number) {
    this.http
      .get<number[]>(this.APIUrl + '/borderYearsReverced?tType=' + tType)
      .subscribe((years) => {
        this.yearsReverced = years;
      });

    if (tType == 1) {
      this.yearEnd = 2022;
    } else {
      this.yearEnd = 2021;
    }
  }

  // tTypeChange(fl: number){
  //   this.getYears(fl){
  //     this.http.get<number[]>(this.APIUrl + '/borderYears?tType=' + fl).subscribe(years => {
  //       this.years = years;
  //     })
  //   }

  //   this.getYearsReverced(fl){
  //     this.http.get<number[]>(this.APIUrl + '/borderYearsReverced?tType=' + fl).subscribe(years => {
  //       this.yearsReverced = years;
  //     })
  //   }
  // }

  getVisitsChart(st: number, en: number, stM: number, enM: number) {
    if (this.tType == 1) {
      this.http
        .get<any>(
          this.APIUrl +
            '/countByBorderTypes?start=' +
            st +
            '&end=' +
            en +
            '&startM=' +
            stM +
            '&endM=' +
            enM
        )
        .subscribe((data) => {
          this.helpChart(data, '', 'topChart');
        });
    } else {
      this.http
        .get<any>(
          this.APIUrl +
            '/countByBorderTypesExit?start=' +
            st +
            '&end=' +
            en +
            '&startM=' +
            stM +
            '&endM=' +
            enM
        )
        .subscribe((data) => {
          this.helpChart(data, '', 'topChart');
        });
    }
  }

  borderTypes: string[] = ['საჰაერო', 'სახმელეთო', 'სარკინიგზო', 'საზღვაო'];

  getChart() {
    if (
      Number(this.year) >= Number(this.yearEnd) &&
      Number(this.startM.value) > Number(this.endM.value)
    ) {
      this.denger = true;
    } else {
      if (this.startM.value == 0 && this.endM.value != 0) {
        this.getVisitsChart(this.year, this.yearEnd, 1, this.endM.value);
      } else if (this.endM.value == 0 && this.startM.value != 0) {
        this.getVisitsChart(this.year, this.yearEnd, this.startM.value, 12);
      } else {
        this.getVisitsChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          this.endM.value
        );
      }
    }
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
    valueAxis.numberFormatter.numberFormat = '#.%';
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.title.text = 'ვიზიტები';

    if (Number(this.startM.value) != 0 || Number(this.endM.value != 0)) {
      res.forEach((element: { year: string }) => {
        let st: string = '';

        st = String(element.year);

        let stY: string = st.slice(0, 4);

        let stQ: string = st.slice(5);

        if (stQ == '1') {
          stQ = 'იან, ';
        } else if (stQ == '2') {
          stQ = 'თებ, ';
        } else if (stQ == '3') {
          stQ = 'მარ, ';
        } else if (stQ == '4') {
          stQ = 'აპრ, ';
        } else if (stQ == '5') {
          stQ = 'მაი, ';
        } else if (stQ == '6') {
          stQ = 'ივნ, ';
        } else if (stQ == '7') {
          stQ = 'ივლ, ';
        } else if (stQ == '8') {
          stQ = 'აგვ, ';
        } else if (stQ == '9') {
          stQ = 'სექ, ';
        } else if (stQ == '10') {
          stQ = 'ოქტ, ';
        } else if (stQ == '11') {
          stQ = 'ნოე, ';
        } else if (stQ == '12') {
          stQ = 'დეკ, ';
        }

        let fnSt: string = `${stQ} ${stY}`;

        element.year = fnSt;
      });
    }
    chart.data = res;

    chart.logo.disabled = true;

    // Object.keys(res[0]).filter(x => x != "year").forEach((element: string) => {
    //   this.createSeries(element, element, chart, element);
    // });

    this.borderTypes.forEach((element) => {
      this.createSeries(element, element, chart, element);
    });

    chart.legend = new am4charts.Legend();

    let legendContainer = am4core.create('legenddiv', am4core.Container);
    legendContainer.width = am4core.percent(100);
    legendContainer.height = am4core.percent(100);

    chart.legend.parent = legendContainer;

    // chart.legend.logo.disabled = true;

    // chart.legend.maxHeight = 50;
    // chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;

    chart.exporting.menu = new am4core.ExportMenu();

    // new am4core.ExportMenu();

    chart.exporting.menu.align = 'left';
    chart.exporting.menu.verticalAlign = 'top';

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;
  }

  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.LineSeries());

    // series.stroke = am4core.color("#ff0000"); // red
    series.strokeWidth = 3;

    series.dataFields.categoryX = 'year';
    series.dataFields.valueY = field;

    series.name = name;

    chart.language.locale['_thousandSeparator'] = ' ';
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;

    series.strokeWidth = 2;
    series.tensionX = 0.7;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    if (this.tType == 1) {
      bullet.tooltipText =
        '[bold]{name}[/]ით შემომსვლელ ვიზიტორტა რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
    } else {
      bullet.tooltipText =
        '[bold]{name}[/]ით გამსვლელ ვიზიტორტა რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
    }

    let shadow = new am4core.DropShadowFilter();
    shadow.dx = 1;
    shadow.dy = 1;
    bullet.filters.push(shadow);

    chart.logo.disabled = true;

    // series.template.tooltipText = "{name}: {categoryX}: {valueY}";

    return series;
  }
}
