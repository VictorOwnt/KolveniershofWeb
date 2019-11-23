export class StaticMethodsPicto {
  static namesOfDays = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag'
  ];

  static formattedDate(d: Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return `${day}_${month}_${year}`;
  }

  static unFormattedDate(date: any) {
    date = date.split('-');
    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];
    if (day.charAt(0) === '0') {
      return new Date(year, month, day.substring(1, 2));
    }
    return new Date(year, month, day.substring(0, 2));
  }

  static getNameOfDay(date: Date) {
    return StaticMethodsPicto.namesOfDays[date.getDay()];
  }
}

export class DayNameAndDate {
  constructor(private _date: Date, private _name: string, private _icon = '') {}

  get date() {
    return this._date;
  }

  get name() {
    return this._name;
  }

  get icon() {
    return this._icon;
  }
}

// export class StaticMethodsWeekSchedule {
//   static editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;
//   static dialog: any;

//   constructor(private dialog: MatDialog) {
//     this.dialog = dialog;
//   }
//   static openEditWeekSchedule(type, workday, planningDate) {
//     this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent, {
//       data: {
//         workday,
//         changeType: "Algemeen",
//         planningDate
//       }
//     });
//   }
// }
