import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { RegionService } from './service/region.service';
import { DataForMapChart } from './service/dataForMapChart';
import { HttpClient } from '@angular/common/http';
import { RegionID } from '../../common/RegionID'
import am4geodata_lang_ES from "@amcharts/amcharts4-geodata/lang/ES"; 
import { Title } from '@angular/platform-browser';
import { RegionIDEN } from 'src/app/common/RegionIDEN';



@Component({
  selector: 'app-regional-analysis',
  templateUrl: './regional-analysis.component.html',
  styleUrls: ['./regional-analysis.component.scss']
})
export class RegionalAnalysisComponent implements OnInit {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/region';

  constructor(private region: RegionService, private http: HttpClient) {

    this.radioBtnID = 0;
    this.tourismType = 2;
    this.all = [];
    this.ages = this.region.ages;
    this.genders = this.region.genders();
    this.activityes = this.region.activityes();
    this.goals = this.region.goals();
    this.visits = this.region.visits();
    this.transports = this.region.transports();
    this.rates = this.region.rates();
    this.optArray = "";
    this.flag = "visits";
    this.selectedProperty = "All";
    this.isValue = 1;


    this.checkBoxesArray = [this.all, this.genders, this.ages, this.activityes, this.goals, this.rates, this.visits, this.transports];
    this.isDetaled = [false, this.isGenderDetailed, this.isAgeDetailed, this.isStatusDetailed, this.isPurposeDetailed, this.isRateDetaled, this.isActivityDetailed, this.isTransportDetailed];

    this.region.getYears(2).subscribe(years => {
      this.years = years;
    });
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  ngOnInit(): void {

    this.year = 2022;
    this.getMapChart(this.tourismType, this.year, this.optArray, this.isValue, this.selectedProperty, this.flag);
  }

  years!: number[];

  year: number = 0;
  selectedRegion: string = 'თბილისი'


  radioBtnID!: number;

  all!: any[];
  ages!: any[];
  genders!: any[];
  activityes!: any[];
  goals!: any[];
  visits!: any[];
  transports!: any[];
  rates!: any[];
 
  optArray!: string;

  checkBoxesArray!: any[];
  isDetaled!: any[];

  selectedProperty!: string;

  mapChartTitle: string = "";

  expenceTitle: string = "";

  sanqiName: string = "";


  //optionList: number[] = [];

  tourismType!: number;

  regList!: DataForMapChart[];

  changeYear() {
    this.createCharts();
  }



  setTourismType(num: number){
    this.tourismType = num;

    if (num == 2){
      this.region.getYears(2).subscribe(years => {
        this.years = years;
      });
    }
    else if (num == 1){
      this.region.getYears(1).subscribe(years => {
        this.years = years;
      });
    }

    this.createCharts();
  }

  flag!: string;

  changeFlag(flag: string){
    this.flag = flag;

    this.createCharts();
  }

  isValue!: number;

  activeOrNot(val: number) {

    let radioBtn = document.getElementById("0") as HTMLInputElement;

    radioBtn.checked = true;

    this.checkBoxesArray[this.radioBtnID].forEach((element: { selected: boolean; }) => element.selected = false);

    this.isDetaled.forEach(element => element = false);

    
    this.isValue = val;
    if(val == 1){
      this.tourismType = 2;

      this.region.getYears(2).subscribe(years => {
        this.years = years;
      });

      this.getMapChart(this.tourismType, this.year, this.optArray, this.isValue, this.selectedProperty, this.flag);
    }
    else{
      this.tourismType = 1;
      
      this.region.getYears(1).subscribe(years => {
        this.years = years;
      });

      this.getMapChart(this.tourismType, this.year, this.optArray, this.isValue, this.selectedProperty, this.flag);
      this.getExpenceChart(this.optArray, this.selectedProperty);
      this.getMigrationChart(this.year, this.optArray, this.selectedProperty);
    }

    //console.log(this.tourismType);
  }


  createCharts() {
    am4core.disposeAllCharts();

    if (this.tourismType == 1){
      this.getMapChart(this.tourismType, this.year, this.optArray, this.isValue, this.selectedProperty, this.flag);

      if (this.selectedProperty == "TransportType" || this.selectedProperty == "VisitActivity") {
        this.getExpenceChart("", "All");
      }
      else {
        this.getExpenceChart(this.optArray, this.selectedProperty);
      }
      this.getMigrationChart(this.year, this.optArray, this.selectedProperty);
    }
    else if (this.tourismType == 2) {
      this.getMapChart(this.tourismType, this.year, this.optArray, this.isValue, this.selectedProperty, this.flag);
    }
  }


  isGenderDetailed: boolean = false;
  detailedGender() {
    this.isGenderDetailed = !this.isGenderDetailed;
    this.selectedProperty = "Gender";

    //this.createCharts();
  }

  isAgeDetailed: boolean = false;
  detailedAge() {
    this.isAgeDetailed = !this.isAgeDetailed
    this.selectedProperty = "AgeGroup";

    //this.createCharts();
  }

  isStatusDetailed: boolean = false;
  detailedStatus() {
    this.isStatusDetailed = !this.isStatusDetailed;
    this.selectedProperty = "ActivityType";

    //this.createCharts();
  }

  isPurposeDetailed: boolean = false;
  detailedPurpose() {
    this.isPurposeDetailed = !this.isPurposeDetailed
    this.selectedProperty = "GoalType";

    //this.createCharts();
  }

  isActivityDetailed: boolean = false;
  detailedActivity() {
    this.isActivityDetailed = !this.isActivityDetailed;
    this.selectedProperty = "VisitActivity";

    //this.createCharts();
  }

  isTransportDetailed: boolean = false;
  detailedTransport() {
    this.isTransportDetailed = !this.isTransportDetailed;
    this.selectedProperty = "TransportType";

    //this.createCharts();
  }

  isRateDetaled: boolean = false;
  detaledRate() {
    this.isRateDetaled = !this.isRateDetaled;
    this.selectedProperty = "RateType";

    //this.createCharts();
  }


  
  checkBoxClic(event: any) {
    //let elementId: string = (event.target as Element).id;
    let elementValue: string = (event.target as HTMLInputElement).value;

    //let indx = Number(elementId);
    let val = Number(elementValue);

    let radioBtn = document.getElementById(elementValue) as HTMLInputElement;

    if (val != this.radioBtnID){
      this.checkBoxesArray[this.radioBtnID].forEach((element: { selected: boolean; }) => element.selected = false);

      radioBtn.checked = true;

      this.isDetaled[this.radioBtnID] = false;

      this.radioBtnID = val;

      switch (this.radioBtnID) {
        case 0:
          this.selectedProperty = "All";        
          break;
  
        case 1:
          this.selectedProperty = "Gender";        
          break;
  
        case 2:
          this.selectedProperty = "AgeGroup";        
          break;
  
        case 3:
          this.selectedProperty = "ActivityType";        
          break;
  
        case 4:
          this.selectedProperty = "GoalType";        
          break;

        case 5:
          this.selectedProperty = "RateType";
          break;

        case 6:
          this.selectedProperty = "VisitActivity";
          break;
  
        case 7:
          this.selectedProperty = "TransportType";        
          break;
      
        default:
          break;
      }
    }
    else{
      if (radioBtn.checked != true) {
        radioBtn.checked = true;
      }      
    }

    if (this.selectedProperty == "TransportType" || this.selectedProperty == "VisitActivity"){
      (document.getElementById("RdbVisits") as HTMLInputElement).checked = true;
      (document.getElementById("RdbNights") as HTMLInputElement).disabled = true;
    }
    else{
      (document.getElementById("RdbNights") as HTMLInputElement).disabled = false;
    }



    
    //let list: number[] = [];
    this.optArray = "";

    this.checkBoxesArray[val].forEach((element: { selected: boolean; id: number; }) => {
      if(element.selected == true){
        if (this.optArray.length == 0){
          this.optArray = String(element.id);
        }
        else{
          this.optArray += ',' + String(element.id);
        }
        //list.push(element.id)
      }
    });
    //this.optArray = list;

    this.createCharts();

    return this.optArray;
  }


  selDeselCheckBoxesOnRDBClick(event: any){


    (document.getElementById("RdbNights") as HTMLInputElement).disabled = false;
    

    let elementId: string = (event.target as Element).id;

    let indx = Number(elementId);



    this.checkBoxesArray[indx].forEach((element: { selected: boolean; }) => element.selected = true);

    if (indx != this.radioBtnID) {
      this.checkBoxesArray[this.radioBtnID].forEach((element: { selected: boolean; }) => element.selected = false);
    }

    this.isDetaled[this.radioBtnID] = false;

    this.radioBtnID = indx;
    
    switch (this.radioBtnID) {
      case 0:
          this.selectedProperty = "All";        
          break;
  
        case 1:
          this.selectedProperty = "Gender";        
          break;
  
        case 2:
          this.selectedProperty = "AgeGroup";        
          break;
  
        case 3:
          this.selectedProperty = "ActivityType";        
          break;
  
        case 4:
          this.selectedProperty = "GoalType";        
          break;

        case 5:
          this.selectedProperty = "RateType";
          break;

        case 6:
          this.selectedProperty = "VisitActivity";
          break;
  
        case 7:
          this.selectedProperty = "TransportType";        
          break;
      
        default:
          break;
    }

    if (this.selectedProperty == "TransportType" || this.selectedProperty == "VisitActivity"){
      (document.getElementById("RdbVisits") as HTMLInputElement).checked = true;
      (document.getElementById("RdbNights") as HTMLInputElement).disabled = true;
    }

    this.optArray = "";
    
    if (indx != 0) {
      //let list: number[] = [];
  
      //this.checkBoxesArray[indx].forEach((element: { id: number; }) => { list.push(element.id) });
  
      this.checkBoxesArray[indx].forEach((element: { selected: boolean; id: number; }) => {
        if(element.selected == true){
          if (this.optArray.length == 0){
            this.optArray = String(element.id);
          }
          else{
            this.optArray += ',' + String(element.id);
          }
          //list.push(element.id)
        }
      });
    }
    else{
      this.optArray = "";
    }


    this.createCharts();

    return this.optArray;
  }

  getMapChart(tType: number, yr: number, opt: string, inOut: number, byProp: string, fl: string){
    let title: string = "";
    let title1: string = "";

    if (this.lang == 'GEO') {
      title = "ვიზიტების რაოდენობა (ათასი)";
      title1 = "ღამეების საშუალო რაოდენობა";
    }
    else{
      title = "Number of Visits (Thousands)";
      title1 = "Average Number of Nights";
    }

    if (this.flag == "visits"){
      this.region.getDataForMapChart(tType, yr, opt, inOut, byProp, fl).subscribe(res => { this.createMapChart(title, res); })
    }
    else {
      this.region.getDataForMapChart(tType, yr, opt, inOut, byProp, fl).subscribe(res => { this.createMapChart(title1, res); })
    }
  }

  
  createMapChart(title:any, res: DataForMapChart[]){
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chart1", am4maps.MapChart);

    // chart.colors.step = 3;;
    chart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
      am4core.color('#2A92A4'),
      am4core.color('#6A1AA4'),
      am4core.color('#33A450'),
      am4core.color('#A42030'),
    ];

    // chart.titles.create().text = title;

    this.mapChartTitle = title;

    chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/georgiaSouthOssetiaHigh.json";

    chart.geodataSource.events.on("parseended", function() {
      polygonSeries.data = [res[0], res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9], res[10]];
      polygonSeries1.data = [res[11], res[12]];
      polygonSeries2.data = [res[8]];
    })

