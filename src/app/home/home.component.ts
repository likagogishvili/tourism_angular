import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    this.langValue = String(localStorage.getItem("Language"));
  }
  ngOnInit(): void {
    if (this.langValue == "GEO"){
      this.title1 = 'ვიზიტორთა გამოკვლევის შედეგები';
      this.title2 = "სასტუმროების" + "\n" +
                    "გამოკვლევის შედეგები";
      this.enter1 = "გადასვლა";
    }
    else{
      this.title1 = "Visitor\nSurvey Results";
      this.title2 = "Survey of Hotels";
      this.enter1 = "ENTER";
    }
    
  }

  title1: string = "ვიზიტორთა გამოკვლევის შედეგები";
  title2: string = "სასტუმროების" + "\n" +
  "გამოკვლევის შედეგები";
  enter1: string = "გადასვლა";

  h: number = 1;


  visitors = "assets/img/landingPage/visitors.jpg"
  hotels = "assets/img/landingPage/hotels.jpg"

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.h = 2;

  }

  clickedFirst() {
    this.h = 2;
  }

  clickedSecond() {
    this.h = 1;
  }

  langValue: string = "";
}
