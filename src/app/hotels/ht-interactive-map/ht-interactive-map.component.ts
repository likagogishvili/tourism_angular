import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ht-interactive-map',
  templateUrl: './ht-interactive-map.component.html',
  styleUrls: ['./ht-interactive-map.component.scss'],
})
export class HtInteractiveMapComponent implements OnInit {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/hotels';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
    this.getYears();
  }

  ngOnInit(): void {
    this.getRaceChart(this.lang);
    this.getBigChart('', this.lang);
    this.getMapData(this.year, this.lang);
  }

  lang: any;
  years!: number[];
  year: number = 2021;
  mapData: any;
  chartData!: any;
  searchText: string = '';
  countryId: string = '';
  chosenCountryName: string = '';

  result: any = [];
  filteredChartData: any = [];

  yearChange() {
    this.getMapData(this.year, this.lang);
  }

  getYears() {
    var uRl = this.APIUrl + '/yaersForIntyeractive';

    this.http.get<any>(uRl).subscribe((res) => {
      this.years = res;
    });
  }

  getMapData(year: number, language: string) {
    var uRl =
      this.APIUrl + '/getMapChartData?year=' + year + '&lang=' + language;

    this.http.get<any>(uRl).subscribe((res) => {
      this.chartData = res;
      this.mapChart(this.chartData);
      this.filteredChartData = this.chartData.filter(
        (i: any) => i.countryName !== undefined
      );
    });
  }

  checkCountryes: boolean = false;
  sortCountryes() {
    this.checkCountryes = !this.checkCountryes;
    if (this.checkCountryes) {
      this.filteredChartData.sort((a: any, b: any) =>
        b.countryName.localeCompare(a.countryName)
      );
    } else {
      this.filteredChartData.sort((a: any, b: any) =>
        a.countryName.localeCompare(b.countryName)
      );
    }
  }

  country: any;
  countryName: any;

  zoomToCountry(cid: string) {
    let country = this.polygonSeries.getPolygonById(cid);
    this.map.zoomToMapObject(country);
  }

  getFlag(country: string) {
    if (country) {
      let dataForCountryId = this.chartData.filter((i: any) => {
        return i.countryName === country;
      });
      this.countryId =
        'assets/flags/' + dataForCountryId[0].id.toLowerCase() + '.svg';
      this.chosenCountryName = country;
    } else {
      this.countryId = 'assets/header/word.png';
    }
  }

  visits: boolean = false;

  sortDataByVisits() {
    this.visits = !this.visits;
    if (this.visits) {
      this.filteredChartData = this.filteredChartData.sort(
        (a: any, b: any) => b.value - a.value
      );
    } else {
      this.filteredChartData = this.filteredChartData.sort(
        (a: any, b: any) => a.value - b.value
      );
    }
  }

  polygonSeries: any;
  map: any;

  mapChart(res: any[]) {
    this.map = am4core.create('mapchart', am4maps.MapChart);

    this.map.geodata = am4geodata_worldLow;

    this.map.projection = new am4maps.projections.Miller();

    this.polygonSeries = new am4maps.MapPolygonSeries();
    this.polygonSeries.useGeodata = true;
    this.map.series.push(this.polygonSeries);

    let polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{countryName} - {value}';
    polygonTemplate.fill = am4core.color('#E2E9F9');

    // polygonTemplate.tooltipText = "{name}: {value}";

    polygonTemplate.events.on(
      'hit',
      (ev: {
        target: {
          series: { chart: { zoomToMapObject: (arg0: any) => void } };
          dataItem: { dataContext: any };
        };
      }) => {
        ev.target.series.chart.zoomToMapObject(ev.target);

        this.country = ev.target.dataItem.dataContext;

        this.countryName = this.country.countryName;

        this.getBigChart(this.countryName, this.lang);
      }
    );

    polygonTemplate.nonScalingStroke = true;
    this.polygonSeries.data = res;

    this.polygonSeries.heatRules.push({
      property: 'fill',
      target: this.polygonSeries.mapPolygons.template,
      min: am4core.color('#8880d1'),
      max: am4core.color('#323C95'),

      minValue: 1000,
      maxValue: 100000,
      //"dataField": "valueY"
    });

    let a = this.map;
    a.logo.disabled = true;
    a.language.locale['_thousandSeparator'] = ' ';

    let button = a.chartContainer.createChild(am4core.Button);
    button.padding(5, 5, 5, 5);
    button.align = 'right';
    button.marginRight = 15;
    button.events.on('hit', () => {
      this.countryName = '';
      a.goHome();
      this.getBigChart(this.countryName, this.lang);
    });
    button.icon = new am4core.Sprite();
    button.icon.path =
      'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#6774A3');

    this.polygonSeries.exclude = ['AQ'];
  }

  bigChart: any;

  didiChart(res: any, country: string) {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    this.bigChart = am4core.create('chartdiv2', am4charts.XYChart);
    let categoryAxis = this.bigChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    this.bigChart.colors.step = 3;

    let valueAxis = this.bigChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.0a';
    valueAxis.renderer.grid.template.location = 0;
    this.bigChart.data = res;

    this.createSeries5('Value', country, this.bigChart);

    this.bigChart.legend = new am4charts.Legend();

    this.bigChart.exporting.menu = new am4core.ExportMenu();
    this.bigChart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    this.bigChart.exporting.menu.align = 'right';
    this.bigChart.exporting.menu.verticalAlign = 'top';
  }

  createSeries5(field: string, name: string, chart: any) {
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
    series.columns.template.width = am4core.percent(90);
    if (this.lang == 'GEO') {
      series.columns.template.tooltipText =
        '[bold]{name}[/]\n[font-size:14px]{categoryX} წელს: [bold]{valueY.formatNumber("#.0a")} ვიზიტი';
    } else {
      series.columns.template.tooltipText =
        '[bold]{name}[/]\n[font-size:14px]{categoryX} Year: [bold]{valueY.formatNumber("#.0a")} Visits';
    }

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY.formatNumber("#.0a")}';
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }

  getBigChart(country: string = '', lang: string) {
    this.getFlag(country);
    var uRlForBigChart =
      this.APIUrl + '/bigChart?country=' + country + '&lang' + lang;

    this.http.get<any>(uRlForBigChart).subscribe((res) => {
      this.didiChart(res, country);
    });
  }

  getRaceChart(lang: string) {
    var uRlForBigChart = this.APIUrl + '/race?lang=' + lang;

    this.http.get<any>(uRlForBigChart).subscribe((res) => {
      this.createRaceChart(res);
    });
  }

  createRaceChart(res: any) {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 4.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.logo.disabled = true;

    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: 'K' },
      { number: 1e6, suffix: 'M' },
      { number: 1e9, suffix: 'B' },
    ];

    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = 'right';
    label.verticalCenter = 'middle';
    label.dx = -15;
    label.fontSize = 50;

    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = 'middle';
    playButton.events.on('toggled', function (event) {
      if (event.target.isActive) {
        play();
      } else {
        stop();
      }
    });

    var stepDuration = 4000;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'country';
    series.dataFields.valueX = 'value';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'right';
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = 'end';
    labelBullet.label.dx = -10;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function (fill, target: any) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    var year = 2006;
    label.text = year.toString();

    var interval: any;

    function play() {
      interval = setInterval(function () {
        nextYear();
      }, stepDuration);
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year++;

      if (year > 2021) {
        year = 2006;
      }

      var newData: any = res[year];
      var itemsWithNonZero = 0;
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].value = newData[i].value;
        if (chart.data[i].value > 0) {
          itemsWithNonZero++;
        }
      }

      if (year == 2006) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      } else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({
        start: 0,
        end: itemsWithNonZero / categoryAxis.dataItems.length,
      });
    }

    categoryAxis.sortBySeries = series;

    chart.data = JSON.parse(JSON.stringify(res[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    series.events.on('inited', function () {
      setTimeout(function () {
        playButton.isActive = true; // this starts interval
      }, 2000);
    });
  }
}
