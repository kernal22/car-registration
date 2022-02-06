import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ColorEvent } from 'ngx-color';
import { forkJoin } from 'rxjs';
import { CarService } from './service/car/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-registration';
  public carLists;
  public autoPartLists;
  public form;
  public color;

  public carConfig: IDropdownSettings = {
    "singleSelection": false,
    "defaultOpen": false,
    "idField": "brand",
    "textField": "brand",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": true,
    "itemsShowLimit": 4,
    "allowSearchFilter": true
    };

    public partConfig: IDropdownSettings = {
      "singleSelection": false,
    "defaultOpen": false,
    "idField": "List of auto parts",
    "textField": "List of auto parts",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": true,
    "itemsShowLimit": 4,
    "allowSearchFilter": true
      }

    constructor(private _carService: CarService, private _fb: FormBuilder) {
    }

    ngOnInit(): void {
      this.form = this._fb.group({
        fullName: [null, [Validators.required, Validators.maxLength(75), Validators.pattern("^[a-zA-Z]*")]],
        carName: [null, Validators.required],
        autoPartName: [null, Validators.required],
        color: [null]
      });

        forkJoin([this._carService.getCarList(), this._carService.getAutoPartList()]).subscribe(response => {
          this.carLists = response[0];
          this.autoPartLists = response[1];
        });
    }

    get f() {
      return this.form.controls;
    }

    public onSubmit() {
      if(this.form.valid) {
        this._carService.postCarData(this.form.value).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        })
      } else {
        this.form.markAllAsTouched();
      }
    }

    public handleChange($event: ColorEvent) {
      this.color = $event.color.hex;
      this.form.get('color').setValue(this.color);
    }
}