    chart.projection = new am4maps.projections.Mercator();

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.include = ["GE-SZ", "GE-TB", "GE-IM", "GE-SK", "GE-AJ", "GE-SJ", "GE-KK", "GE-MM", "GE-GU", "GE-KA"];

    let polygonTemplate = polygonSeries.mapPolygons.template;
    
    polygonTemplate.tooltipText = "{name}: {value}";

    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      // min: chart.colors.getIndex(1).brighten(1),
      // max: chart.colors.getIndex(1).brighten(-0.3),
      min: chart.colors.getIndex(0).brighten(1),
      max: chart.colors.getIndex(0).brighten(-0.3),
      // minValue: 5,
      // maxValue: 500

    });



    let polygonSeries1 = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries1.useGeodata = true;
    polygonSeries1.include = ["GE-SO", "GE-AB"];

    let polygonTemplate1 = polygonSeries1.mapPolygons.template;
    
    polygonTemplate1.tooltipText = '{name}';

    // if (this.lang == 'GEO') {
    //   polygonTemplate1.tooltipText = "ოკუპირებული რეგიონი";
    // }
    // else{
    //   polygonTemplate1.tooltipText = "Occupied Region";
    // }

    polygonTemplate1.fill = am4core.color("#898a8a");



    let polygonSeries2 = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries2.useGeodata = true;
    polygonSeries2.include = ["GE-RL"];

    let polygonTemplate2 = polygonSeries2.mapPolygons.template;
    
    if (this.lang == 'GEO') {
      polygonTemplate2.tooltipText = "{name} - რეგიონის მონაცემები გაერთიანებულია იმერეთის რეგიონის მონაცემებთან";
    }
    else{
      polygonTemplate2.tooltipText = "{name} - The data of the region is combined with the data of the Imereti region";
    }

    

    polygonTemplate2.fill = am4core.color("#A38D5D");

    
    
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 1;

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

    chart.logo.disabled = true;
    
  }

  getExpenceChart(opt: string, byProp: string){
    this.region.getDataForExpenceTable(opt, byProp).subscribe(res => { this.expenceChart(res); })
  }

  expenceChart(res: any) {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chart2", am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.numberFormatter.numberFormat = '#';


    // chart.colors.step = 3;

    chart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
      am4core.color('#2A92A4'),
      am4core.color('#6A1AA4'),
      am4core.color('#33A450'),
      am4core.color('#A42030'),
    ];

    if (this.lang == 'GEO') {
      this.expenceTitle = "ხარჯები საცხოვრებელი რეგიონების მიხედვით";
    }
    else{
      this.expenceTitle = "Expenditures By Residential Regions";
    }


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.renderer.inside = true;
    //valueAxis.renderer.labels.template.disabled = true;
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = "#.0a"; 
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.min = 0;
    chart.data = res;

    if (this.lang == 'GEO') {
	      Object.keys(RegionID).filter((v) => isNaN(Number(v))).forEach(element => {
	      this.createSeries2(element, element, chart)
	    });
    }
    else{
      Object.keys(RegionIDEN).filter((v) => isNaN(Number(v))).forEach(element => {
	      this.createSeries2(element, element, chart)
	    });
    }

    // chart.legend = new am4charts.Legend();

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "top";
  }

  createSeries2(field : string, name : string, chart : any) {

    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "year";
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

    // Add label
    // let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    // labelBullet.label.text = "{valueY}";
    // labelBullet.locationY = 0.5;
    // labelBullet.label.hideOversized = true;

    chart.logo.disabled = true;

    return series;
  }

  animateBullet(bullet:any, animateBullet:any) {
    let duration = 3000 * Math.random() + 2000;
    let animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
    animation.events.on("animationended", function(event:any) {
        animateBullet(event.target.object);
    })
}

getMigrationChart(year: number, opt: string, prop: string){
  this.region.getDataForRegMigration(year, opt, prop).subscribe(res => { this.migrationChart(res); })
}

migrationChart(res: any) {
  am4core.useTheme(am4themes_animated);
  let chart = am4core.create("chart22", am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in


    const result = res.filter((item:any) => item.from === 'იმერეთი'   );
    chart.data = result;

    if (this.lang == 'GEO') {
      this.sanqiName = "ვიზიტების რაოდენობა რეგიონების მიხედვით";
    }
    else{
      this.sanqiName = "Number of Visits By Region";
    }


    let hoverState = chart.links.template.states.create("hover");
    hoverState.properties.fillOpacity = 0.6;
    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";
    
    chart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
      am4core.color('#2A92A4'),
      am4core.color('#6A1AA4'),
      am4core.color('#33A450'),
      am4core.color('#A42030'),
    ];

    chart.paddingRight = 150;
    chart.paddingTop = 40;
    chart.paddingBottom = 40;


    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = "Drag me!";
    nodeTemplate.showSystemTooltip = true;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer

    chart.logo.disabled = true;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "top";
  }

  // changeRegion(){
  //   let regions = []
  //   console.log('here')

    
  // }


}
