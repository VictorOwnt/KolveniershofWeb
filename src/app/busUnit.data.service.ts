import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, share, catchError, delay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BusUnit } from "./domain/busUnit.model";

@Injectable({
  providedIn: "root"
})
export class BusUnitDataService {}
