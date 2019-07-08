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

  constructor(public alertController: AlertController, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: [''],
    });
  }

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

  updateTrack: boolean = false;

  public selected: string;
  public type;

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
      const error = await this.alertController.create({
        mode: "ios",
        header: 'Dispenser problem is incorret',
        message: 'Please choose one of the problems above!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Confirm Cancel: Ok');
            }
          }
        ]
      });
      await error.present();


    } else {

      if ((this.Description == '') && (this.ErrorType == 5)) {
        const error = await this.alertController.create({
          mode: "ios",
          header: 'Dispenser problem is left blank',
          message: 'Please fill the description when choose other option!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('Confirm Cancel: Ok');
              }
            }
          ]
        });
        await error.present();

      } else {

        const reportProblems = new FormData();
        reportProblems.append('File', this.uploadForm.get('image').value);
        reportProblems.append('Device_ID', String(this.Device_ID));
        reportProblems.append('Email', String(this.Email));
        reportProblems.append('ErrorType', String(this.ErrorType));
        reportProblems.append('Description', String(this.Description));

        const thank = await this.alertController.create({
          mode: "ios",
          header: 'Thank you for your assistance!',
          message: 'We have received a problem report',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('Confirm Cancel: Ok');
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
        if (this.updateTrack == true) {
          let updateData = {
            'Email': this.Email,
            'Device_ID': this.Device_ID,
            'Status': 1
          }
          this.http.post<any>("https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Track", updateData)
            .subscribe(data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
        }

      }
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
          handler: () => {
            console.log('Confirm Cancel');
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
  }

}
