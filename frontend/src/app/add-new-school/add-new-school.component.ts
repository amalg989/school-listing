import { Component , Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<AddNewSchoolDialog>,
    @Inject(MAT_DIALOG_DATA) public school: School) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}