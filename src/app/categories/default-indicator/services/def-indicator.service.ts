import { Injectable } from '@angular/core';
import { IDropDown } from '../../../common/IDropDown';
@Injectable({
  providedIn: 'root'
})
export class DefIndicatorService {

  constructor() {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;
  
  periods: IDropDown[] = [
    { name: 'წლიური', value: 1, isDisabled: false },
    { name: 'კვარტალური', value: 2, isDisabled: false },
    { name: 'ყოველთვიური', value: 3, isDisabled: false }
  ];

  periodsEN: IDropDown[] = [
    { name: 'Yearly', value: 1, isDisabled: false },
    { name: 'Quarterly', value: 2, isDisabled: false },
    { name: 'Monthly', value: 3, isDisabled: false }
  ];

  getPeriods() {
    if (this.lang == 'GEO') {
      return this.periods;
    }
    else{
      return this.periodsEN;
    }
  }

  selPeriod = { name: 'წლიური', value: 1 };

  vTypes: IDropDown[] = [
    { name: 'ყველა', value: 0, isDisabled: false },
    { name: 'ექსკურსიული ვიზიტი', value: 1, isDisabled: false },
    { name: 'ტურისტული ვიზიტი', value: 2, isDisabled: false }
  ];

  vTypesEN: IDropDown[] = [
    { name: 'All', value: 0, isDisabled: false },
    { name: 'Same-day visit', value: 1, isDisabled: false },
    { name: 'Tourist visit', value: 2, isDisabled: false }
  ];
  
  getVtypes() {
    if (this.lang == 'GEO') {
      return this.vTypes;
    }
    else{
      return this.vTypesEN;
    }
  }

  selVtype = { name: 'ყველა', value: 0 };

  tTypes: IDropDown[] = [
    { name: 'უცხოელი ვიზიტორები', value: 1, isDisabled: false },
    { name: 'გამყვანი ტურიზმი', value: 2, isDisabled: false },
    { name: 'ადგილობრივი ტურიზმი', value: 3, isDisabled: false }
  ];

  tTypesEN: IDropDown[] = [
    { name: 'Inbound Tourism', value: 1, isDisabled: false },
    { name: 'Outbound Tourism', value: 2, isDisabled: false },
    { name: 'Domestic Tourism', value: 3, isDisabled: false }
  ];

  getTtypes() {
    if (this.lang == 'GEO') {
      return this.tTypes;
    }
    else{
      return this.tTypesEN;
    }
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

  indicatorsEN: IDropDown[] = [
    { name: 'Total', value: 0, isDisabled: false },
    { name: 'Economic Status', value: 1, isDisabled: false },
    { name: 'Age', value: 2, isDisabled: false },
    { name: 'Gender', value: 3, isDisabled: false },
    { name: 'Purpose Of Visit', value: 4, isDisabled: false },
    { name: 'Satisfaction Level', value: 5, isDisabled: false },
    { name: 'Type of Visit', value: 6, isDisabled: false },

    //{ indicator: 'კვარტალი', value: 7 },
    //{ indicator: 'თვე', value: 8 },

    { name: 'Transport', value: 9, isDisabled: false },
    { name: 'Activity', value: 10, isDisabled: false },
    { name: 'Order Of Visit', value: 11, isDisabled: false },
    { name: 'Visited countries', value: 12, isDisabled: true }
  ];
  
  getIndicators() {
    if (this.lang == 'GEO') {
      return this.indicators;
    }
    else{
      return this.indicatorsEN;
    }
  }

  selIndicator = { name: 'ყველა', value: 0 };
  

  ActivityNamesGE1: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "უმუშევარი",
    "სტუდენტი",
    "სხვა სტატუსი"
  ];

  ActivityNamesEN1: string[] = [
    "Hired employee",
    "Self-employed",
    "Unemployed",
    "Student",
    "Other status"
  ];

  ActivityNames1(){
    if (this.lang == 'GEO') {
      return this.ActivityNamesGE1
    }
    else{
      return this.ActivityNamesEN1
    }
  }

  ActivityNamesGE2: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "დიასახლისი/ოჯახში უსასყიდლოდ მომუშავე",
    "სხვა სტატუსი"
  ];

  ActivityNamesEN2: string[] = [
    "Hired employee",
    "Self-employed",
    "Housewife",
    "Other status"
  ];

  ActivityNames2(){
    if (this.lang == 'GEO') {
      return this.ActivityNamesGE2
    }
    else{
      return this.ActivityNamesEN2
    }
  }

