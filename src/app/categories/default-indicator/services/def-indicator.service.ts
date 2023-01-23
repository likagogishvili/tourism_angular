import { Injectable } from '@angular/core';
import { IDropDown } from '../../../common/IDropDown';
@Injectable({
  providedIn: 'root'
})
export class DefIndicatorService {

  constructor() { }
  
  periods: IDropDown[] = [
    { name: 'წლიური', value: 1, isDisabled: false },
    { name: 'კვარტალური', value: 2, isDisabled: false },
    { name: 'ყოველთვიური', value: 3, isDisabled: false }
  ];

  getPeriods() {
    return this.periods;
  }

  selPeriod = { name: 'წლიური', value: 1 };

  vTypes: IDropDown[] = [
    { name: 'ყველა', value: 0, isDisabled: false },
    { name: 'ექსკურსიული', value: 1, isDisabled: false },
    { name: 'ტურისტული', value: 2, isDisabled: false }
  ];
  
  getVtypes() {
    return this.vTypes;
  }

  selVtype = { name: 'ყველა', value: 0 };

  tTypes: IDropDown[] = [
    { name: 'უცხოელი ვიზიტორები', value: 1, isDisabled: false },
    { name: 'გამყვანი ტურიზმი', value: 2, isDisabled: false },
    { name: 'ადგილობრივი ტურიზმი', value: 3, isDisabled: false }
  ];

  getTtypes() {
    return this.tTypes;
  }

  selTtype = { name: 'უცხოელი ვიზიტორები', value: 1 };

  indicators: IDropDown[] = [
    { name: 'ყველა', value: 0, isDisabled: false },
    { name: 'ეკონომიკური სტატუსი', value: 1, isDisabled: false },
    { name: 'ასაკი', value: 2, isDisabled: false },
    { name: 'სქესი', value: 3, isDisabled: false },
    { name: 'ვიზიტის მიზანი', value: 4, isDisabled: false },
    { name: 'კმაყოფილების დონე', value: 5, isDisabled: false },
    { name: 'ვიზიტის ტიპი', value: 6, isDisabled: false },

    //{ indicator: 'კვარტალი', value: 7 },
    //{ indicator: 'თვე', value: 8 },

    { name: 'ტრანსპორტი', value: 9, isDisabled: false },
    { name: 'აქტივობა', value: 10, isDisabled: false },
    { name: 'ვიზიტის რიგითობა', value: 11, isDisabled: false },
    { name: 'მონახულებული ქვეყნები', value: 12, isDisabled: true }
  ];
  getIndicators() {
    return this.indicators;
  }

  selIndicator = { name: 'ყველა', value: 0 };
  

  ActivityNames1: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "უმუშევარი",
    "სტუდენტი",
    "სხვა სტატუსი"
  ];

  ActivityNames2: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "დიასახლისი/ოჯახში უსასყიდლოდ მომუშავე",
    "სხვა სტატუსი"
  ];

  ActivityNames3: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "პენსიონერი",
    "დიასახლისი",
    "უმუშევარი",
    "სხვა სტატუსი"
  ];

  AgeNames1: string[] = [
    "15-30",
    "31-50",
    "51-70",
    "71+"
  ];

  AgeNames3: string[] = [
    "15-30",
    "31-50",
    "51+",
    
  ];


  GenderNames: string[] = [
    "კაცი",
    "ქალი"
  ];


  GoalNames1: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "შოპინგი",
    "ტრანზიტი სხვა ქვეყანაში გადასასვლელად",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  GoalNames2: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "შოპინგი",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა პირადი მიზანი"
  ];

  GoalNames3: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "მკურნალობა, გაჯანსაღება",
    "შოპინგი",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  RateNames: string[] = [
    "არ ვიცი/მიჭირს პასუხის გაცემა",
    "ძალიან უკმაყოფილო",
    "უკმაყოფილო",
    "არც კმაყოფილი, არც უკმაყოფილო",
    "კმაყოფილი",
    "ძალიან კმაყოფილი"
  ];

  
  TourNames: string[] = [
    "ტურისტი",
    "ექსკურსანტი"
  ];


  TransportNames1: string[] = [
    "სახმელეთო ტრანსპორტი",
    "საჰაერო ტრანსპორტი",
    "სხვა ტრანსპორტი"
  ];

  TransportNames2: string[] = [
    "საჰაერო ტრანსპორტი",
    "სახმელეთო ტრანსპორტი",
    "საზღვაო ტრანსპორტი",
    "სხვა ტრანსპორტი"
  ];

  TransportNames3: string[] = [
    "ავტობუსი/მიკროავტობუსი",
    "საკუთარი/ახლობლის ავტომობილი",
    "სხვა ტრანსპორტი"
  ];


  VisitNames1: string[] = [
    "ღირსშესანიშნაობების/კულტურული და ისტორიული მემკვიდრეობის ძეგლების/მუზეუმების მონახულება",
    "ზღვაზე/ტბაზე/მდინარეზე ცურვა /სანაპიროზე გასვლა",
    "ბუნების/ლანდშაფტის/ნაკრძალების მონახულება, უცნობი და ეგზოტიკური ადგილების აღმოჩენა",
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "შოპინგი (სამომხმარებლო საქონლის ყიდვა პირადი მოხმარებისთვის ან საჩუქრად)",
    "სხვა აქტივობა"
  ];

  VisitNames2: string[] = [
    "ღირსშესანიშნაობების/კულტურული და ისტორიული მემკვიდრეობის ძეგლების/მუზეუმების მონახულება",
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "ადგილობრივი ხელოვნების, კულტურის, ენის, ისტორიის გაცნობა",
    "რელიგიური ადგილების მონახულება/მოლოცვა",
    "შოპინგი",
    "სხვა აქტივობა"
  ];

  VisitNames3: string[] = [
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "შოპინგი",
    "მეგობრების/ნათესავების მონახულება",
    "სხვა აქტივობა"
  ];


  OrderNames: string[] = [
    "პირველი ვიზიტი",
    "განმეორებითი ვიზიტი"
  ];


  CountryNames: string[] = [
    "სომხეთი",
    "აზერბაიჯანი",
    "რუსეთის ფედერაცია",
    "თურქეთი",
    "უკრაინა",
    "ევროკავშირის წევრი ქვეყნები",
    "სხვა ქვეყნები"
  ];

}
