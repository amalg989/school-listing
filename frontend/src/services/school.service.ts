import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import School from '../models/school';

@Injectable()
export class SchoolService {
  url: String = "http://localhost:3000/schools";

  constructor(private http: HttpClient) {}

  getAllSchools(querySchoolName: String, queryAddress: String, queryRange: Number) {
    return this.http.get(`${this.url}?filter_name=${querySchoolName}&filter_address=${queryAddress}&filter_num_students=${queryRange}`)
  }
  
  addSchool(school: School) {
    return this.http.post(`${this.url}`, school);
  }
}