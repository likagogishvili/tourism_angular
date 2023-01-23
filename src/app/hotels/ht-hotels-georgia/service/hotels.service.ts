import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  constructor(private http: HttpClient) { }


  hotelTypes: IDropDown[] = [
    {name: "სასტუმრო", value: 1, isDisabled: true},
    {name: "კემპინგი", value: 3, isDisabled: false},
    {name: "კოტეჯი", value: 4, isDisabled: false},
    {name: "სასტუმრო სახლი", value: 5, isDisabled: false},
    {name: "კოტეჯი ან სახლი მასპინძლის გარეშე", value: 6, isDisabled: false},
  ];


  roomsNuber: IDropDown[] = [
    {name: "1-5 ნომერი", value: 1, isDisabled: false},
    {name: "6-10 ნომერი", value: 2, isDisabled: true},
    {name: "11-15 ნომერი", value: 3, isDisabled: false},
    {name: "16-20 ნომერი", value: 4, isDisabled: false},
    {name: "21-30 ნომერი", value: 5, isDisabled: false},
    {name: "31-50 ნომერი", value: 6, isDisabled: false},
    {name: "51-100 ნომერი", value: 7, isDisabled: false},
    {name: "101+ ნომერი", value: 8, isDisabled: false}
  ];

  getHotels(innType: string, rooms: string){

    return this.http.get<any>(this.APIUrl + '/locations?innType=' + innType + '&rooms=' + rooms);

  }

  getHotelInfo(taxId: number){

    return this.http.get<any>(this.APIUrl + '/hotelsFromRegistre?taxId=' + taxId);

  }

}
