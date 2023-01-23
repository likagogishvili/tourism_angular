import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { IDropDown } from 'src/app/common/IDropDown';
import { DefindicatorService } from './service/defindicator.service';
import { HttpClient } from '@angular/common/http';
import { DataForMapChart } from './service/dataForMapChart';

// import am4geodata_georgia from "@amcharts/amcharts4-geodata/region/world/";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


@Component({
  selector: 'app-ht-default-indicators',
  templateUrl: './ht-default-indicators.component.html',
  styleUrls: ['./ht-default-indicators.component.scss']
})

export class HtDefaultIndicatorsComponent implements OnInit {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  constructor(private srvc: DefindicatorService, private http: HttpClient) {

    this.indicators = this.srvc.indicators;
    this.indicator = this.indicators[0].value;

    this.srvc.getYears().subscribe((arg) => {
      this.years = arg;
    });

    this.regions = this.srvc.getRegions();
    this.countryGroups = this.srvc.getCountryGroups();
  }

  

  ngOnInit(): void {

    this.getMainChart();

    this.getAllHelpCharts();

    
  }

  regions!: IDropDown[];
  region: IDropDown = { name: "სულ", value: 0, isDisabled: false };

  countryGroups!: IDropDown[];


  indicator!: number;
  indicators!: IDropDown[];

  years!: number[];
  year: number = 2020;

  optList: string = "38,11,26,47,15,41,44,32,23,29";


  addRemoveRegion() {

    

    let list: string[] = [];
    this.regions.forEach( reg => {
      if ((document.getElementById(reg.name) as HTMLInputElement).checked){
        list.push(String(reg.value));
      }
    } );

    this.optList = list.join();

    am4core.disposeAllCharts();

    if ((document.getElementById("HotelsAmount") as HTMLInputElement).checked) {
      this.getMainChart();
    }
    else if ((document.getElementById("VisitorsAmount") as HTMLInputElement).checked){
      this.getMainChartGuests();
    }

    this.getAllHelpCharts();
  }
  

  hotel() {
    
    this.getMainChart();

    this.sankyChart = "სასტუმროების რაოდენობის განაწილება";
  }

  guest() {
    this.getMainChartGuests();

    this.sankyChart = "სტუმრების რაოდენობის განაწილება";
  }


  checkUncheckAll(event: any) {
    if (event.target.checked) {
      this.regions.forEach( reg => (document.getElementById(reg.name) as HTMLInputElement).checked = true);
    }
    else {
      this.regions.forEach( reg => (document.getElementById(reg.name) as HTMLInputElement).checked = false);
    }

    this.addRemoveRegion();
  }
  

  helpChartName: any;
  
    

  name : string = 'აირჩიეთ რეგიონი';
  hoverName : string = 'აირჩიეთ რეგიონი';

  selectedRegion : number = 0;
  // tooltipx: number = 0;
  // tooltipy: number = 0;

  sankyChart: string = "სასტუმროების რაოდენობის განაწილება";



  yearChange(){
    if ((document.getElementById("HotelsAmount") as HTMLInputElement).checked) {
      this.getMainChart();
    }
    else if ((document.getElementById("VisitorsAmount") as HTMLInputElement).checked){
      this.getMainChartGuests();
    }
  }

  

  getMainChart() {
    this.srvc.getMainChartData(this.optList, this.year).subscribe( res => { this.mainChart(res) } );
  }

  getMainChartGuests() {
    this.srvc.getMainChartDataGuests(this.optList, this.year).subscribe( res => { this.mainChart(res) } );
  }

  getHotelCountChart() {
    this.srvc.getDataForHotelCount(this.optList).subscribe( res => { this.helpChart(res, this.helpChartName, "chartHotelCount") } );
  }

  getIncomeChart() {
    this.srvc.getDataForIncoms(this.optList).subscribe( res => { this.helpChart(res, this.helpChart, "chartRevenue") } );
  }

  getCoastChart() {
    this.srvc.getDataForCoasts(this.optList).subscribe( res => { this.helpChart(res, this.helpChart, "chartCoast") } );
  }

  getEmloyeChart() {
    this.srvc.getDataForGender(this.optList).subscribe( res => { this.helpChart(res, this.helpChart, "chartGender")} );
  }

  getGuestsChart() {
    this.srvc.getDataForGuestCount(this.optList).subscribe( res => { this.helpChart(res, this.helpChart, "chartGestCount")} );
  }

  getBadRoomChart() {
    this.srvc.getDataForRoomBad(this.optList).subscribe( res => { this.helpChart(res, this.helpChart, "chartBadRoom")} );
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
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartMain", am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0;
    

    chart.data = data;

    let hoverState = chart.links.template.states.create("hover");
    hoverState.properties.fillOpacity = 0.6;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    chart.paddingRight = 120;

    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = "Drag me!";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer;


    // chart.links.template.events.on("over", function(event){
    //   let link = event.target;
    //   let id = link.id.split("-")[0];
    
    //   chart.links.each(function(link){
    //     if(link.id.indexOf(id) != -1){
    //       link.isHover = true;
    //     }
    //   })
    // })

    // chart.links.template.events.on("out", function(event){  
    //   chart.links.each(function(link){
    //     link.isHover = false;
    //   })
    // })

    chart.logo.disabled = true;

  }

  // helpChart() {
  //   am4core.useTheme(am4themes_animated);
  //   // Themes end



