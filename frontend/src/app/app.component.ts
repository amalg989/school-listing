import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Ranges from '../models/ranges';
import Address from '../models/address';
import School from '../models/school';

import AddNewSchoolDialog from './add-new-school/add-new-school.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'School Listings';
  ranges: Ranges[] = [
    {value: '0', displayValue: 'All'},
    {value: '1', displayValue: '0-50'},
    {value: '2', displayValue: '51-250'},
    {value: '3', displayValue: '251-500'},
    {value: '4', displayValue: '500-1000'},
    {value: '5', displayValue: '>1000'}
  ];

  schools: School[] = [
    {id: '0', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: 'Nashville, AU'}, numberOfStudents: this.displayRangeValue('1') },
    {id: '1', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '2', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '3', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
    {id: '4', schoolName: 'School Name', address: {street: '', suburb: '', postcode: '', state: '', displayName: ''}, numberOfStudents: '1'},
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
        'school',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/school.svg'));
    iconRegistry.addSvgIcon(
        'github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/github.svg'));
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
      data: this.schools[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
