import { Workday } from '../domain/workday.model';

export interface EditData {
  workday: Workday;
  changeType: string;
  planningDate: Date;
}