import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-records',
  templateUrl: './maintenance-records.page.html',
  styleUrls: ['./maintenance-records.page.scss'],
})
export class MaintenanceRecordsPage implements OnInit {

  constructor(public http: HttpClient) { }

  maintenanceData: any;

  ngOnInit() {
    this.getAPI();
  }

  async getAPI() {
    const apiUrl = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Maintenance?Device_ID=T4_04_01';
    let getAPI = await this.http.get(apiUrl).toPromise();

    let errorMeaning = ["Button does not respond", "Unable to water", "Leaking water", "Screen not shown", "Other"];

    let dayArray = [];
    for (let i = getAPI['Data'].length - 1; i >= 0; i--) {
      let dataForMaintenance = {
        'Device_ID': getAPI['Data'][i]['Device_ID'],
        'ErrorType': getAPI['Data'][i]['ErrorType'],
        'Description': getAPI['Data'][i]['Description'],
        'CompleteTime': getAPI['Data'][i]['CompleteTime'],
        'ErrorMeaning': errorMeaning[getAPI['Data'][i]['ErrorType'] - 1],
        'Day': this.getTime(getAPI['Data'][i]['CompleteTime'])['dayForTime'],
        'Month': this.getTime(getAPI['Data'][i]['CompleteTime'])['monthForTime'],
        'Year': this.getTime(getAPI['Data'][i]['CompleteTime'])['yearForTime']
      };
      dayArray.push(dataForMaintenance);
    }
    let dayMaintenance = [];
    let monthArray = [];
    let monthMaintenance = [];
    let yearArray = [];
    let lastMonth;
    let lastYear;
    for (let i = 0; i < dayArray.length; i++) {
      if (i == 0) {
        lastMonth = dayArray[i]['Month'];
        lastYear = dayArray[i]['Year'];
        dayMaintenance.push(dayArray[i]);
      } else {
        if (dayArray[i]['Month'] == lastMonth) {
          dayMaintenance.push(dayArray[i]);
        } else {
          if (dayArray[i]['Year'] == lastYear) {
            monthArray.push({
              'month': lastMonth,
              'DayMaintenance': dayMaintenance
            });
            lastMonth = dayArray[i]['Month'];
            dayMaintenance = [];
            dayMaintenance.push(dayArray[i]);
          } else {
            yearArray.push({
              'year': lastYear,
              'MonthMaintenance': monthArray
            })
            lastYear = dayArray[i]['Year'];
            monthMaintenance = [];
            monthMaintenance.push(monthArray[i]);
          }
        }

        if (i == dayArray.length - 1) {
          monthArray.push({
            'month': lastMonth,
            'DayMaintenance': dayMaintenance
          });
          yearArray.push({
            'year': lastYear,
            'MonthMaintenance': monthArray
          })
        }
      }
    }
    this.maintenanceData = yearArray;
    // this.maintenanceData = [
    //   {
    //     'month': "March",
    //     'DayMaintenacne': [
    //       {
    //         'ErrorMeaning': "Other"
    //       }
    //     ]
    //   }
    // ];
    console.log(this.maintenanceData);

    // console.log(this.maintenanceData);
  }


  getTime(time) {
    // time passed is String, construct into Date format
    // time example from json: "2019-03-08 16:32:00"
    // format: YEAR-MONTH-DATEOFMONTH HOUR:MINUTE:SECOND

    let monthName = ["January", "February", "March", "April", "June", "July", "August", "September", "Oktober", "Desember"]
    // split into DATE form and HOUR form
    let splitTime = time.split(" ");

    let resultDate = splitTime[0];
    let resultHour = splitTime[1];

    // split DATE into YEAR, MONTH, and DATEOFMONTH
    let splitDate = resultDate.split("-");

    let resultYear = splitDate[0];
    let resultMonth = splitDate[1] - 1;
    let resultDateOfMonth = splitDate[2];

    // // split HOUR into HOUR, MINUTE, and SECOND
    // let splitHour = resultHour.split(":");

    // let resultHourC = splitHour[0];
    // let resultMinute = splitHour[1];
    // let resultSecond = splitHour[2];

    // now we get every component to construct date from String
    // let newDate = new Date(
    //   resultYear,
    //   resultMonth,
    //   resultDateOfMonth,
    //   resultHourC,
    //   resultMinute,
    //   resultSecond,
    //   0
    // );

    let newDate = {
      'dayForTime': resultDateOfMonth,
      'monthForTime': monthName[resultMonth],
      'yearForTime': resultYear
    }

    return newDate;
  }
}
