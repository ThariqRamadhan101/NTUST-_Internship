import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.page.html',
  styleUrls: ['./report-problem.page.scss'],
})
export class ReportProblemPage implements OnInit {

  uploadForm: FormGroup;

  File: any = [];
  Device_ID: string = "MA_B1_01";
  Email: string = "johnny258147@gmail.com";
  ErrorType = 0;
  Description: string = '';


  problems = [
    { problem: 'Button does not respond' },
    { problem: 'Unable to water' },
    { problem: 'Leaking water' },
    { problem: 'Screen not shown' },
    { problem: 'Other' }
  ];

  public selected: string;
  public type;


  constructor(public alertController: AlertController, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: [''],
    });
  }


  public toggle(selected, type) {
    this.ErrorType = type + 1;
    if (type != 4) {
      this.Description = '';
    }
    for (let index = 0; index < this.problems.length; index++) {
      if (this.problems['problem'] != selected['problem']) {
        this.problems[index]['isChecked'] = null;
      }
    }
  }

  async submit() {
    if (this.ErrorType == 0) {
      console.log("You must fill problem")
    } else {

      const reportProblems = new FormData();

      reportProblems.append('File', this.uploadForm.get('image').value);
      reportProblems.append('Device_ID', '1');
      reportProblems.append('Email', 'hehe@gmail.com');
      reportProblems.append('ErrorType', String(this.ErrorType));
      reportProblems.append('Description', '');

      console.log(this.uploadForm);

      const thank = await this.alertController.create({
        mode: "ios",
        header: 'Thank you for your assistance!',
        message: 'We have received a problem report',
        buttons: [
          {
            text: 'OK',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });

      await thank.present();


      this.http.post<any>("https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Report", reportProblems)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
    }
  }
  onKey(event: any) {
    for (let index = 0; index < this.problems.length; index++) {
      this.problems[index]['isChecked'] = null;
    }
    this.problems[4]['isChecked'] = 1;
    this.ErrorType = 5;

  }

  async AlertConfirm() {
    const alert = await this.alertController.create({
      mode: "ios",
      header: 'Dicard Editing?',
      message: 'If you go back now, you will lose editing.',
      buttons: [
        {
          text: 'Cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Discard',
          cssClass: 'icon-color',
          handler: () => {
            console.log('Confirm Discard');
          }
        }
      ]
    });

    await alert.present();
  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
    console.log("jhaha");
  }

}
