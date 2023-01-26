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

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

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

  tTypesEN: IDropDown[] = [
    { name: "Inbound Tourism", value: 2, isDisabled: false },
    { name: "Domestic Tourism", value: 1, isDisabled: false },    
    { name: "Outbound Tourism", value: 3, isDisabled: false }
  ];


  getTourismTypes(): IDropDown[] {
    
    if (this.lang == 'GEO') {
      return this.tTypes;
    }
    else{
      return this.tTypesEN;
    }
  }

  getVisitTypes(): IDropDown[]{
    let vTypes: IDropDown[] = [];

    let keys;

    if(this.lang == 'GEO'){
      keys = object.keys(TourType).filter(x => isNaN(Number(x)));

      keys.forEach(element => {      
        vTypes.push({ name: element, value: TourType[element], isDisabled: false })
      });
    }
    else{
      vTypes.push({ name: "Total", value: 0, isDisabled: false });
      vTypes.push({ name: "Same-day Visit", value: 1, isDisabled: false });
      vTypes.push({ name: "Tourist Visit", value: 2, isDisabled: false });
    }

    

    return vTypes;
  }

  getGenders(): IDropDown[]{
    let gender: IDropDown[] = [];

    if (this.lang == 'GEO') {
      let keys = object.keys(Gender1).filter(x => isNaN(Number(x)));      
        keys.forEach(element => {          
          gender.push({ name: element, value: Gender1[element], isDisabled: false })
        });
    }
    else{
      gender.push({ name: "All", value: 0, isDisabled: false });
      gender.push({ name: "Female", value: 1, isDisabled: false });
      gender.push({ name: "Male", value: 2, isDisabled: false });
    }

    return gender;
  }

  ages: string[] = [
    "ყველა",
    "15-30",
    "31-50",
    "51-70",
    "70+"
  ];

  agesEN: string[] = [
    "All",
    "15-30",
    "31-50",
    "51-70",
    "70+"
  ];

  getAges(): IDropDown[]{
    let age: IDropDown[] = [];

    if (this.lang == 'GEO') {
	    for (let index = 0; index < this.ages.length; index++) {
	      age.push({ name: this.ages[index], value: index, isDisabled: false })
	    }
    }
    else{
      for (let index = 0; index < this.agesEN.length; index++) {
	      age.push({ name: this.agesEN[index], value: index, isDisabled: false })
	    }
    }

    return age;
  }
}
