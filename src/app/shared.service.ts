import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  getDropDownText(id:any, object:any){
    const selObj = _.filter(object, (o:any)=> {
        return (_.includes(id,o.id));
    });
    return selObj;
  }
}
