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

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient
  ) {
    this.loadExample(this.examples[0]);
  }

  loadExample(type: string) {
    this.http
      .get<any>(`assets/json-schema/${type}.json`)
      .pipe(
        tap(response => {
          Object.keys(response.schema.properties).map(key => {
            let entity = response.schema.properties[key];
            
            console.log(entity);
          });

          // this.type = type;
          // this.form = new FormGroup({});
          // this.options = {};
          // this.fields = [this.formlyJsonschema.toFieldConfig(schema)];

          // console.log(this.fields);
          // this.model = model;
        })
      )
      .subscribe();
  }

  submit() {
    alert(JSON.stringify(this.model));
  }
}
