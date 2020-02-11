import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';


import Ranges from '../models/ranges';
import Address from '../models/address';
import School from '../models/school';

import {SchoolService} from '../services/school.service';

import AddNewSchoolDialog from './add-new-school/add-new-school.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'School Listings';
  ranges: Ranges[] = [
    {value: '0', displayValue: 'All'},
    {value: '1', displayValue: '0-50'},
    {value: '2', displayValue: '51-250'},
    {value: '3', displayValue: '251-500'},
    {value: '4', displayValue: '500-1000'},
    {value: '5', displayValue: '>1000'}
  ];

  queries = new FormGroup({
    querySchoolName: new FormControl(''),
    queryAddress: new FormControl(''),
    queryRange: new FormControl('0')
  });

  schools: School[] = [
    {id: '0', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: 'Nashville, AU'}, numberOfStudents: this.displayRangeValue('1') },
    {id: '1', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '2', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '3', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '4', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog, private schoolService: SchoolService) {
    iconRegistry.addSvgIcon(
        'school',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/school.svg'));
    iconRegistry.addSvgIcon(
        'github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/github.svg'));
  }

  ngOnInit() {
    this.queries.get("querySchoolName").valueChanges.subscribe(selectedValue => {
      console.log('queryAddress value changed')
      console.log(selectedValue)

      setTimeout(() => {
        this.loadAllSchools();                
      });
    })
    this.queries.get("queryAddress").valueChanges.subscribe(selectedValue => {
      console.log('queryAddress value changed')
      console.log(selectedValue)
      
      setTimeout(() => {
        this.loadAllSchools();                
      });
    })
    this.queries.get("queryRange").valueChanges.subscribe(selectedValue => {
      console.log('queryRange value changed')
      console.log(selectedValue) 
      
      setTimeout(() => {
        this.loadAllSchools();                
      });
    })
    this.loadAllSchools();
  }

  loadAllSchools() {
      this.schools = [];

      console.log(this.queries.value)

      this.schoolService
      .getAllSchools(this.queries.value.querySchoolName, this.queries.value.queryAddress, this.queries.value.queryRange)
      .subscribe(result => {
        console.log('getAllSchools response', result);

        if(result) {
          result.forEach(school => {
            this.schools.push({
              id: school._id, 
              schoolName: school.name, 
              address: {
                street: school.address.street || '', 
                suburb: school.address.suburb || '', 
                postcode: school.address.postcode || '', 
                state: school.address.state || '', 
                displayName: `${school.address.street}, ${school.address.state}`
              }, 
              numberOfStudents: this.displayRangeValue(school.numberOfStudents || '') })
          });
        }
      });
  }

  displayRangeValue(rangeValue) {
    const _range = this.ranges.find(range => range.value == rangeValue);

    if (_range) {
        return _range.displayValue;
    }

    return "N/A";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewSchoolDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));

      if(result) {
        this.addNewSchool(result);
      }
    });
  }

  addNewSchool(school) {
    this.schoolService
      .addSchool(school)
      .subscribe(result => {
        console.log('getAllSchools response', result);

        this.loadAllSchools();
      });
  }
}
