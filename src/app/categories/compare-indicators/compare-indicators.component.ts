import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { HttpClient } from '@angular/common/http';
import { IDropDown } from 'src/app/common/IDropDown';
import { ComparisionService } from './service/comparision.service';
import { IDropDownSt } from 'src/app/common/IdropDownSt';

@Component({
  selector: 'app-compare-indicators',
  templateUrl: './compare-indicators.component.html',
  styleUrls: ['./compare-indicators.component.scss'],
})
export class CompareIndicatorsComponent implements OnInit {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Comperision';

  constructor(private http: HttpClient, private srvc: ComparisionService) {
    this.isValue = 1;

    this.srvc.getYears().subscribe((years) => {
      this.years = years;
    });

    this.quarters = this.srvc.getQuarters();
    this.indicsMain = this.srvc.getIndicMain();
    this.indicsHelp = this.srvc.getIndicHelp();
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  hidemain = false;
  defaultVar = true;
  additionalVar = false;

  showComponents(arg: string) {
    switch (arg) {
      case 'defaultVar': {
        this.defaultVar = true;
        this.additionalVar = false;
        break;
      }
      case 'additionalVar': {
        this.defaultVar = false;
        this.additionalVar = true;
        break;
      }
      default:
        break;
    }
  }

  isValue!: number;

  year: number = 2022;

  selYear: number = 2022;

  years!: number[];

  quarter: number = 0;

  selQuarter: IDropDown = { name: 'ყველა', value: 0, isDisabled: false };

  quarters!: IDropDown[];

  mIndic: string = 'Goal';

  selMainIndic: IDropDownSt = {
    name: 'მიზანი',
    value: 'Goal',
    isDisabled: false,
  };

  indicsMain!: IDropDownSt[];

  hIndic: string = 'All';

  selHelpInidc: IDropDownSt = {
    name: 'ყველა',
    value: 'All',
    isDisabled: false,
  };

  indicsHelp!: IDropDownSt[];

  ngOnInit(): void {
    //am4core.disposeAllCharts();

    this.getMainChartForign(this.year, this.quarter, this.mIndic, this.hIndic);
    this.getMainChartExit(this.year, this.quarter, this.mIndic, this.hIndic);
    this.getMainChartLocale(this.year, this.quarter, this.mIndic, this.hIndic);
  }

  retMainArray(): string[] {
    let forMain: string[] = [];

    if (this.mIndic == 'Visit') {
      forMain = this.srvc.Visits();
      //forMain = forMain.reverse();
    } else if (this.mIndic == 'Goal') {
      forMain = this.srvc.Goals();
      //forMain = forMain.reverse();
    } else if (this.mIndic == 'Rate') {
      forMain = this.srvc.Rates();
      //forMain = forMain.reverse();
    } else if (this.mIndic == 'Transport') {
      forMain = this.srvc.Transports();
      //forMain = forMain.reverse();
    } else if (this.mIndic == 'Sequence') {
      forMain = this.srvc.Sequences();
      //forMain = forMain.reverse();
    } else if (this.mIndic == 'Expence') {
      forMain = this.srvc.Expenditure();
    }

    return forMain;
  }

  getCharts(): any {
    if (this.isValue == 1) {
      this.getMainChartForign(
        this.year,
        this.quarter,
        this.mIndic,
        this.hIndic
      );
      this.getMainChartExit(this.year, this.quarter, this.mIndic, this.hIndic);
      this.getMainChartLocale(
        this.year,
        this.quarter,
        this.mIndic,
        this.hIndic
      );
    } else if (this.isValue == 2) {
      this.getHelpChartForign(
        this.year,
        this.quarter,
        this.mIndic,
        this.hIndic
      );
      this.getHelpChartExit(this.year, this.quarter, this.mIndic, this.hIndic);
      this.getHelpChartLocale(
        this.year,
        this.quarter,
        this.mIndic,
        this.hIndic
      );
    }
  }

  selectYearChange() {
    this.selYear = this.years.filter((x) => x == this.year)[0];
    am4core.disposeAllCharts();
    this.getCharts();
  }

  selectQuarterChange() {
    this.selQuarter = this.quarters.filter((x) => x.value == this.quarter)[0];
    am4core.disposeAllCharts();
    this.getCharts();
  }

  selhelpIndicChange() {
    this.selHelpInidc = this.indicsHelp.filter(
      (x) => x.value == this.hIndic
    )[0];
    if (this.hIndic == 'All' && this.mIndic == 'All') {
      this.mIndic = 'Visit';
      this.selMainIndic = this.indicsMain.filter(
        (x) => x.value == this.mIndic
      )[0];
    }
    am4core.disposeAllCharts();
    this.getCharts();
  }

  selMainIndicChange() {
    this.selMainIndic = this.indicsMain.filter(
      (x) => x.value == this.mIndic
    )[0];

    am4core.disposeAllCharts();
    this.getCharts();
  }

  activeOrNot(val: number) {
    this.isValue = val;

    am4core.disposeAllCharts();
    this.getCharts();
    //console.log(this.isValue);
  }

  getMainChartForign(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byMain' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      //console.log(res["forign"]);
      this.createChart(res['forign'], 'chartdiv');
    });
  }

  getMainChartExit(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byMain' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      // console.log(res["Exit"]);
      this.createChart(res['exit'], 'chartdiv2');
    });
  }

  getMainChartLocale(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byMain' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      //console.log(res["local"]);
      this.createChart(res['local'], 'chartdiv3');
    });
  }

  getHelpChartForign(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byHelp' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      //console.log(res["forign"]);
      this.createChart(res['forign'], 'ch2');
    });
  }

  getHelpChartExit(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byHelp' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      // console.log(res["Exit"]);
      this.createChart(res['exit'], 'ch1');
    });
  }

  getHelpChartLocale(
    year: number,
    quarter: number,
    mainVariable: string,
    helpVariable: string
  ) {
    var uRl =
      this.APIUrl +
      '/comp?year=' +
      year +
      '&quarter=' +
      quarter +
      '&mainVariable=' +
      mainVariable +
      '&helpVariable=' +
      helpVariable +
      '&flag=byHelp' +
      '&lang=' +
      this.lang;

    this.http.get<any>(uRl).subscribe((res) => {
      //console.log(res["local"]);
      this.createChart(res['local'], 'ch');
    });
  }

  anyChart: am4charts.XYChart = new am4charts.XYChart();

  createChart(res: any, divClass: string) {
    am4core.useTheme(am4themes_animated);

    this.anyChart = am4core.create(divClass, am4charts.XYChart);

    // this.bigChart.colors.step = 3;
    this.anyChart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
    ];
    // Add data
    this.anyChart.data = res;

    // Create axes
    let categoryAxis = this.anyChart.yAxes.push(new am4charts.CategoryAxis());

    categoryAxis.dataFields.category = this.mIndic;
    // categoryAxis.renderer.grid.template.disabled = true; //removes chart lines
    categoryAxis.numberFormatter.numberFormat = '#';
    // categoryAxis.

    // categoryAxis.numberFormatter.numberFormat = '#';
    categoryAxis.renderer.grid.template.location = 0;

    categoryAxis.renderer.labels.template.disabled = true;
    // categoryAxis.renderer.grid.template.disabled = true;

    categoryAxis.renderer.cellStartLocation = 0.05;
    categoryAxis.renderer.cellEndLocation = 0.95;

    let valueAxis = this.anyChart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.numberFormatter.numberFormat = '#.%';
    // valueAxis.renderer.grid.template.disabled = true; //removes chart lines
    // valueAxis.renderer.labels.template.hidden = true;
    valueAxis.renderer.minGridDistance = 50;

    valueAxis.min = 0;
    valueAxis.max = 1;

    this.anyChart.legend = new am4charts.Legend();

    valueAxis.min = 0;
    if (this.mIndic == 'Expence') {
      categoryAxis.numberFormatter.numberFormat = '#.0a';
    }
    // Create series
    function createSeries(
      this: any,
      field: string,
      name: string,
      chrt: am4charts.XYChart,
      indic: string,
      val: number
    ) {
      let series = chrt.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = name;
      series.dataFields.categoryY = field;
      series.name = name;
      series.sequencedInterpolation = true;

      if (val == 2) {
        series.stacked = true;
      }

      //series.numberFormatter.numberFormat = '#.%';
      if (indic != 'Expence') {
        series.columns.template.tooltipText =
          '{name}: [bold]{valueX.formatNumber("#.%")}[/]';
      } else {
        series.columns.template.tooltipText =
          '{name}: [bold]{valueX.formatNumber("#.0a")}[/]';
      }

      series.columns.template.height = am4core.percent(80);
      series.columns.template.width = am4core.percent(90);
      series.sequencedInterpolation = true;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());

      categoryLabel.label.fill = am4core.color('#fff');
      categoryLabel.tooltipText =
        '{name}: [bold]{valueX.formatNumber("#.%")}[/]';

      chrt.logo.disabled = true;
      // chrt.legend = new am4charts.Legend();

    }

    switch (this.hIndic) {
      case 'All':
        if (this.lang == 'GEO') {
          createSeries(
            this.mIndic,
            'სულ',
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        } else {
          createSeries(
            this.mIndic,
            'All',
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        }
        break;

      case 'TourType':
        this.srvc.TourTypes().forEach((value) => {
          createSeries(
            this.mIndic,
            value,
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        });
        break;

      case 'Gender':
        this.srvc.Genders().forEach((value) => {
          createSeries(
            this.mIndic,
            value,
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        });
        break;

      case 'Age':
        this.srvc.Ages.forEach((value) => {
          createSeries(
            this.mIndic,
            value,
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        });
        break;

      case 'Activity':
        this.srvc.Activityes().forEach((value) => {
          createSeries(
            this.mIndic,
            value,
            this.anyChart,
            this.mIndic,
            this.isValue
          );
        });
        break;

      default:
        break;
    }
    // this.anyChart.exporting.menu = new am4core.ExportMenu();
    // this.anyChart.exporting.menu.items[0].icon =
    //   '../../../assets/HomePage/download_icon.svg';
    // this.anyChart.exporting.menu.align = 'right';
  }

  ngOnDestroy() {
    am4core.disposeAllCharts();
  }
}
