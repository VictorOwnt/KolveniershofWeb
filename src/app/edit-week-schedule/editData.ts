import { Workday } from '../shared/models/workday.model';

export interface EditData {
  workday: Workday;
  changeType: string;
  planningDate: Date;
}
