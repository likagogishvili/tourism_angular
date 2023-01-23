import { Injectable } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';
import { IDropDownSt } from 'src/app/common/IdropDownSt';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComparisionService {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Comperision';

  constructor(private http: HttpClient) { }

  getYears() {
    var uRl = this.APIUrl + '/compYears';

    return this.http.get<number[]>(uRl);
  }

  quarters: IDropDown[] = [
    { name: 'ყველა', value: 0, isDisabled: false },
    { name: 'I', value: 1, isDisabled: false },
    { name: 'II', value: 2, isDisabled: false },
    { name: 'III', value: 3, isDisabled: false },
    { name: 'IV', value: 4, isDisabled: false },
  ];

  getQuarters() {
    return this.quarters;
  }

  indicMain: IDropDownSt[] = [
    { name: 'მიზანი', value: 'Goal', isDisabled: false },
    { name: 'აქტივობა', value: 'Visit', isDisabled: false },
    { name: 'შეფასება', value: 'Rate', isDisabled: false },
    { name: 'ტრანსპორტი', value: 'Transport', isDisabled: false },
    { name: 'რიგითობა', value: 'Sequence', isDisabled: false },
    { name: 'დანახარჯი', value: 'Expence', isDisabled: false },
  ];

  getIndicMain() {
    return this.indicMain;
  }

  indicHelp: IDropDownSt[] = [
    { name: 'ყველა', value: 'All', isDisabled: false },
    { name: 'ვიზიტის ტიპი', value: 'TourType', isDisabled: false },
    { name: 'სქესი', value: 'Gender', isDisabled: false },
    { name: 'ასაკი', value: 'Age', isDisabled: false},
    { name: 'ეკონომიური სტატუსი', value: 'Activity', isDisabled: false},
  ];

  getIndicHelp() {
    return this.indicHelp;
  }

  Ages: string[] = [
    "15-30",
    "31-50",
    "51+"
  ];

  Genders: string[] = [
    "ქალი",
    "კაცი"
  ];

  Activityes: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",                                                   
    "სტუდენტი",
    "პენსიონერი",
    "დიასახლისი/ოჯახში უსასყიდლოდ მომუშავე",
    "უმუშევარი",
    "სხვა სტატუსი"
  ];

  Visits: string[] = [
    "ღირსშესანიშნაობების/კულტურული და ისტორიული მემკვიდრეობის ძეგლების/მუზეუმების მონახულება",
    "ზღვაზე/ტბაზე/მდინარეზე ცურვა /სანაპიროზე გასვლა",
    "ბუნების/ლანდშაფტის/ნაკრძალების მონახულება, უცნობი და ეგზოტიკური ადგილების აღმოჩენა",
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "ადგილობრივი ხელოვნების, კულტურის, ენის, ისტორიის გაცნობა",
    "რელიგიური ადგილების მონახულება/მოლოცვა",
    "შოპინგი (სამომხმარებლო საქონლის ყიდვა პირადი მოხმარებისთვის ან საჩუქრად)",
    "მეგობრების/ნათესავების მონახულება",
    "სხვა აქტივობა"
  ];

  Goals: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "მკურნალობა, გაჯანსაღება",
    "შოპინგი",
    "ტრანზიტი სხვა ქვეყანაში გადასასვლელად",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  Rates: string[] = [
    "არ ვიცი/მიჭირს პასუხის გაცემა",
    "ძალიან უკმაყოფილო",
    "უკმაყოფილო",
    "არც კმაყოფილი, არც უკმაყოფილო",
    "კმაყოფილი",
    "ძალიან კმაყოფილი"
  ];


  Transports: string[] = [
    "საჰაერო ტრანსპორტი",
    "ავტობუსი/მიკროავტობუსი",
    "სახმელეთო ტრანსპორტი",
    "საკუთარი/ახლობლის ავტომობილი",
    "სხვა ტრანსპორტი"
  ];

  Sequences: string[] = [
    "პირველი ვიზიტი",
    "განმეორებითი ვიზიტი"
  ];

  TourTypes: string[] = [
    "ექსკურსანტი",
    "ტურისიტი"
  ];
}
