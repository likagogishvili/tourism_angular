import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
// import { create } from 'lodash';
// import { Month } from 'src/app/common/Month';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss'],
})
export class InteractiveMapComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private commonService: SharedService,
    private renderer: Renderer2
  ) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  searchText: any;

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/visitors';
  yearSelect = 2022;
  quarterSelect = 0;
  monthSelect = 0;
  genderSelect = 0;
  ageSelect = 0;
  mapchart!: am4maps.MapChart;
  worldSeries!: am4maps.MapPolygonSeries;
  similarDatas: any;
  chartName: string = '';
  countryImg: string = '';
  countriesData: any = [];

  perNights = false;
  notIn = false;

  isShown: boolean = true;

  // VisitTypeOptions etc.

  vTypeSelect = 0;

  selectedVType: number = 0;

  vTypesGE: any = [
    { vType: 'ყველა', value: 0 },
    { vType: 'ტურისტული ვიზიტი', value: 1 },
    { vType: 'ექსკურსიული ვიზიტი', value: 2 },
  ];

  vTypesEN: any = [
    { vType: 'Total', value: 0 },
    { vType: 'Tourist visit', value: 1 },
    { vType: 'Same-day visit', value: 2 },
  ];

  vTypes() {
    if (this.lang == 'GEO') {
      return this.vTypesGE;
    } else {
      return this.vTypesEN;
    }
  }

  selectvTypeChange() {
    this.selectedVType = this.vTypeSelect;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  async ngOnInit(): Promise<void> {
    this.SelectCountryData1();
    this.getDataForTable();

    this.mapchart = am4core.create('chartdiv', am4maps.MapChart);
    this.worldSeries = this.mapchart.series.push(
      new am4maps.MapPolygonSeries()
    );

    let arra: any = forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
      codes: this.getCodes(),
    }).subscribe(({ countriesList, nights, codes }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
        ...codes.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    //this.getDataForTable();

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    this.getYears().subscribe((arg) => {
      var arry = new Array<number>();
      arg.map((o: any) => {
        arry.push(parseInt(o.id));
        return arry;
      });
      this.sliderLowestVal = Math.min(...arry);
      this.sliderHighestVal = Math.max(...arry);
      this.yearsOptions = arg.sort((a: any, b: any) =>
        a.value.localeCompare(b.value)
      );
    });

    this.getMonths().subscribe(
      (arg) =>
        (this.monthsOptions = arg.sort((a: any, b: any) =>
          a.value < b.value ? -1 : 1
        ))
    );

    this.getAgeGroups().subscribe(
      (args) =>
        (this.agesOptions = args.sort((a: any, b: any) =>
          a.value.localeCompare(b.value)
        ))
    );

    let polygonSeries = this.worldSeries;
    // Export
    this.mapchart.exporting.menu = new am4core.ExportMenu();
    this.mapchart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    this.mapchart.exporting.menu.align = 'left';
    this.mapchart.exporting.menu.verticalAlign = 'top';
    this.mapchart.exporting.adapter.add('data', function (data) {
      data.data = [];
      for (var i = 0; i < polygonSeries.data.length; i++) {
        var row = polygonSeries.data[i];
        data.data.push({
          qveyana: row.id,
          value: row.value,
        });
      }
      return data;
    });
  }

  checkVisits = false;
  sortDataVisits() {
    this.checkVisits = !this.checkVisits;
    if (this.checkVisits) {
      let newar = this.dataForTable.sort(
        (a: any, b: any) => a.visits - b.visits
      );
      this.result = newar;
    } else {
      let newar = this.dataForTable.sort(
        (a: any, b: any) => b.visits - a.visits
      );
      this.result = newar;
    }
  }

  checkNights = false;
  sortDataNights() {
    this.checkNights = !this.checkNights;
    if (this.checkNights) {
      let newar = this.dataForTable.sort(
        (a: any, b: any) => a.avarNights - b.avarNights
      );
      this.result = newar;
    } else {
      let newar = this.dataForTable.sort(
        (a: any, b: any) => b.avarNights - a.avarNights
      );
      this.result = newar;
    }
  }

  checkCountryes = false;
  sortCountryes() {
    this.checkCountryes = !this.checkCountryes;
    if (this.checkCountryes) {
      let newar = this.dataForTable.sort((a: any, b: any) => {
        return a.countryNameGe.localeCompare(b.countryNameGe);
      });
      this.result = newar;
    } else {
      let newar = this.dataForTable.sort((a: any, b: any) => {
        return b.countryNameGe.localeCompare(a.countryNameGe);
      });
      this.result = newar;
    }
  }

  myarr(myarr: any): any {
    throw new Error('Method not implemented.');
  }

  sliderLowestVal: number = 0;
  sliderHighestVal: number = 0;
  sliderValue: number = 2021;
  countriesForChart: any = [];
  selectedYear: number = 2021;
  selectedQuarter: number = 0;
  selectedMonth: number = 0;
  selectedGender: number = 0;
  selectedAge: number = 0;
  tourType: number = 0;
  public amDatas = [];
  selectedCountryDataId: number = -1;
  tempData: any;
  yearsOptions: any = [];

  gendersOptionsGE: any = [
    { gender: 'ქალი', value: 1 },
    { gender: 'კაცი', value: 2 },
  ];

  gendersOptionsEN: any = [
    { gender: 'Female', value: 1 },
    { gender: 'Male', value: 2 },
  ];

  gendersOptions() {
    if (this.lang == 'GEO') {
      return this.gendersOptionsGE;
    } else {
      return this.gendersOptionsEN;
    }
  }

  monthsOptions: any = [];
  quartersOptions: any = [
    { month: 1, quarter: 1 },
    { month: 2, quarter: 1 },
    { month: 3, quarter: 1 },
    { month: 4, quarter: 2 },
    { month: 5, quarter: 2 },
    { month: 6, quarter: 2 },
    { month: 7, quarter: 3 },
    { month: 8, quarter: 3 },
    { month: 9, quarter: 3 },
    { month: 10, quarter: 4 },
    { month: 11, quarter: 4 },
    { month: 12, quarter: 4 },
  ];

  quarters: any = [
    { quarter: 'I', value: 1 },
    { quarter: 'II', value: 2 },
    { quarter: 'III', value: 3 },
    { quarter: 'IV', value: 4 },
  ];

  agesOptions: any = [];
  countryDatas: any = [];
  nightDatas: any = [];
  selectedCountryIso!: string;
  result: any = [];
  resulti: any = [];
  re: any = [];

  sh: boolean = false;

  zoomToCountry(cid: string) {
    let country = this.worldSeries.getPolygonById(cid);
    this.mapchart.zoomToMapObject(country);
  }

  show() {
    this.isShown = true;
  }

  noshow() {
    this.isShown = false;
  }

  formatThousands(value: number) {
    return String(value).replace(/(?!^)(?=(?:\d{3})+$)/g, ' ');
  }

  interval(func: any, wait: any, times: any, start: number) {
    var interv = (function (w, t) {
      return function () {
        if (typeof t === 'undefined' || t-- > 0) {
          setTimeout(interv, w);
          try {
            func.call(null);
          } catch (e: any) {
            t = 0;
            throw e.toString();
          }
        }
      };
    })(wait, times);

    setTimeout(interv, start == 0 ? 0 : wait);
    start = 1;
  }

  onPlayClick() {
    let count = this.sliderHighestVal - this.sliderLowestVal + 1;
    let start: number = this.sliderLowestVal;

    this.interval(
      () => {
        this.sliderValue = start;
        this.OnSliderValueChanged(start);
        this.selectedYear = this.sliderValue;
        this.yearSelect = this.sliderValue;
        start++;
      },
      3000,
      count,
      0
    );
  }

  OnSliderValueChanged(val: any) {
    this.selectedYear = val;
    this.yearSelect = val;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();

    // --------------------------
  }
  selectElement(cid: string, isNew: boolean, oldCid: string) {
    (<HTMLInputElement>document.getElementById(cid + '1')).classList.add(
      'selected'
    );
    (<HTMLInputElement>document.getElementById(cid + '2')).classList.add(
      'selected'
    );
    (<HTMLInputElement>document.getElementById(cid + '3')).classList.add(
      'selected'
    );
    if (!isNew) {
      (<HTMLInputElement>(
        document.getElementById(oldCid + '1')
      )).classList.remove('selected');
      (<HTMLInputElement>(
        document.getElementById(oldCid + '2')
      )).classList.remove('selected');
      (<HTMLInputElement>(
        document.getElementById(oldCid + '3')
      )).classList.remove('selected');
    }
  }
  GetCountryIso(id: number) {
    this.http
      .get(this.APIUrl + '/ISOByNumeric/' + id, { responseType: 'text' })
      .subscribe((arg) => {
        this.zoomToCountry(arg);
      });
  }
  SelectCountryData(cid: number) {
    var temp = this.selectedCountryDataId == -1 ? true : false;
    this.selectElement(
      cid.toString(),
      temp,
      this.selectedCountryDataId.toString()
    );
    this.selectedCountryDataId = cid;
    this.getCountriesForChart(cid).subscribe((arg) => {
      this.renderChartObject(arg);
    });
    this.GetCountryIso(cid);
    this.sh = true;
  }

  SelectCountryData1() {
    this.getCountriesForChart(0).subscribe((arg) => {
      this.renderChartObject(arg);
    });
  }

  selectTourType(type: number) {
    this.tourType = type;

    if (!this.perNights || this.tourType != 0) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }
  selectYearChange() {
    this.selectedYear = this.commonService.getDropDownText(
      this.yearSelect,
      this.yearsOptions
    )[0].value;
    this.sliderValue = this.yearSelect;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  selectMonthChange() {
    this.selectedQuarter = 0;
    this.quarterSelect = 0;

    if (this.monthSelect == 0) {
      this.selectedMonth = 0;
    } else {
      this.selectedMonth = this.commonService.getDropDownText(
        this.monthSelect,
        this.monthsOptions
      )[0].value;
    }

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  selectQuarterChange() {
    this.selectedQuarter = this.quarterSelect;
    this.monthSelect = 0;
    this.selectedMonth = 0;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  selectGenderChange() {
    this.selectedGender = this.genderSelect;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  async selectAgeChange() {
    this.selectedAge = this.ageSelect;

    if (!this.perNights) {
      this.getCountriesList();
    } else {
      this.getCountriesListNights();
    }

    forkJoin({
      countriesList: this.getQueryCountriesList(),
      nights: this.getQueryNights(),
    }).subscribe(({ countriesList, nights }) => {
      this.resulti = countriesList.map((obj: any) => ({
        ...obj,
        ...nights.find((o: any) => o.countryId === obj.countryId),
      }));
      return this.resulti;
    });
    this.getDataForTable();
  }

  onPerNight() {
    this.perNights = true;
  }

  offPerNight() {
    this.perNights = false;
  }

  onNotIn() {
    this.notIn = true;
  }
  onNot() {
    this.notIn = false;
  }

  //http calls
  getGenders() {
    return this.http.get<any>(this.APIUrl + '/Genders');
  }
  getAgeGroups() {
    return this.http.get<any>(this.APIUrl + '/AgeGroups');
  }
  getMonths() {
    return this.http.get<any>(this.APIUrl + '/months' + '?lang=' + this.lang);
  }
  getYears() {
    return this.http.get<any>(this.APIUrl + '/years');
  }

  // --------new--------
  getCountryCodes() {
    return this.http.get<any>(this.APIUrl + '/CountryCodes');
  }

  // getCountry(){
  //   return this.http.get<any>(this.APIUrl + "/DefaultDatas");
  // }

  // getNights(){
  //   return this.http.get<any>(this.APIUrl + "/DefaultNights");
  // }

  getCountriesForChart(id: number) {
    return this.http.get<any>(
      this.APIUrl +
        '/visitorsByYearForChart?countryId=' +
        id +
        '&lang=' +
        this.lang
    );
  }

  getCountriesList() {
    this.http
      .get<any>(
        this.APIUrl +
          '/WorldMapData?tourType=' +
          this.selectedVType +
          '&year=' +
          this.selectedYear +
          '&month=' +
          this.selectedMonth +
          '&gender=' +
          this.selectedGender +
          '&age=' +
          this.selectedAge +
          '&quarter=' +
          this.selectedQuarter +
          '&lang=' +
          this.lang
      )
      .subscribe((res) => {
        this.renderMapObject(res);
        this.countriesData = res;
      });
  }

  getCountriesListNights() {
    this.http
      .get<any>(
        this.APIUrl +
          '/WorldMapDataNightsFiltered?&year=' +
          this.selectedYear +
          '&month=' +
          this.selectedMonth +
          '&gender=' +
          this.selectedGender +
          '&age=' +
          this.selectedAge +
          '&quarter=' +
          this.selectedQuarter +
          '&lang=' +
          this.lang
      )
      .subscribe((res) => {
        this.renderMapObject(res);
      });
  }

  getQueryCountriesList() {
    return this.http.get<any>(
      this.APIUrl +
        '/Visitor?tourType=' +
        this.vTypeSelect +
        '&year=' +
        this.selectedYear +
        '&month=' +
        this.selectedMonth +
        '&gender=' +
        this.selectedGender +
        '&age=' +
        this.selectedAge +
        '&quarter=' +
        this.selectedQuarter +
        '&lang=' +
        this.lang
    );
  }

  getQueryNights() {
    return this.http.get<any>(
      this.APIUrl +
        '/Nights?tourType=' +
        this.selectedVType +
        '&year=' +
        this.selectedYear +
        '&month=' +
        this.selectedMonth +
        '&gender=' +
        this.selectedGender +
        '&age=' +
        this.selectedAge +
        '&quarter=' +
        this.selectedQuarter +
        '&lang=' +
        this.lang
    );
  }

  dataForTable: any = [];
  getDataForTable() {
    return this.http
      .get<any>(
        // "https://localhost:5001/api/visitors"
        this.APIUrl +
          '/AvarageNights?tour=' +
          this.selectedVType +
          '&year=' +
          this.selectedYear +
          '&month=' +
          this.selectedMonth +
          '&gender=' +
          this.selectedGender +
          '&age=' +
          this.selectedAge +
          '&quarter=' +
          this.selectedQuarter +
          '&lang=' +
          this.lang
      )
      .subscribe((res) => {
        this.dataForTable = res;
      });
  }

  getCodes() {
    return this.http.get<any>(this.APIUrl + '/Codes');
  }

  //amcharts
  renderMapObject(mapData: any[]) {
    this.mapchart.geodata = am4geodata_worldLow;

    this.mapchart.projection = new am4maps.projections.Miller();

    let value: any = mapData.values;
    // let toolltip: any = value == 'undefined' ? "0" : "{countryName} - {value}";

    this.worldSeries.exclude = ['AQ'];
    this.worldSeries.useGeodata = true;

    this.mapchart.colors.step = 3;

    let polygonTemplate = this.worldSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{countryName} - {value}';
    // polygonTemplate.tooltipText = toolltip
    polygonTemplate.fill = this.mapchart.colors.getIndex(0);
    polygonTemplate.nonScalingStroke = true;
    this.worldSeries.data = mapData;

    this.worldSeries.heatRules.push({
      property: 'fill',
      target: this.worldSeries.mapPolygons.template,
      min: am4core.color('#8540ff'),
      max: am4core.color('#2c0d63'),
    });
    let a = this.mapchart;
    a.logo.disabled = true;
    a.language.locale['_thousandSeparator'] = ' ';

    let button = a.chartContainer.createChild(am4core.Button);
    button.padding(5, 5, 5, 5);
    button.align = 'right';
    button.marginRight = 15;

    button.events.on('hit', function () {
      a.goHome();
    });

    button.events.on('hit', () => {
      this.SelectCountryData1();
    });

    button.events.on('hit', () => {
      this.selectedCountryDataId = -1;
    });

    button.icon = new am4core.Sprite();
    button.icon.path =
      'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
  }
  getFlag() {
    if (this.chartName) {
      let dataForCountryId = this.countriesData.filter((i: any) => {
        return i.countryName === this.chartName;
      });
      if (this.lang === 'GEO' && this.chartName === 'Total') {
        this.chartName = 'სულ';
      }

      if (dataForCountryId.length) {
        this.countryImg =
          'assets/flags/' + dataForCountryId[0].id.toLowerCase() + '.svg';
      } else {
        this.countryImg = 'assets/header/word.png';
      }
    }
  }

  renderChartObject(args: any[]) {
    args.map((item: any) => {
      item.yearNo = item.yearNo.toString();
      return item;
    });
    am4core.useTheme(am4themes_animated);
    // Themes end
    let chart = am4core.create('chartdiv2', am4charts.XYChart);
    chart.paddingRight = 20;
    chart.colors.step = 3;

    this.chartName = args[0].countryNameGe;

    this.getFlag();

    chart.data = args;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.0a';
    valueAxis.renderer.grid.template.location = 0;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'yearNo';
    series.dataFields.valueY = 'value';
    // series.name = args[0].countryNameGe;
    // series.bullets.push(new am4charts.CircleBullet());
    series.strokeWidth = 4;
    series.tensionX = 0.8;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;
    series.fill = am4core.color('#67B7DC');
    series.stroke = am4core.color('#67B7DC');

    if (this.selectedCountryDataId == -1) {
      if (this.lang == 'GEO') {
        series.tooltipText = '{yearNo} წელს, {value}';
      } else {
        series.tooltipText = '{yearNo} Year, {value}';
      }
    } else {
      if (this.lang == 'GEO') {
        series.tooltipText = '{yearNo} წელს, {value} ვიზიტი {countryNameGe}დან';
      } else {
        series.tooltipText =
          '{yearNo} Year, {value} Visits from {countryNameGe}';
      }
    }

    // set stroke property field
    series.propertyFields.stroke = 'color';

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    dateAxis.keepSelection = true;

    chart.logo.disabled = true;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';

    chart.legend = new am4charts.Legend();

    chart.legend.position = 'top';
    chart.legend.fontSize = 20;
    chart.legend.fontWeight = 'bold';
  }
}

// function sampleList(sampleList: any) {
//   throw new Error('Function not implemented.');
// }
