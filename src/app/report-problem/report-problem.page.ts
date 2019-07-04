import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.page.html',
  styleUrls: ['./report-problem.page.scss'],
})
export class ReportProblemPage implements OnInit {

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
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
      const reportProblems = {
        "File": this.File,
        "Device_ID": this.Device_ID,
        "Email": this.Email,
        "ErrorType": this.ErrorType,
        "Description": this.Description
      }

      console.log(reportProblems);

      this.http.post("https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Report", JSON.stringify(reportProblems))
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

}
