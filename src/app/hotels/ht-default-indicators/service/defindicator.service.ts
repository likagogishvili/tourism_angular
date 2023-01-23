import { object } from '@amcharts/amcharts4/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryGroup } from 'src/app/common/CountryGroup';
import { IDropDown } from 'src/app/common/IDropDown';
import { RegionID } from 'src/app/common/RegionID';

@Injectable({
  providedIn: 'root'
})
export class DefindicatorService {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  constructor(private http: HttpClient) { }


  indicators: IDropDown[] = [
    { name: "სასტუმროების რაოდენობა", value: 1, isDisabled: false },
    { name: "სტუმრების რაოდენობა", value: 2, isDisabled: false }
  ];

  getYears() {
    return this.http.get<any>(this.APIUrl + '/year');
  }

  getRegions(): IDropDown[] {
    let regions: IDropDown[] = [];

    let keys = object.keys(RegionID).filter(x => isNaN(Number(x)));

    keys.forEach(element => {
      
      if (element == "იმერეთი_რაჭა_ლეჩხუმი_ქვემოსვანეთი") {
        regions.push({ name: "იმერეთი_რაჭა_ლეჩხუმი", value: RegionID[element], isDisabled: false })
      }
      else {
        regions.push({ name: element, value: RegionID[element], isDisabled: false })
      }
    });


    return regions;
  }


  getCountryGroups() : IDropDown[] {
    let groups: IDropDown[] = [];

    let keys = object.keys(CountryGroup).filter(x => isNaN(Number(x)));

    keys.forEach(element => {      
      groups.push({ name: element, value: CountryGroup[element], isDisabled: false })
    });


    return groups;
  }


  getMainChartData(optList: string, year: number) {
    var url = this.APIUrl + '/sanqiHotel?optSt=' + optList + '&year=' + year;

    return this.http.get<any>(url);
  }

  getMainChartDataGuests(optList: string, year: number) {
    var url = this.APIUrl + '/sanqiGuests?optSt=' + optList + '&year=' + year;

    return this.http.get<any>(url);
  }

  getDataForHotelCount(optList: string) {
    
    var url = this.APIUrl + '/hotelCount?optSt=' + optList;

    return this.http.get<any>(url);
  }

  getDataForRoomBad(optList: string) {
    
    var url = this.APIUrl + '/roomsAndBeds?optSt=' + optList;

    return this.http.get<any>(url);
  }

  getDataForGuestCount(optList: string) {
    
    var url = this.APIUrl + '/guests?optSt=' + optList;

    return this.http.get<any>(url);
  }

  getDataForIncoms(optList: string) {
    
    var url = this.APIUrl + '/revenue?optSt=' + optList;

    return this.http.get<any>(url);
  }


  getDataForGender(optList: string) {
    
    var url = this.APIUrl + '/employes?optSt=' + optList;

    return this.http.get<any>(url);
  }

  getDataForCoasts(optList: string) {
    
    var url = this.APIUrl + '/coasts?optSt=' + optList;

    return this.http.get<any>(url);
  }
}
