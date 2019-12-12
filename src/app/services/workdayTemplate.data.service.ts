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

  getWorkdayTemplatesByName(name: string, week: string = null, day: string = null): Observable<WorkdayTemplate[]> {
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

}
