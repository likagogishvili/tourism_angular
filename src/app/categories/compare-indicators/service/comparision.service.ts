import { Injectable } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';
import { IDropDownSt } from 'src/app/common/IdropDownSt';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComparisionService {

  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Comperision';

  constructor(private http: HttpClient) 
  {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  getYears() {
    var uRl = this.APIUrl + '/compYears';

    return this.http.get<number[]>(uRl);
  }

  quarters: IDropDown[] = [
    { name: 'ყველა', value: 0, isDisabled: false },
    { name: 'I კვარტალი', value: 1, isDisabled: false },
    { name: 'II კვარტალი', value: 2, isDisabled: false },
    { name: 'III კვარტალი', value: 3, isDisabled: false },
    { name: 'IV კვარტალი', value: 4, isDisabled: false },
  ];

  quartersEN: IDropDown[] = [
    { name: 'All', value: 0, isDisabled: false },
    { name: 'I Quarter', value: 1, isDisabled: false },
    { name: 'II Quarter', value: 2, isDisabled: false },
    { name: 'III Quarter', value: 3, isDisabled: false },
    { name: 'IV Quarter', value: 4, isDisabled: false },
  ];

  getQuarters() {
    if (this.lang == 'GEO') {
      return this.quarters;
    }
    else{
      return this.quartersEN;
    }
  }

  indicMain: IDropDownSt[] = [
    { name: 'მიზანი', value: 'Goal', isDisabled: false },
    { name: 'აქტივობა', value: 'Visit', isDisabled: false },
    { name: 'კმაყოფილება', value: 'Rate', isDisabled: false },
    { name: 'ტრანსპორტი', value: 'Transport', isDisabled: false },
    { name: 'რიგითობა', value: 'Sequence', isDisabled: false },
    // { name: 'დანახარჯი', value: 'Expence', isDisabled: false },
  ];

  indicMainEN: IDropDownSt[] = [
    { name: 'Purpose', value: 'Goal', isDisabled: false },
    { name: 'Activity', value: 'Visit', isDisabled: false },
    { name: 'Satisfaction Level', value: 'Rate', isDisabled: false },
    { name: 'Transport', value: 'Transport', isDisabled: false },
    { name: 'Order of visit', value: 'Sequence', isDisabled: false },
    // { name: 'Expenditure', value: 'Expence', isDisabled: false },
  ];

  getIndicMain() {
    if (this.lang == 'GEO') {
      return this.indicMain;
    }
    else{
      return this.indicMainEN;
    }
  }

  indicHelp: IDropDownSt[] = [
    { name: 'ყველა', value: 'All', isDisabled: false },
    { name: 'ვიზიტის ტიპი', value: 'TourType', isDisabled: false },
    { name: 'სქესი', value: 'Gender', isDisabled: false },
    { name: 'ასაკი', value: 'Age', isDisabled: false},
    // { name: 'ეკონომიური სტატუსი', value: 'Activity', isDisabled: false},
  ];

  indicHelpEN: IDropDownSt[] = [
    { name: 'Total', value: 'All', isDisabled: false },
    { name: 'Type of visit', value: 'TourType', isDisabled: false },
    { name: 'Gender', value: 'Gender', isDisabled: false },
    { name: 'Age', value: 'Age', isDisabled: false},
    // { name: 'Economic status', value: 'Activity', isDisabled: false},
  ];

  getIndicHelp() {
    if (this.lang == 'GEO') {
      return this.indicHelp;
    }
    else{
      return this.indicHelpEN;
    }
  }

  Ages: string[] = [
    "15-30",
    "31-50",
    "51+"
  ];

  GendersGE: string[] = [
    "ქალი",
    "კაცი"
  ];

  GendersEN: string[] = [
    "Male",
    "Female"
  ];

  Genders(){
    if (this.lang == 'GEO') {
      return this.GendersGE;
    }
    else{
      return this.GendersEN;
    }
  }

  ActivityesGE: string[] = [
    "დაქირავებული მუშაკი",
    "თვითდასაქმებული",                                                   
    "სტუდენტი",
    "პენსიონერი",
    "დიასახლისი/ოჯახში უსასყიდლოდ მომუშავე",
    "უმუშევარი",
    "სხვა სტატუსი"
  ];

  ActivityesEN: string[] = [
    "Hired employee",
    "Self-employed",                                                   
    "Student",
    "Pensioner/Retired",
    "Housewife",
    "Unemployed",
    "Other status"
  ];

  Activityes(){
    if (this.lang == 'GEO') {
      return this.ActivityesGE;
    }
    else{
      return this.ActivityesEN;
    }
  }

  VisitsGE: string[] = [
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

  VisitsEN: string[] = [
    "Sightseeing/Visiting cultural and historical heritage/Museums",
    "Going to the beach/Swimming in the sea/lake/river",
    "Visiting national parks/Nature/Landscape, exploring remote and exotic places",
    "Tasting local cuisine and wine",
    "Getting known with local art, culture, language, history",
    "Pilgrimage",
    "Shopping",
    "Visiting friends/relatives",
    "Other activity"
  ];


  Visits(){
    if (this.lang == 'GEO') {
      return this.VisitsGE;
    }
    else{
      return this.VisitsEN;
    }
  }

  GoalsGE: string[] = [
    "დასვენება, გართობა, რეკრეაცია",
    "მეგობრების/ნათესავების მონახულება",
    "მკურნალობა, გაჯანსაღება",
    "შოპინგი",
    "ტრანზიტი სხვა ქვეყანაში გადასასვლელად",
    "პროფესიული/ეკონომიკური საქმიანობა",
    "სხვა მიზანი"
  ];

  GoalsEN: string[] = [
    "Holiday, Leisure, Recreation",
    "Visiting friends/relatives",
    "Health and Medical Care",
    "Shopping",
    "Transit on the way to another country",
    "Business or Professional",
    "Other purpose"
  ];

  Goals(){
    if (this.lang == 'GEO') {
      return this.GoalsGE;
    }
    else{
      return this.GoalsEN;
    }
  }

  RatesGE: string[] = [
    "ძალიან უკმაყოფილო",
    "უკმაყოფილო",
    "არც კმაყოფილი, არც უკმაყოფილო",
    "კმაყოფილი",
    "ძალიან კმაყოფილი",
    "არ ვიცი/მიჭირს პასუხის გაცემა"
  ];

  RatesEN: string[] = [
    "Very Dissatisfied",
    "Dissatisfied",
    "Neither satisfied, nor dissatisfied",
    "Satisfied",
    "Very satisfied",
    "I don't know/hard to answer"
  ];

  Rates(){
    if (this.lang == 'GEO') {
      return this.RatesGE;
    }
    else{
      return this.RatesEN;
    }
  }

  TransportsGE: string[] = [
    "საჰაერო ტრანსპორტი",
    "ავტობუსი/მიკროავტობუსი",
    "სახმელეთო ტრანსპორტი",
    "საკუთარი/ახლობლის ავტომობილი",
    "სხვა ტრანსპორტი"
  ];

  TransportsEN: string[] = [
    "Air transport",
    "Bus/Minibus",
    "Land transport",
    "Own/relatives car",
    "Other transport"
  ];

  Transports(){
    if (this.lang == 'GEO') {
      return this.TransportsGE;
    }
    else{
      return this.TransportsEN;
    }
  }

  SequencesGE: string[] = [
    "პირველი ვიზიტი",
    "განმეორებითი ვიზიტი"
  ];

  SequencesEN: string[] = [
    "First visit",
    "Repeating visit"
  ];

  Sequences(){
    if (this.lang == 'GEO') {
      return this.SequencesGE;
    }
    else{
      return this.SequencesEN;
    }
  }

  TourTypesGE: string[] = [
    "ექსკურსანტი",
    "ტურისიტი"
  ];

  TourTypesEN: string[] = [
    "Same-day visit",
    "Tourist visit"
  ];

  TourTypes(){
    if (this.lang == 'GEO') {
      return this.TourTypesGE;
    }
    else{
      return this.TourTypesEN;
    }
  }

  ExpenditureGE: string[] = [
    "დანახარჯი"
  ];

  ExpenditureEN: string[] = [
    "Expenditure"
  ];

  Expenditure(){
    if (this.lang == 'GEO') {
      return this.ExpenditureGE;
    }
    else{
      return this.ExpenditureEN;
    }
  }
}
