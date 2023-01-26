import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataForMapChart } from './dataForMapChart';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/region';

  constructor(private http: HttpClient)
  {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  getYears(trmType: number) {

    var uRl = this.APIUrl + '/years?trmType=' + trmType;


    return this.http.get<number[]>(uRl);
  }

  getDataForMapChart(type: number, yr: number, opt: string, inOut: number, byProp: string, flag: string) {
    let uRl = this.APIUrl + '/mapChart?type=' + type + '&year=' + yr + '&opt=' + opt + '&inOut=' + inOut + '&byProp=' + byProp + '&flag=' + flag + '&lang=' + this.lang;

    return this.http.get<DataForMapChart[]>(uRl);
  }

  getDataForExpenceTable(opt: string, byProp: string){
    let url = this.APIUrl + '/expenceByRegions?opt=' + opt + '&byProp=' + byProp + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForRegMigration(year: number, opt: string, prop: string) {
    var uRl = this.APIUrl + '/regionMigration?year=' + year + '&opt=' + opt + '&byProp=' + prop + '&lang=' + this.lang;

    return this.http.get<any>(uRl);
  }

  // years = this.getYears();

  gendersGE = [
    { name: "ქალი", selected: false, id: 1 },
    { name: "კაცი", selected: false, id: 2 }
  ];

  gendersEN = [
    { name: "Female", selected: false, id: 1 },
    { name: "Male", selected: false, id: 2 }
  ];

  genders(){
    if (this.lang == 'GEO') {
      return this.gendersGE;
    }
    else{
      return this.gendersEN;
    }
  }

  ages = [
    { name: "15-30", selected: false, id: 1 },
    { name: "31-50", selected: false, id: 2 },
    { name: "51+", selected: false, id: 3 }
    //{ name: "სამოცდათერთმეტი_პლიუს", selected: false, id: 4 }
  ];

  activityesGE = [
    { name: "დაქირავებული", selected: false, id: 1 },
    { name: "თვითდასაქმებული", selected: false, id: 2 },
    { name: "პენსიონერი", selected: false, id: 4 },
    { name: "დიასახლისი", selected: false, id: 5 },
    { name: "უმუშევარი", selected: false, id: 7 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  activityesEN = [
    { name: "Hired employee", selected: false, id: 1 },
    { name: "Self-employed", selected: false, id: 2 },
    { name: "Pensioner/Retired", selected: false, id: 4 },
    { name: "Housewife", selected: false, id: 5 },
    { name: "Unemployed", selected: false, id: 7 },
    { name: "Other status", selected: false, id: 66 }
  ];

  activityes(){
    if (this.lang == 'GEO') {
      return this.activityesGE;
    }
    else{
      return this.activityesEN;
    }
  }

  goalsGE = [
    { name: "დასვენება", selected: false, id: 1 },
    { name: "მეგობრები", selected: false, id: 2 },
    { name: "მკურნალობა", selected: false, id: 4 },
    { name: "შოპინგი", selected: false, id: 6 },
    { name: "ტრანზიტი", selected: false, id: 8 },
    { name: "საქმიანობა", selected: false, id: 9 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  goalsEN = [
    { name: "Holiday, Leisure, Recreation", selected: false, id: 1 },
    { name: "Visiting friends/relatives", selected: false, id: 2 },
    { name: "Health and Medical Care", selected: false, id: 4 },
    { name: "Shopping", selected: false, id: 6 },
    { name: "Transit on the way to another country", selected: false, id: 8 },
    { name: "Business or Professional", selected: false, id: 9 },
    { name: "Other purpose", selected: false, id: 66 }
  ];

  goals(){
    if (this.lang == 'GEO') {
      return this.goalsGE;
    }
    else{
      return this.goalsEN;
    }
  }

  visitsGE = [
    { name: "კულტურული", selected: false, id: 1 },
    { name: "ზღვა", selected: false, id: 2 },
    { name: "ბუნება", selected: false, id: 4 },
    { name: "ჭამა_სმა", selected: false, id: 13 },
    { name: "შოპინგი", selected: false, id: 20 },
    { name: "მეგობრები", selected: false, id: 21 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  visitsEN = [
    { name: "Sightseeing/Visiting cultural and historical heritage/Museums", selected: false, id: 1 },
    { name: "Going to the beach/Swimming in the sea/lake/river", selected: false, id: 2 },
    { name: "Visiting national parks/Nature/Landscape, exploring remote and exotic places", selected: false, id: 4 },
    { name: "Tasting local cuisine and wine", selected: false, id: 13 },
    { name: "Shopping", selected: false, id: 20 },
    { name: "Visiting friends/relatives", selected: false, id: 21 },
    { name: "Other activity", selected: false, id: 66 }
  ];

  visits(){
    if (this.lang == 'GEO') {
      return this.visitsGE;
    }
    else{
      return this.visitsEN;
    }
  }

  transportsGE = [
    { name: "ავტობუსი", selected: false, id: 3 },
    { name: "მანქანა", selected: false, id: 4 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  transportsEN = [
    { name: "Bus/Minibus", selected: false, id: 3 },
    { name: "Own/relatives car", selected: false, id: 4 },
    { name: "Other transport", selected: false, id: 66 }
  ];

  transports(){
    if (this.lang == 'GEO') {
      return this.transportsGE;
    }
    else{
      return this.transportsEN;
    }
  }

  ratesGE = [
    { name: "ძალიანუკმაყოფილო", selected: false, id: 1 },
    { name: "უკმაყოფილო", selected: false, id: 2 },
    { name: "არცერთი", selected: false, id: 3 },
    { name: "კმაყოფილი", selected: false, id: 4 },
    { name: "ძალიანკმაყოფილი", selected: false, id: 5 },
    { name: "სხვა", selected: false, id: 99 }
  ];

  ratesEN = [
    { name: "Very Dissatisfied", selected: false, id: 1 },
    { name: "Dissatisfied", selected: false, id: 2 },
    { name: "Neither satisfied, nor dissatisfied", selected: false, id: 3 },
    { name: "Satisfied", selected: false, id: 4 },
    { name: "Very satisfied", selected: false, id: 5 },
    { name: "I don't know/hard to answer", selected: false, id: 99 }
  ];

  rates(){
    if (this.lang == 'GEO') {
      return this.ratesGE;
    }
    else{
      return this.ratesEN;
    }
  }
  


  
  getOptionList(opt: number, optionList: number[]): number[]{
    
    optionList.push(opt);

    return optionList;
  }
}