  //   let chart = am4core.create('chartdiv', am4charts.XYChart)
  //   chart.colors.step = 2;

  //   chart.legend = new am4charts.Legend()
  //   chart.legend.position = 'top'
  //   chart.legend.paddingBottom = 20
  //   chart.legend.labels.template.maxWidth = 95

  //   let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  //   xAxis.dataFields.category = 'category'
  //   xAxis.renderer.cellStartLocation = 0.1
  //   xAxis.renderer.cellEndLocation = 0.9
  //   xAxis.renderer.grid.template.location = 0;

  //   let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   yAxis.min = 0;
  // }


  // createSeries(value: string, name: string, chart: any) {
  //   let series = chart.series.push(new am4charts.ColumnSeries())
  //   series.dataFields.valueY = value
  //   series.dataFields.categoryX = 'category'
  //   series.name = name

  //   series.events.on("hidden", this.arrangeColumns);
  //   series.events.on("shown", this.arrangeColumns);

  //   let bullet = series.bullets.push(new am4charts.LabelBullet())
  //   bullet.interactionsEnabled = false
  //   bullet.dy = 30;
  //   bullet.label.text = '{valueY}'
  //   bullet.label.fill = am4core.color('#ffffff')

  //   return series;
  // }


  // arrangeColumns(chart: any) {

  //   let series = chart.series.getIndex(0);

  //   let w = 1 - chart.xAxis.renderer.cellStartLocation - (1 - chart.xAxis.renderer.cellEndLocation);
  //   if (series.dataItems.length > 1) {
  //     let x0 = chart.xAxis.getX(series.dataItems.getIndex(0), "categoryX");
  //     let x1 = chart.xAxis.getX(series.dataItems.getIndex(1), "categoryX");
  //     let delta = ((x1 - x0) / chart.series.length) * w;
  //     if (am4core.isNumber(delta)) {
  //         let middle = chart.series.length / 2;

  //         let newIndex = 0;
  //         chart.series.each(function(series: { isHidden: any; isHiding: any; dummyData: number; }) {
  //             if (!series.isHidden && !series.isHiding) {
  //                 series.dummyData = newIndex;
  //                 newIndex++;
  //             }
  //             else {
  //                 series.dummyData = chart.series.indexOf(series);
  //             }
  //         })
  //         let visibleCount = newIndex;
  //         let newMiddle = visibleCount / 2;

  //         chart.series.each(function(series: { dummyData: any; animate: (arg0: { property: string; to: number; }, arg1: any, arg2: any) => void; interpolationDuration: any; interpolationEasing: any; bulletsContainer: { animate: (arg0: { property: string; to: number; }, arg1: any, arg2: any) => void; }; }) {
  //             let trueIndex = chart.series.indexOf(series);
  //             let newIndex = series.dummyData;

  //             let dx = (newIndex - trueIndex + middle - newMiddle) * delta

  //             series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
  //             series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
  //         })
  //     }
  //   }
  // }


  helpChart(res:any, chart: any, chartDiv: string) {
    am4core.useTheme(am4themes_animated);
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
    valueAxis.numberFormatter.numberFormat = "#.0a";
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.min = 0;
    chart.data = res;

    switch (chartDiv) {
      case "chartHotelCount":
        this.createSeries("სასტუმრო", "სასტუმრო", chart, "სასტუმრო");
        this.createSeries("გესტჰაუსი", "გესტჰაუსი", chart, "გესტჰაუსი");
        this.createSeries("კოტეჯი", "კოტეჯი", chart, "კოტეჯი");
        this.createSeries("კემპინგი", "კემპინგი", chart, "კემპინგი");
        break;

      case "chartBadRoom":
        this.createSeries("ლუქსი", "ლუქსი", chart, "ლუქსი");
        this.createSeries("ერთიანი", "ერთიანი", chart, "ერთიანი");
        this.createSeries("ორიანი", "ორიანი", chart, "ორიანი");
        this.createSeries("სამიანი", "სამიანი", chart, "სამიანი");
        break;

      case "chartGestCount":
        this.countryGroups.forEach( reg => { this.createSeries(reg.name, reg.name, chart, reg.name) });
        break;

      case "chartRevenue":
        this.createSeries("ოთახები", "ოთახები", chart, "ოთახიდან");
        this.createSeries("სერვისი", "სერვისი", chart, "სერვისიდან");
        this.createSeries("რესტორანი", "რესტორანი", chart, "რესტორნიდან");
        this.createSeries("სხვა", "სხვა", chart, "სხვა");
        break;

      case "chartGender":
        this.createSeries("ქალი", "ქალი", chart, "ქალი");
        this.createSeries("კაცი", "კაცი", chart, "კაცი");
        break;

      case "chartCoast":
        this.createSeries("ხელფასი", "ხელფასი", chart, "ხელფასები");
        this.createSeries("სხვა", "სხვა", chart, "სხვა ხარჯები");
        break;
    
      default:
        break;
    }

    chart.legend = new am4charts.Legend();

    chart.legend.maxHeight = 50;
    chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    
    chart.exporting.menu = new am4core.ExportMenu();

    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
  }


  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';
    series.sequencedInterpolation = true;

    chart.language.locale["_thousandSeparator"] = " ";
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;



    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText =
      '{categoryX} წელს: [bold]{valueY.formatNumber("#,###.")} ' + ragac;

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY.formatNumber("#,###.")}';
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }

}

