import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';
import {UtilsService} from "../utils.service";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    ReactiveFormsModule,
    NgStyle,
    NgIf
  ],
  templateUrl: './gantt-chart.component.html',
  styleUrl: './gantt-chart.component.scss'
})
export class GanttChartComponent {

  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  monthsArray: Date[] = [];
  years: number[] = Array.from({length: 29}, (_, index) => 2024 + index);
  tasks = [
    {
      id: 1, name: "Esse Jacques", tasks: [
        {
          id: "1",
          start: new Date("2024/1/2"),
          end: new Date("2024/1/8"),
          name: "Task 1",
        },
        {
          id: "3",
          start: new Date("2024/1/11"),
          end: new Date("2024/1/18"),
          name: "Task 3",
        },
      ]
    },
    {
      id: 2, name: "User2", tasks: [
        {
          id: "4",
          start: new Date("2024/1/5"),
          end: new Date("2024/1/8"),
          name: "Task 4",
        },
        {
          id: "5",
          start: new Date("2024/1/17"),
          end: new Date("2024/1/20"),
          name: "Task 5",
        },
      ]
    },
    {
      id: 3, name: "User3", tasks: [

        {
          id: "9",
          start: new Date("2024/1/11"),
          end: new Date("2024/1/18"),
          name: "Task 9",
        },
      ]
    },

  ];

  selectDateForm: FormGroup = new FormGroup({
    fromSelectYear: new FormControl(2024),
    fromSelectMonth: new FormControl(0),
    toSelectYear: new FormControl(2024),
    toSelectMonth: new FormControl(11)
  });


  constructor(private utilsService: UtilsService) {
    this.generateMonthsArray(this.getStartMonth(), this.getNumMonth());

    this.selectDateForm.valueChanges.subscribe((value) => {
      this.generateMonthsArray(this.getStartMonth(), this.getNumMonth());
    });
  }

  getStartMonth(): Date {
    return new Date(this.selectDateForm.controls["fromSelectYear"].value,
      this.selectDateForm.controls["fromSelectMonth"].value);
  }

  getEndMonth(): Date {
    return new Date(this.selectDateForm.controls["toSelectYear"].value,
      this.selectDateForm.controls["toSelectMonth"].value);
  }

  getNumMonth(): number {
    const fromDate: Date = this.getStartMonth();
    const toDate: Date = this.getEndMonth();
    return this.utilsService.monthDiff(fromDate, toDate) + 1;
  }

  generateMonthsArray(startMonth: Date, numMonths: number): Date[] {
    const monthsArray = [];
    let month = new Date(startMonth);

    for (let i = 0; i < numMonths; i++) {
      monthsArray.push(new Date(month));
      month.setMonth(month.getMonth() + 1);
    }

    this.monthsArray = monthsArray;
    return monthsArray;
  }


  getDaysInMonth(month: Date): number {
    return this.utilsService.getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
  }

  generateArray(n: number): number[] {
    return Array.from({length: n}, (_, index) => index + 1);
  }

  getDayOfWeek(fullYear: number, month: number, day: number) {
    return this.utilsService.getDayOfWeek(fullYear, month, day);
  }

  isWeekend(day: any) {
    return day == "S" || day == "D";
  }

  createFormattedDateFromStr(year: number, month: number, day: number): string {
    // Implement your date formatting logic here
    // Replace this with your actual date formatting logic
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  calcDurationWith(start: Date, end: Date) {
    return this.utilsService.dayDiff(start, end)  + "00%";
  }

  isEqual(start: Date, fullYear: number, month: number, day: number) {
    return start.getFullYear() == fullYear && start.getMonth() == month && start.getDate() == day;
  }
}
