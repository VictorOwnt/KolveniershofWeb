import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {API_URL} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Comment, Workday} from '../models/workday.model';
import {DatesService} from './dates.service';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkdayDataService {
  public loadingError = new Subject<string>();

  constructor(private http: HttpClient, private datesService: DatesService) {
  }

  get workdays$(): Observable<Workday[]> {
    return this.http.get(`${API_URL}/Workdays`).pipe(
      catchError(error => {
        this.loadingError.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }

  getWorkdayById(id: string): Observable<Workday> {
    return this.http
      .get(`${API_URL}/workdays/id/${id}`)
      .pipe(map((workday: any): Workday => Workday.fromJSON(workday)));
  }

  getWorkdayByDate(date: Date): Observable<Workday> {
    return this.http
      .get(`${API_URL}/Workdays/date/${this.datesService.backendFormatDate(date)}`)
      .pipe(map((workday: any): Workday => Workday.fromJSON(workday)));
  }

  getWorkdaysByWeek(weekdate: Date): Observable<Workday[]> {
    return this.http
      .get(`${API_URL}/workdays/week/${this.datesService.backendFormatDate(weekdate)}`)
      .pipe(map((list: any[]): Workday[] => list.map(Workday.fromJSON)));
  }

  getWorkdaysByWeekByUser(weekdate: Date, user: User): Observable<Workday[]> {
    return this.http
      .get(`${API_URL}/workdays/week/${this.datesService.backendFormatDate(weekdate)}/${user.id}`)
      .pipe(map((list: any[]): Workday[] => list.map(Workday.fromJSON)));
  }

  postWorkday(workday: Workday): Observable<Workday> {
    return this.http
      .post(`${API_URL}/workdays`, workday.toJSON())
      .pipe(map(Workday.fromJSON));
  }

  patchWorkday(workday: Workday): Observable<Workday> {
    return this.http
      .patch(`${API_URL}/workdays/id/${workday.id}`, workday)
      .pipe(map(Workday.fromJSON));
  }

  createEmptyWeek(weekdate: Date): Observable<Workday[]> {
    return this.http
      .post(`${API_URL}/workdays/week/${this.datesService.backendFormatDate(weekdate)}`, null)
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

  postComment(workday: Workday, comment: string): Observable<Comment> {
    return this.http
      .post(`${API_URL}/workdays/id/${workday.id}`, {comment})
      .pipe(map(Comment.fromJSON));
  }

  patchComment(workday: Workday, comment: Comment): Observable<Comment> {
    return this.http
      .patch(`${API_URL}/workdays/id/${workday.id}/comments/${comment.id}`, comment)
      .pipe(map(Comment.fromJSON));
  }
}
