import { object } from '@amcharts/amcharts4/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgeGroup } from 'src/app/common/AgeGroup';
import { Gender } from 'src/app/common/Gender';
import { Gender1 } from 'src/app/common/Gender1';
import { IDropDown } from 'src/app/common/IDropDown';
import { TourismType } from 'src/app/common/TourismType';
import { TourType } from 'src/app/common/TourType';

@Injectable({
  providedIn: 'root'
})
export class SesonalService {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Visitors';

  constructor(private http: HttpClient) { }

  // tTypes: string[] = [
  //   "ადგილობრივი ტურიზმი",
  //   "უცხოელი ვიზიტორები",
  //   "გამყვანი ტურიზმი"
  // ];

  tTypes: IDropDown[] = [
    { name: "უცხოელი ვიზიტორები", value: 2, isDisabled: false },
    { name: "ადგილობრივი ტურიზმი", value: 1, isDisabled: false },    
    { name: "გამყვანი ტურიზმი", value: 3, isDisabled: false }
  ];



  getTourismTypes(): IDropDown[] {
    
    return this.tTypes;
  }

  getVisitTypes(): IDropDown[]{
    let vTypes: IDropDown[] = [];

    let keys = object.keys(TourType).filter(x => isNaN(Number(x)));

    keys.forEach(element => {
      
      vTypes.push({ name: element, value: TourType[element], isDisabled: false })
    });

    return vTypes;
  }

  getGenders(): IDropDown[]{
    let gender: IDropDown[] = [];

    let keys = object.keys(Gender1).filter(x => isNaN(Number(x)));

    keys.forEach(element => {
      
      gender.push({ name: element, value: Gender1[element], isDisabled: false })
    });

    return gender;
  }

  ages: string[] = [
    "ყველა",
    "15-30",
    "31-50",
    "51-70",
    "70+"
  ];

  getAges(): IDropDown[]{
    let age: IDropDown[] = [];

    for (let index = 0; index < this.ages.length; index++) {
      age.push({ name: this.ages[index], value: index, isDisabled: false })
    }

    return age;
  }
}
