import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  type: string;
  examples = ['simple'];
  fieldList = [];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient
  ) {
    this.loadExample(this.examples[0]);
  }

  convertFieldGroup(response: any) {
    let fieldGroupList = [];
    Object.keys(response.properties).map(key => {
      // console.log(key);

      let entity = response.properties[key];
      // console.log(entity);
      let frmly = {
        name: entity?.name,
        id: entity?.id,
        key: entity?.key,
        type: entity?.type,
        templateOptions: {
          label: entity?.name,
          translation: entity?.widget?.formlyConfig?.templateOptions?.transalation,
          options: entity?.widget?.formlyConfig?.templateOptions?.options
        }
      };
      console.log(frmly);
      fieldGroupList.push(frmly);

    });
    this.fieldList.push({ fieldGroup : fieldGroupList});
    this.fields = this.fieldList;
  }
  convertToField(response:any){
    Object.keys(response.properties).map(key => {
      let entity = response.properties[key];
        let frmly = {
          name: entity?.name,
          id: entity?.id,
          key: entity?.key,
          type: entity?.type,
          templateOptions: {
            label: entity?.name,
            translation: entity?.widget?.formlyConfig?.templateOptions?.transalation,
            options: entity?.widget?.formlyConfig?.templateOptions?.options
          }
        };
        console.log(frmly);
        this.fieldList.push(frmly);
        this.fields = this.fieldList;
        console.log(this.fields);
    });
  }
  convertToFormly(response: any) {
    Object.keys(response.properties).map(key => {
      let entity = response.properties[key];
      if (entity.properties) {
        this.convertFieldGroup(entity);
      }
      else {
        let frmly = {
          name: entity?.name,
          id: entity?.id,
          key: entity?.key,
          type: entity?.type,
          templateOptions: {
            label: entity?.name,
            translation: entity?.widget?.formlyConfig?.templateOptions?.transalation,
            options: entity?.widget?.formlyConfig?.templateOptions?.options
          }
        };
        console.log(frmly);
        this.fieldList.push(frmly);
        this.fields = this.fieldList;
        console.log(this.fields);
      }
    });
  }
  loadExample(type: string) {
    this.http
      .get<any>(`assets/json-schema/${type}.json`)
      .pipe(
        tap(response => {
          let schema = this.convertToFormly(response.schema);
          this.type = type;
          this.form = new FormGroup({});
          this.options = {};

          this.model = {};
          console.log(this.fields);
        })
      )
      .subscribe();
  }

  submit() {
    alert(JSON.stringify(this.model));
  }
}
