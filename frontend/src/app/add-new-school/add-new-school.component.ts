import { Component , Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

import School from '../../models/school';
import Ranges from '../../models/ranges';

@Component({
  selector: 'add-new-school-component',
  templateUrl: 'add-new-school.component.html',
  styleUrls: ['./add-new-school.component.scss'],  
})
export default class AddNewSchoolDialog {

 ranges: Ranges[] = [
    {value: '0', displayValue: 'All'},
    {value: '1', displayValue: '0-50'},
    {value: '2', displayValue: '51-250'},
    {value: '3', displayValue: '251-500'},
    {value: '4', displayValue: '500-1000'},
    {value: '5', displayValue: '>1000'}
  ];

  form = new FormGroup({
    schoolName: new FormControl(''),
    addressStreet: new FormControl(''),
    addressSuburb: new FormControl(''),
    addressPostcode: new FormControl(''),
    addressState: new FormControl(''),
    queryRange: new FormControl('0')
  });

  constructor(
    public dialogRef: MatDialogRef<AddNewSchoolDialog>,
    @Inject(MAT_DIALOG_DATA) public school: School) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    console.log(this.form);

    if(this.form.valid) {
      this.school.name = this.form.value.schoolName;
      this.school.address = {};
      this.school.address.street = this.form.value.addressStreet;
      this.school.address.suburb = this.form.value.addressSuburb;
      this.school.address.postcode = this.form.value.addressPostcode;
      this.school.address.state = this.form.value.addressState;
      this.school.numberOfStudents = this.form.value.queryRange;

      this.dialogRef.close(this.school);   
    } 
  }

}