import { Component , Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

import School from '../../models/school';
import Address from '../../models/address';
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
    @Inject(MAT_DIALOG_DATA) public school) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {

    if(this.form.valid) {
      this.school.name = this.form.value.schoolName;

      const address: Address = {
        street: this.form.value.addressStreet,
        suburb: this.form.value.addressSuburb,
        postcode: this.form.value.addressPostcode,
        state: this.form.value.addressState,
        displayName: `${this.form.value.addressStreet}, ${this.form.value.addressState}`
      };

      this.school.address = address;
      
      this.school.numberOfStudents = this.form.value.queryRange;

      this.dialogRef.close(this.school);   
    } 
  }

}