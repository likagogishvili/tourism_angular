import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataForMapChart } from './dataForMapChart';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/region';

  constructor(private http: HttpClient) { }

  getYears(trmType: number) {

    var uRl = this.APIUrl + '/years?trmType=' + trmType;


    return this.http.get<number[]>(uRl);
  }

  getDataForMapChart(type: number, yr: number, opt: string, inOut: number, byProp: string, flag: string) {
    let uRl = this.APIUrl + '/mapChart?type=' + type + '&year=' + yr + '&opt=' + opt + '&inOut=' + inOut + '&byProp=' + byProp + '&flag=' + flag;

    return this.http.get<DataForMapChart[]>(uRl);
  }

  getDataForExpenceTable(opt: string, byProp: string){
    let url = this.APIUrl + '/expenceByRegions?opt=' + opt + '&byProp=' + byProp;

    return this.http.get<any>(url);
  }

  getDataForRegMigration(year: number, opt: string, prop: string) {
    var uRl = this.APIUrl + '/regionMigration?year=' + year + '&opt=' + opt + '&byProp=' + prop;

    return this.http.get<any>(uRl);
  }

  // years = this.getYears();

  genders = [
    { name: "ქალი", selected: false, id: 1 },
    { name: "კაცი", selected: false, id: 2 }
  ];

  ages = [
    { name: "15-30", selected: false, id: 1 },
    { name: "31-50", selected: false, id: 2 },
    { name: "51+", selected: false, id: 3 }
    //{ name: "სამოცდათერთმეტი_პლიუს", selected: false, id: 4 }
  ];

  activityes = [
    { name: "დაქირავებული", selected: false, id: 1 },
    { name: "თვითდასაქმებული", selected: false, id: 2 },
    { name: "პენსიონერი", selected: false, id: 4 },
    { name: "დიასახლისი", selected: false, id: 5 },
    { name: "უმუშევარი", selected: false, id: 7 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  goals = [
    { name: "დასვენება", selected: false, id: 1 },
    { name: "მეგობრები", selected: false, id: 2 },
    { name: "მკურნალობა", selected: false, id: 4 },
    { name: "შოპინგი", selected: false, id: 6 },
    { name: "ტრანზიტი", selected: false, id: 8 },
    { name: "საქმიანობა", selected: false, id: 9 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  visits = [
    { name: "კულტურული", selected: false, id: 1 },
    { name: "ზღვა", selected: false, id: 2 },
    { name: "ბუნება", selected: false, id: 4 },
    { name: "ჭამა_სმა", selected: false, id: 13 },
    { name: "შოპინგი", selected: false, id: 20 },
    { name: "მეგობრები", selected: false, id: 21 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  transports = [
    { name: "ავტობუსი", selected: false, id: 3 },
    { name: "მანქანა", selected: false, id: 4 },
    { name: "სხვა", selected: false, id: 66 }
  ];

  rates = [
    { name: "ძალიანუკმაყოფილო", selected: false, id: 1 },
    { name: "უკმაყოფილო", selected: false, id: 2 },
    { name: "არცერთი", selected: false, id: 3 },
    { name: "კმაყოფილი", selected: false, id: 4 },
    { name: "ძალიანკმაყოფილი", selected: false, id: 5 },
    { name: "სხვა", selected: false, id: 99 }
  ];


  


  
  getOptionList(opt: number, optionList: number[]): number[]{
    
    optionList.push(opt);

    return optionList;
  }
}
