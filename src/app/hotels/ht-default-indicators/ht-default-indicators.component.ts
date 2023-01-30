import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { IDropDown } from 'src/app/common/IDropDown';
import { DefindicatorService } from './service/defindicator.service';
import { HttpClient } from '@angular/common/http';
import { DataForMapChart } from './service/dataForMapChart';
import lang from '@amcharts/amcharts4-geodata/lang/ES';

// import am4geodata_georgia from "@amcharts/amcharts4-geodata/region/world/";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

@Component({
  selector: 'app-ht-default-indicators',
  templateUrl: './ht-default-indicators.component.html',
  styleUrls: ['./ht-default-indicators.component.scss'],
})
export class HtDefaultIndicatorsComponent implements OnInit {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  constructor(private srvc: DefindicatorService, private http: HttpClient) {
    this.lang = localStorage.getItem('Language');

    this.indicators = this.srvc.indicators;
    this.indicator = this.indicators[0].value;

    this.srvc.getYears().subscribe((arg) => {
      this.years = arg;
    });

    this.regions = this.srvc.getRegions();
    this.countryGroups = this.srvc.getCountryGroups();
  }

  lang: any;

  ngOnInit(): void {
    this.getMainChart();

    this.getAllHelpCharts();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სასტუმროების რაოდენობის განაწილება';
    } else {
      this.sankyChart = 'Distribution of the Hotels';
    }
  }

  regions!: IDropDown[];
  region: IDropDown = { name: 'სულ', value: 0, isDisabled: false };

  countryGroups!: IDropDown[];

  indicator!: number;
  indicators!: IDropDown[];

  years!: number[];
  year: number = 2021;

  optList: string = '38,11,26,47,15,41,44,32,23,29';

  addRemoveRegion() {
    let list: string[] = [];
    this.regions.forEach((reg) => {
      if ((document.getElementById(reg.name) as HTMLInputElement).checked) {
        list.push(String(reg.value));
      }
    });

    this.optList = list.join();

    am4core.disposeAllCharts();

    if ((document.getElementById('HotelsAmount') as HTMLInputElement).checked) {
      this.getMainChart();
    } else if (
      (document.getElementById('VisitorsAmount') as HTMLInputElement).checked
    ) {
      this.getMainChartGuests();
    }

    this.getAllHelpCharts();
  }

  hotel() {
    this.getMainChart();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სასტუმროების რაოდენობის განაწილება';
    } else {
      this.sankyChart = 'Distribution of the Hotels';
    }
  }

  guest() {
    this.getMainChartGuests();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სტუმრების რაოდენობის განაწილება';
    } else {
      this.sankyChart = 'Distribution of the Visitors';
    }
  }

  checkUncheckAll(event: any) {
    if (event.target.checked) {
      this.regions.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            true)
      );
    } else {
      this.regions.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            false)
      );
    }

    this.addRemoveRegion();
  }

  helpChartName: any;

  // name : string = 'აირჩიეთ რეგიონი';
  // hoverName : string = 'აირჩიეთ რეგიონი';

  selectedRegion: number = 0;
  // tooltipx: number = 0;
  // tooltipy: number = 0;

  sankyChart!: string;

  yearChange() {
    if ((document.getElementById('HotelsAmount') as HTMLInputElement).checked) {
      this.getMainChart();
    } else if (
      (document.getElementById('VisitorsAmount') as HTMLInputElement).checked
    ) {
      this.getMainChartGuests();
    }
  }

  getMainChart() {
    this.srvc.getMainChartData(this.optList, this.year).subscribe((res) => {
      this.mainChart(res);
    });
  }

  getMainChartGuests() {
    this.srvc
      .getMainChartDataGuests(this.optList, this.year)
      .subscribe((res) => {
        this.mainChart(res);
      });
  }

  getHotelCountChart() {
    this.srvc.getDataForHotelCount(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChartName, 'chartHotelCount');
    });
  }

  getIncomeChart() {
    this.srvc.getDataForIncoms(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChart, 'chartRevenue');
    });
  }

  getCoastChart() {
    this.srvc.getDataForCoasts(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChart, 'chartCoast');
    });
  }

  getEmloyeChart() {
    this.srvc.getDataForGender(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChart, 'chartGender');
    });
  }

  getGuestsChart() {
    this.srvc.getDataForGuestCount(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChart, 'chartGestCount');
    });
  }

  getBadRoomChart() {
    this.srvc.getDataForRoomBad(this.optList).subscribe((res) => {
      this.helpChart(res, this.helpChart, 'chartBadRoom');
    });
  }

  getAllHelpCharts() {
    this.getHotelCountChart();
    this.getIncomeChart();
    this.getCoastChart();
    this.getEmloyeChart();
    this.getGuestsChart();
    this.getBadRoomChart();
  }

  mainChart(data: DataForMapChart[]) {
    var newData = data.filter(function (el) {
      return el.value != 0;
    });
    newData.map((i: any) => {
      i.from = i.from.split('_').join(' ');
      i.to = i.to.split('_').join(' ');
    });
    let chart = am4core.create('chartMain', am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0;
    chart.data = newData;

    let hoverState = chart.links.template.states.create('hover');
    hoverState.properties.fillOpacity = 0.6;
    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    chart.paddingRight = 130;
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = 'Drag me!';
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;
    nodeTemplate.fontSize = 11;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    nodeTemplate2.fontSize = 11;

    chart.logo.disabled = true;
  }

  helpChart(res: any, chart: any, chartDiv: string) {
    // Themes end

    // Create chart instance
    chart = am4core.create(chartDiv, am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inside = true;
    // valueAxis.renderer.labels.template.disabled = true;
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.0a';
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.min = 0;
    chart.data = res;

    switch (chartDiv) {
      case 'chartHotelCount':
        if (this.lang == 'GEO') {
          this.createSeries('სასტუმრო', 'სასტუმრო', chart, 'სასტუმრო');
          this.createSeries('გესტჰაუსი', 'გესტჰაუსი', chart, 'გესტჰაუსი');
          this.createSeries('კოტეჯი', 'კოტეჯი', chart, 'კოტეჯი');
          this.createSeries('კემპინგი', 'კემპინგი', chart, 'კემპინგი');
        } else {
          this.createSeries('Hotel', 'Hotel', chart, 'Hotel');
          this.createSeries('Guesthouse', 'Guesthouse', chart, 'Guesthouse');
          this.createSeries('Cottage', 'Cottage', chart, 'Cottage');
          this.createSeries('Camping', 'Camping', chart, 'Camping');
        }
        break;

      case 'chartBadRoom':
        if (this.lang == 'GEO') {
          this.createSeries('ლუქსი', 'ლუქსი', chart, 'ლუქსი');
          this.createSeries('ერთიანი', 'ერთადგილიანი', chart, 'ერთიანი');
          this.createSeries('ორიანი', 'ორადგილიანი', chart, 'ორიანი');
          this.createSeries('სამიანი', 'სამადგილიანი', chart, 'სამიანი');
        } else {
          this.createSeries('Lux', 'Lux', chart, 'Lux');
          this.createSeries('Single', 'Single', chart, 'Single');
          this.createSeries('Double', 'Double', chart, 'Double');
          this.createSeries('ThreeOrMore', 'ThreeOrMore', chart, 'ThreeOrMore');
        }
        break;

      case 'chartGestCount':
        this.countryGroups.forEach((reg) => {
          this.createSeries(
            reg.name.split('_').join(' '),
            reg.name.split('_').join(' '),
            chart,
            reg.name.split('_').join(' ')
          );
        });
        break;

      case 'chartRevenue':
        if (this.lang == 'GEO') {
          this.createSeries(
            'ოთახები',
            'ნომრების გაქირავება',
            chart,
            'ნომრების გაქირავებიდან'
          );
          this.createSeries('სერვისი', 'სერვისი', chart, 'სერვისიდან');
          this.createSeries('რესტორანი', 'რესტორანი', chart, 'რესტორნიდან');
          this.createSeries('სხვა', 'სხვა', chart, 'სხვა');
        } else {
          this.createSeries('Rooms', 'Renting ', chart, 'From Renting');
          this.createSeries('Service', 'Service', chart, 'From Service');
          this.createSeries('Restrant', 'Restrant', chart, 'From Restrant');
          this.createSeries('Other', 'Other', chart, 'Other');
        }
        break;

      case 'chartGender':
        if (this.lang == 'GEO') {
          this.createSeries('ქალი', 'ქალი', chart, 'ქალი');
          this.createSeries('კაცი', 'კაცი', chart, 'კაცი');
        } else {
          this.createSeries('Female', 'Female', chart, 'Female');
          this.createSeries('Male', 'Male', chart, 'Male');
        }
        break;

      case 'chartCoast':
        if (this.lang == 'GEO') {
          this.createSeries('ხელფასი', 'ხელფასი', chart, 'ხელფასები');
          this.createSeries('სხვა', 'სხვა', chart, 'სხვა ხარჯები');
        } else {
          this.createSeries('Salary', 'Salary', chart, 'Salary');
          this.createSeries('Other', 'Other', chart, 'Other');
        }
        break;

      default:
        break;
    }

    chart.legend = new am4charts.Legend();

    chart.legend.maxHeight = 80;
    chart.legend.maxWidth = 80;
    chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 1;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color('#ccc');

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
  }

  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';
    series.sequencedInterpolation = true;

    chart.language.locale['_thousandSeparator'] = ' ';
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    if (this.lang == 'GEO') {
      series.columns.template.tooltipText =
        '{categoryX} წელს: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    } else {
      series.columns.template.tooltipText =
        '{categoryX} Year: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    }

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY.formatNumber("#,###.")}';
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
}