  ActivityNamesGE3: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",
    "პენსიონერი",
    "დიასახლისი",
    "უმუშევარი",
    "სხვა სტატუსი"
  ];

  ActivityNamesEN3: string[] = [
    "Hired employee",
    "Self-employed",
    "Pensioner/Retired",
    "Housewife",
    "Unemployed",
    "Other status"
  ];

  ActivityNames3(){
    if (this.lang == 'GEO') {
      return this.ActivityNamesGE3;
    }
    else{
      return this.ActivityNamesEN3;
    }
  }

  AgeNamesGE1: string[] = [
    "15-30",
    "31-50",
    "51-70",
    "71+"
  ];

  AgeNames1(){
    return this.AgeNamesGE1;
  }

  AgeNamesGE3: string[] = [
    "15-30",
    "31-50",
    "51+",
    
  ];

  AgeNames3(){
    return this.AgeNamesGE3;
  }


  GenderNamesGE: string[] = [
    "კაცი",
    "ქალი"
  ];

  GenderNamesEN: string[] = [
    "Male",
    "Female"
  ];

  GenderNames(){
    if (this.lang == 'GEO') {
      return this.GenderNamesGE;
    }
    else{
      return this.GenderNamesEN;
    }
  }


  GoalNamesGE1: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "შოპინგი",
    "ტრანზიტი სხვა ქვეყანაში გადასასვლელად",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  GoalNamesEN1: string[] = [
    "Holiday, Leisure, Recreation",
    "Visiting friends/relatives",
    "Shopping",
    "Transit on the way to another country",
    "Business or Professional",
    "Other purpose"
  ];

  GoalNames1(){
    if (this.lang == 'GEO') {
      return this.GoalNamesGE1;
    }
    else{
      return this.GoalNamesEN1;
    }
  }

  GoalNamesGE2: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "შოპინგი",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა პირადი მიზანი"
  ];

  GoalNamesEN2: string[] = [
    "Holiday, Leisure, Recreation",
    "Visiting friends/relatives",
    "Shopping",
    "Business or Professional",
    "Other purpose"
  ];

  GoalNames2(){
    if (this.lang == 'GEO') {
      return this.GoalNamesGE2;
    }
    else{
      return this.GoalNamesEN2;
    }
  }

  GoalNamesGE3: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "მკურნალობა, გაჯანსაღება",
    "შოპინგი",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  GoalNamesEN3: string[] = [
    "Holiday, Leisure, Recreation",
    "Visiting friends/relatives",
    "Health and Medical Care",
    "Shopping",
    "Business or Professional",
    "Other purpose"
  ];

  GoalNames3(){
    if (this.lang == 'GEO') {
      return this.GoalNamesGE3;
    }
    else{
      return this.GoalNamesEN3;
    }
  }

  RateNamesGE: string[] = [    
    "ძალიან უკმაყოფილო",
    "უკმაყოფილო",
    "არც კმაყოფილი, არც უკმაყოფილო",
    "კმაყოფილი",
    "ძალიან კმაყოფილი",
    "არ ვიცი/მიჭირს პასუხის გაცემა"
  ];

  RateNamesEN: string[] = [
    "Very Dissatisfied",
    "Dissatisfied",
    "Neither satisfied, nor dissatisfied",
    "Satisfied",
    "Very satisfied",
    "I do not know/hard to answer"
  ];

  RateNames(){
    if (this.lang == 'GEO') {
      return this.RateNamesGE;
    }
    else{
      return this.RateNamesEN;
    }
  }

  
  TourNamesGE: string[] = [
    "ტურისტი",
    "ექსკურსანტი"
  ];

  TourNamesEN: string[] = [
    "Tourist",
    "Excursionist"
  ];

  TourNames(){
    if (this.lang == 'GEO') {
      return this.TourNamesGE;
    }
    else{
      return this.TourNamesEN;
    }
  }


  TransportNamesGE1: string[] = [
    "სახმელეთო ტრანსპორტი",
    "საჰაერო ტრანსპორტი",
    "სხვა ტრანსპორტი"
  ];

  TransportNamesEN1: string[] = [
    "Land transport",
    "Air transport",
    "Other transport"
  ];

  TransportNames1(){
    if (this.lang == 'GEO') {
      return this.TransportNamesGE1;
    }
    else{
      return this.TransportNamesEN1;
    }
  }

  TransportNamesGE2: string[] = [
    "საჰაერო ტრანსპორტი",
    "სახმელეთო ტრანსპორტი",
    "საზღვაო ტრანსპორტი",
    "სხვა ტრანსპორტი"
  ];

  TransportNamesEN2: string[] = [
    "Air transport",
    "Land transport",
    "Other transport"
  ];

  TransportNames2(){
    if (this.lang == 'GEO') {
      return this.TransportNamesGE2;
    }
    else{
      return this.TransportNamesEN2;
    }
  }

  TransportNamesGE3: string[] = [
    "ავტობუსი/მიკროავტობუსი",
    "საკუთარი/ახლობლის ავტომობილი",
    "სხვა ტრანსპორტი"
  ];

  TransportNamesEN3: string[] = [
    "Bus/Minibus",
    "Own/relatives car",
    "Other transport"
  ];

  TransportNames3(){
    if (this.lang == 'GEO') {
      return this.TransportNamesGE3;
    }
    else{
      return this.TransportNamesEN3;
    }
  }


  VisitNamesGE1: string[] = [
    "ღირსშესანიშნაობების/კულტურული და ისტორიული მემკვიდრეობის ძეგლების/მუზეუმების მონახულება",
    "ზღვაზე/ტბაზე/მდინარეზე ცურვა /სანაპიროზე გასვლა",
    "ბუნების/ლანდშაფტის/ნაკრძალების მონახულება, უცნობი და ეგზოტიკური ადგილების აღმოჩენა",
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "შოპინგი (სამომხმარებლო საქონლის ყიდვა პირადი მოხმარებისთვის ან საჩუქრად)",
    "სხვა აქტივობა"
  ];

  VisitNamesEN1: string[] = [
    "Sightseeing/Visiting cultural and historical heritage/Museums",
    "Going to the beach/Swimming in the sea/lake/river",
    "Visiting national parks/Nature/Landscape, exploring remote and exotic places",
    "Tasting local cuisine and wine",
    "Shopping",
    "Other activity"
  ];

  VisitNames1(){
    if (this.lang == 'GEO') {
      return this.VisitNamesGE1;
    }
    else{
      return this.VisitNamesEN1;
    }
  }

  VisitNamesGE2: string[] = [
    "ღირსშესანიშნაობების/კულტურული და ისტორიული მემკვიდრეობის ძეგლების/მუზეუმების მონახულება",
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "ადგილობრივი ხელოვნების, კულტურის, ენის, ისტორიის გაცნობა",
    "რელიგიური ადგილების მონახულება/მოლოცვა",
    "შოპინგი",
    "სხვა აქტივობა"
  ];

  VisitNamesEN2: string[] = [
    "Sightseeing/Visiting cultural and historical heritage/Museums",
    "Tasting local cuisine and wine",
    "Getting known with local art, culture, language, history",
    "Pilgrimage",
    "Shopping",
    "Other activity"
  ];

  VisitNames2(){
    if (this.lang == 'GEO') {
      return this.VisitNamesGE2;
    }
    else{
      return this.VisitNamesEN2;
    }
  }

  VisitNamesGE3: string[] = [
    "ადგილობრივი სამზარეულოსა და ღვინის დაგემოვნება",
    "შოპინგი",
    "მეგობრების/ნათესავების მონახულება",
    "სხვა აქტივობა"
  ];

  VisitNamesEN3: string[] = [
    "Tasting local cuisine and wine",
    "Shopping",
    "Visiting friends/relatives",
    "Other activity"
  ];

  VisitNames3(){
    if (this.lang == 'GEO') {
      return this.VisitNamesGE3;
    }
    else{
      return this.VisitNamesEN3;
    }
  }


  OrderNamesGE: string[] = [
    "პირველი ვიზიტი",
    "განმეორებითი ვიზიტი"
  ];

  OrderNamesEN: string[] = [
    "First visit",
    "Repeating visit"
  ];

  OrderNames(){
    if (this.lang == 'GEO') {
      return this.OrderNamesGE;
    }
    else{
      return this.OrderNamesEN;
    }
  }


  CountryNamesGE: string[] = [
    "სომხეთი",
    "აზერბაიჯანი",
    "რუსეთის ფედერაცია",
    "თურქეთი",
    "უკრაინა",
    "ევროკავშირის წევრი ქვეყნები",
    "სხვა ქვეყნები"
  ];

  CountryNamesEN: string[] = [
    "Armenia",
    "Azerbaijan",
    "Russia",
    "Turkey",
    "Ukraine",
    "EU Member States",
    "Other Countries"
  ];

  CountryNames(){
    if (this.lang == 'GEO') {
      return this.CountryNamesGE;
    }
    else{
      return this.CountryNamesEN;
    }
  }
}
