import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  hotelTypes: any;

  hotelTypesGE: IDropDown[] = [
    { name: 'სასტუმრო', value: 1, isDisabled: true },
    { name: 'კემპინგი', value: 3, isDisabled: false },
    // {name: "კოტეჯი", value: 3, isDisabled: false},
    { name: 'სასტუმრო სახლი', value: 5, isDisabled: false },
    { name: 'კოტეჯი ან სახლი მასპინძლის გარეშე', value: 6, isDisabled: false },
  ];

  hotelTypesEN: IDropDown[] = [
    { name: 'Hotel', value: 1, isDisabled: true },
    { name: 'Camping', value: 3, isDisabled: false },
    // {name: "Cottage", value: 3, isDisabled: false},
    { name: 'Guest House', value: 5, isDisabled: false },
    { name: 'A Cottage or House Without a Host', value: 6, isDisabled: false },
  ];

  getHotelTypes() {
    if (this.lang === 'ENG') {
      return this.hotelTypesEN;
    } else {
      return this.hotelTypesGE;
    }
  }

  getRoomNumbers() {
    if (this.lang === 'ENG') {
      return this.roomsNuberEN;
    } else {
      return this.roomsNuberGE;
    }
  }

  roomsNuberGE: IDropDown[] = [
    { name: '1-5 ნომერი', value: 1, isDisabled: false },
    { name: '6-10 ნომერი', value: 2, isDisabled: true },
    { name: '11-15 ნომერი', value: 3, isDisabled: false },
    { name: '16-20 ნომერი', value: 4, isDisabled: false },
    { name: '21-30 ნომერი', value: 5, isDisabled: false },
    { name: '31-50 ნომერი', value: 6, isDisabled: false },
    { name: '51-100 ნომერი', value: 7, isDisabled: false },
    { name: '101+ ნომერი', value: 8, isDisabled: false },
  ];

  roomsNuberEN: IDropDown[] = [
    { name: '1-5 Number', value: 1, isDisabled: false },
    { name: '6-10 Number', value: 2, isDisabled: true },
    { name: '11-15 Number', value: 3, isDisabled: false },
    { name: '16-20 Number', value: 4, isDisabled: false },
    { name: '21-30 Number', value: 5, isDisabled: false },
    { name: '31-50 Number', value: 6, isDisabled: false },
    { name: '51-100 Number', value: 7, isDisabled: false },
    { name: '101+ Number', value: 8, isDisabled: false },
  ];

  getHotels(innType: string, rooms: string) {
    return this.http.get<any>(
      this.APIUrl + '/locations?innType=' + innType + '&rooms=' + rooms
    );
  }

  getHotelInfo(taxId: number) {
    return this.http.get<any>(
      this.APIUrl + '/hotelsFromRegistre?taxId=' + taxId
    );
  }
}
