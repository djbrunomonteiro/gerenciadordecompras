import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent implements OnInit {

  @Input()index: any;
  date;


  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit(): void {
    console.log(this.index);
    
  }

  close(){
    this.popoverCtrl.dismiss(this.date)
  }

}
