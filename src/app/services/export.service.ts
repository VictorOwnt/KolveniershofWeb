import {Injectable} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Workday} from '../models/workday.model';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {DatesService} from './dates.service';
import {ActivityUnit} from '../models/activityUnit.model';
import {AuthenticationService} from '../authentication/authentication.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private datePipe: DatePipe,
    private datesService: DatesService,
    private titleCasePipe: TitleCasePipe,
    private auth: AuthenticationService) {
  }

  /**
   * Adds template name and week number to pdf
   * @param pdf File to add to
   * @param templateName  Name of template
   * @param weekNumber  Number of week in template
   */
  private static addTemplate(pdf, templateName: string, weekNumber: string) {
    pdf.content.push(
      // Template info
      {
        text: templateName + ', week ' + weekNumber,
        width: 'auto',
        style: 'template',
        margin: [0, 0, 0, 15]
      }
    );
  }

  /**
   * TODO
   * @param pdf File to add to
   */
  private static addGeneral(pdf/*, TODO*/) {
    pdf.content.push(/*TODO*/);
  }

  /**
   * Opens print popup to print pdf
   * @param pdf File to print
   */
  private static print(pdf) {
    pdfMake.createPdf(pdf).print();
  }

  /**
   * Create empty pdf with only heading
   * @param weekNumber  Number of the week
   */
  private createEmptyPdf(weekNumber: string) {
    return {
      info: {
        title: 'Planning week ' + weekNumber,
        author: this.auth.currentUser.toString(),
        subject: 'Planning',
        keywords: 'Planning',
        creator: 'Ruben De Freyne, Reeven Govaert, Jakob Lierman, Wout Maes, Victor Van hulle, Sebastien Wojtyla',
        producer: 'HoGent'
      },

      header: (currentPage) => {
        return currentPage !== 1 ? {
          text: 'Kolveniershof planning - week ' + weekNumber,
          margin: [40, 20],
          style: 'headerfooter'
        } : null;
      },

      footer: (currentPage, pageCount) => {
        return {
          margin: [40, 0],
          style: 'headerfooter',
          columns: [
            {
              text: ''
            },
            {
              text: 'Pagina ' + currentPage + ' van ' + pageCount,
              alignment: 'right'
            }
          ]
        };
      },

      content: [
        {
          columns: [
            // Kolveniershof logo
            {
              svg: `<svg width="99px" height="70px" viewBox="0 0 99 70" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <circle id="Oval" fill="#2E7BE8" cx="35" cy="35" r="35"></circle>
                        <polygon id="Triangle" fill="#003A70" points="99 2 99 70 35 70"></polygon>
                        <path d="M37.5,44 C39.9852814,44 42,46.0147186 42,48.5 L42,70 L42,70 L33,70 L33,48.5 C33,46.0147186 35.0147186,44 37.5,44 Z" id="Rectangle" fill="#FFFFFF"></path>
                        <path d="M50.5,39 C52.9852814,39 55,41.0147186 55,43.5 L55,70 L55,70 L46,70 L46,43.5 C46,41.0147186 48.0147186,39 50.5,39 Z" id="Rectangle" fill="#FFFFFF"></path>
                        <path d="M63.5,49 C65.9852814,49 68,51.0147186 68,53.5 L68,70 L68,70 L59,70 L59,53.5 C59,51.0147186 61.0147186,49 63.5,49 Z" id="Rectangle" fill="#FFFFFF"></path>
                        <path d="M76.5,44 C78.9852814,44 81,46.0147186 81,48.5 L81,70 L81,70 L72,70 L72,48.5 C72,46.0147186 74.0147186,44 76.5,44 Z" id="Rectangle" fill="#FFFFFF"></path>
                        <path d="M89.5,35 C91.9852814,35 94,37.0147186 94,39.5 L94,70 L94,70 L85,70 L85,39.5 C85,37.0147186 87.0147186,35 89.5,35 Z" id="Rectangle" fill="#FFFFFF"></path>
                        </g>
                    </svg>`,
              width: 80,
              margin: [0, 0, 10, 10]
            },
            [
              // Title
              {
                text: 'Kolveniershof planning',
                width: 'auto',
                style: 'title'
              },
              // Subtitle
              {
                text: 'Week ' + weekNumber,
                width: 'auto',
                style: 'subtitle'
              }
            ]
          ]
        }
      ],
      styles: {
        headerfooter: {
          italics: true
        },
        title: {
          fontSize: 28,
          bold: true,
          color: '#003A70'
        },
        subtitle: {
          fontSize: 18,
          italics: true
        },
        template: {
          bold: true
        },
        date: {
          fontSize: 16,
          alignment: 'center',
          fillColor: '#EEF3F8'
        },
        holiday: {
          fontSize: 28,
          alignment: 'center'
        },
        activitiesHeader: {
          fontSize: 16,
          bold: true
        },
        activityTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        }
      },
      defaultStyle: {
        columnGap: 20,
        color: '#003A70'
      }
    };
  }

  /**
   * Add workday info to pdf
   * @param pdf File to add to
   * @param workday Workday to add to pdf
   * @param isFirstPage Whether this is a title page or not
   */
  private addDay(pdf, workday: Workday, isFirstPage: boolean) {
    // Add date header
    pdf.content.push({
      layout: 'noBorders',
      table: {
        widths: ['100%'],
        body: [[
          // Date
          {
            text: this.titleCasePipe.transform(this.datePipe.transform(workday.date, 'EEEE d/MM')),
            style: 'date',
            margin: 5
          }
        ]]
      },
      pageBreak: isFirstPage ? null : 'before'
    });

    if (workday.holiday) {
      pdf.content.push([
        // Holiday icon
        {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#003A70">
                    <path d="M 11 2 L 11 4.03125 C 5.933594 4.390625 2 7.460938 2 11.125 C 2.003906 12.171875 2.925781 13 4 13 C 4.699219 13 5.328125 12.660156 5.6875 12.1875 C 6.351563 12.683594 7.082031 13 8 13 C 8.863281 13 9.761719 12.722656 10.40625 12.28125 C 10.566406 12.453125 10.777344 12.59375 11 12.71875 L 11 21.3125 L 9.90625 20.03125 C 6.507813 20.144531 4 20.539063 4 21 C 4 21.550781 7.582031 22 12 22 C 16.417969 22 20 21.550781 20 21 C 20 20.492188 16.925781 20.09375 13 20.03125 L 13 12.71875 C 13.222656 12.59375 13.433594 12.453125 13.59375 12.28125 C 14.238281 12.722656 15.136719 13 16 13 C 16.917969 13 17.648438 12.683594 18.3125 12.1875 C 18.671875 12.660156 19.300781 13 20 13 C 21.074219 13 21.996094 12.171875 22 11.125 C 22 7.460938 18.066406 4.390625 13 4.03125 L 13 2 Z M 12 4 C 12 4 16.519531 5.234375 17.71875 9.28125 C 17.734375 9.351563 17.734375 9.429688 17.75 9.5 C 17.925781 10.320313 17.25 11 16 11 C 14.976563 11 14 10.226563 14 9.34375 C 13.734375 5.527344 12 4 12 4 Z M 12 4 C 12 4 10.265625 5.527344 10 9.34375 C 10 10.226563 9.023438 11 8 11 C 6.890625 11 6.230469 10.445313 6.21875 9.75 C 7.269531 5.769531 12 4 12 4 Z"/>
                </svg>`,
          width: 200,
          margin: [0, 30],
          style: 'holiday'
        },
        // Holiday text
        {
          text: 'Vrijaf',
          style: 'holiday'
        }
      ]);
    } else {
      // Add general info
      ExportService.addGeneral(pdf);
      // Add amActivities
      if (workday.amActivities.length !== 0) {
        this.addActivities(pdf, workday.amActivities, true);
      }
      // Add pmActivities
      if (workday.pmActivities.length !== 0) {
        this.addActivities(pdf, workday.pmActivities, false);
      }
    }
  }

  /**
   * Add activities to pdf
   * @param pdf pdf File to add to
   * @param activityUnits ActivityUnits
   * @param isAm  Whether the activities are situated before or after noon
   */
  private addActivities(pdf, activityUnits: ActivityUnit[], isAm: boolean) {
    // Activities header
    pdf.content.push(
      {
        text: isAm ? 'Voormiddag' : 'Namiddag',
        style: 'activitiesHeader',
        margin: [0, 25, 0, 0]
      }
    );
    // Add activities
    activityUnits.forEach(activityUnit => pdf.content.push([
      {
        text: activityUnit.activity.toString(),
        style: 'activityTitle',
        margin: [0, 20, 0, 10]
      },
      {
        layout: 'noBorders',
        table: {
          widths: ['auto', '*'],
          body: [
            [{text: 'Begeleiders', bold: true}, activityUnit.mentors.join(', ')],
            [{text: 'Cliënten', bold: true}, activityUnit.clients.join(', ')]
          ]
        }
      }
    ]));
  }

  public printWeek(workdays: Workday[]) {
    // Create empty pdf
    const pdf = this.createEmptyPdf(this.datePipe.transform(workdays[0].date, 'w'));
    // Add template info
    if (workdays[0].originalTemplateName) {
      ExportService.addTemplate(pdf, workdays[0].originalTemplateName, workdays[0].originalWeekNumber.toString());
    }
    // Add days
    let firstPage = true;
    workdays.forEach(workday => {
      if (!this.datesService.isWeekend(workday.date)) {
        this.addDay(pdf, workday, firstPage);
        firstPage = false;
      }
    });

    // Print pdf
    ExportService.print(pdf);
  }
}
