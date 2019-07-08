import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.page.html',
  styleUrls: ['./form-data.page.scss'],
})
export class FormDataPage implements OnInit {

  SERVER_URL = "https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Report";
  uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('File', this.uploadForm.get('profile').value);

    formData.append('Email', 'namaku@gmail.com');
    formData.append('ErrorType', '1');
    console.log(formData);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
