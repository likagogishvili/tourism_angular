import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { IDropDown } from 'src/app/common/IDropDown';

import { HotelsService } from './service/hotels.service';

@Component({
  selector: 'app-ht-hotels-georgia',
  templateUrl: './ht-hotels-georgia.component.html',
  styleUrls: ['./ht-hotels-georgia.component.scss'],
})
export class HtHotelsGeorgiaComponent implements AfterViewInit {
  constructor(private srv: HotelsService) {
    this.hotelTypes = this.srv.getHotelTypes();
    this.roomsNuber = this.srv.getRoomNumbers();
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  ngOnInit() {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.srv.getHotels(this.optList, this.numberString).subscribe((res) => {
      this.addMarkers(res);
    });
  }

  hotelTypes!: IDropDown[];

  hType: IDropDown = { name: 'სასტუმრო', value: 1, isDisabled: true };

  roomsNuber!: IDropDown[];

  room: IDropDown = { name: '6-10 ნომერი', value: 2, isDisabled: true };

  optList: string = '1';
  numberString: string = '2';

  map: any;

  hotels: any;

  markerList: L.Marker[] = [];

  markersLayer = new L.LayerGroup();

  buttonClick() {
    for (let i = 0; i < this.markerList.length; i++) {
      this.map.removeLayer(this.markerList[i]);
    }

    this.srv.getHotels(this.optList, this.numberString).subscribe((res) => {
      this.addMarkers(res);
    });
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [41.790462, 44.774773],
      zoom: 7,
    });

    const tiles: any = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  // getHotelInfo(taxId: number, marker: any){
  //   this.srv.getHotelInfo(taxId).subscribe(res => {
  //     marker.bindPopup('საიდენტიფიკაციო კოდი: ' + taxId + "<br/>" +
  //                       'ინფო: ' + '<a href="http://www.google.com">res.ownership_Type</a>"')
  //   })
  // }

  addMarkers(lst: any) {
    lst.forEach((element: { lat: number; lng: number; taxId: string }) => {
      let greenIcon = L.icon({
        iconUrl: '../../../assets/hotelIcons/hotelLocation.png',
        iconSize: [30, 30],
        // shadowUrl: 'leaf-shadow.png',
      });

      let marker = L.marker([element.lat, element.lng], {
        title: element.taxId,
        icon: greenIcon,
      });
      this.markerList.push(marker);
      marker.addTo(this.map);
      // this.getHotelInfo(Number(element.taxId), marker);
      if (this.lang == 'GEO') {
        let hrGeo = `http://br.geostat.ge/register_geo/index.php?action=enterprizes&srch1=${element.taxId}`;
        marker.bindPopup(
          'საიდენტიფიკაციო კოდი: ' +
            element.taxId +
            '<br/>' +
            `<center><a target="_blank" href=${hrGeo}>ინფო</a></center>`
        );
      } else {
        let hrEn = `http://br.geostat.ge/register_geo/index.php?action=enterprizes&srch1=${element.taxId}&lang=en`;

        marker.bindPopup(
          'Identification Code: ' +
            element.taxId +
            '<br/>' +
            `<center><a target="_blank" href=${hrEn}>Info</a></center>`
        );
      }
    });
  }

  checkUncheckAll(event: any) {
    if (event.target.checked) {
      this.hotelTypes.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            true)
      );
    } else {
      this.hotelTypes.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            false)
      );
    }

    this.addRemoveHotel();
  }

  checkUncheckAllRoom(event: any) {
    if (event.target.checked) {
      this.roomsNuber.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            true)
      );
    } else {
      this.roomsNuber.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            false)
      );
    }

    this.addRemoveHotel();
  }

  addRemoveHotel() {
    let list: string[] = [];
    this.hotelTypes.forEach((reg) => {
      if ((document.getElementById(reg.name) as HTMLInputElement).checked) {
        list.push(String(reg.value));
      }
    });

    this.optList = list.join();
  }

  addRemoveRoom() {
    let list: string[] = [];
    this.roomsNuber.forEach((reg) => {
      if ((document.getElementById(reg.name) as HTMLInputElement).checked) {
        list.push(String(reg.value));
      }
    });

    this.numberString = list.join();
  }

  getChart() {}
}
