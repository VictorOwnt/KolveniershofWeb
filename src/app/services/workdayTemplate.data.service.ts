import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatesService} from './dates.service';
import {Observable} from 'rxjs';
import {WorkdayTemplate} from '../models/workdayTemplate.model';
import {API_URL} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Workday} from '../models/workday.model';

@Injectable({
  providedIn: 'root'
})
export class WorkdayTemplateDataService {

  constructor(private http: HttpClient, private datesService: DatesService) {
  }

  get workdayTemplates$(): Observable<WorkdayTemplate[]> {
    return this.http
      .get(`${API_URL}/workdayTemplates`)
      .pipe(map((list: any[]): WorkdayTemplate[] => list.map(WorkdayTemplate.fromJSON)));
  }

  get templateNames$(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/workdayTemplates/names`);
  }

  getWorkdayTemplateById(id: string): Observable<WorkdayTemplate> {
    return this.http
      .get(`${API_URL}/workdayTemplates/id/${id}`)
      .pipe(map(WorkdayTemplate.fromJSON));
  }

  getWorkdayTemplatesByName(name: string, week: number = null, day: number = null): Observable<WorkdayTemplate[]> {
    let url;
    if (week) {
      if (day) {
        url = `${API_URL}/workdayTemplates/name/${name}/${week}/${day}`;
      } else {
        url = `${API_URL}/workdayTemplates/name/${name}/${week}`;
      }
    } else {
      url = `${API_URL}/workdayTemplates/name/${name}`;
    }
    return this.http
      .get(url)
      .pipe(map((list: any[]): WorkdayTemplate[] => list.map(WorkdayTemplate.fromJSON)));
  }

  postCreateWorkdayTemplatesWithName(templateName: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/workdayTemplates/name`, templateName);
  }

  postWorkdayTemplate(workdayTemplate: WorkdayTemplate): Observable<WorkdayTemplate> {
    return this.http
      .post(`${API_URL}/workdayTemplates`, workdayTemplate)
      .pipe(map(WorkdayTemplate.fromJSON));
  }

  patchWorkdayTemplate(workdayTemplate: WorkdayTemplate): Observable<WorkdayTemplate> {
    return this.http
      .post(`${API_URL}/workdayTemplates/id/${workdayTemplate.id}`, workdayTemplate)
      .pipe(map(WorkdayTemplate.fromJSON));
  }

  patchWorkdayTemplateName(oldName: string, newName: string): Observable<boolean> {
    return this.http.patch<boolean>(`${API_URL}/workdayTemplates/name/${oldName}`, newName);
  }


  deleteWorkdayTemplate(id: string) {
    return this.http.delete<boolean>(`${API_URL}/workdayTemplates/id/${id}`);
  }

  deleteWorkdayTemplates(templateName: string) {
    return this.http.delete<boolean>(`${API_URL}/workdayTemplates/name/${templateName}`);
  }

  createWeek(templateName: string, weekNumber: number, date: Date): Observable<Workday[]> {
    return this.http
      .post(`${API_URL}/workdayTemplates/createWeek/${templateName}/${weekNumber}/${this.datesService.backendFormatDate(date)}`, null)
      .pipe(map((list: any[]): Workday[] => list.map(Workday.fromJSON)));
  }

  getDayIcon(day: number): string {
    let iconName = 'icons/icon-';
    switch (day) {
      case 0:
        iconName = iconName.concat('sun');
        break;
      case 1:
        iconName = iconName.concat('moon');
        break;
      case 2:
        iconName = iconName.concat('beach-ball');
        break;
      case 3:
        iconName = iconName.concat('angry');
        break;
      case 4:
        iconName = iconName.concat('cloud-lightning');
        break;
      case 5:
        iconName = iconName.concat('bird');
        break;
      case 6:
        iconName = iconName.concat('flower-bouquet');
        break;
      default:
        iconName = iconName.concat('angry');
        break;
    }
    iconName = iconName.concat('.svg');
    return iconName;
  }

}
