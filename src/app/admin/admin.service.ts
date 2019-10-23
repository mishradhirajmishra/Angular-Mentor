import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpErrorResponse } from "@angular/common/http";
import {RegisterMantee  } from "../mantee/register-mantee";
import {throwError } from "rxjs";
import {catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AdminService {  
  ServerUrl = environment.url;
  
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }
  logout(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'logout', formdata).pipe(
      catchError(this.handleError)
    );
  }
  allContact() {
    return this.http.get<any>(this.ServerUrl +'allContact').pipe(
      catchError(this.handleError)
    );
  }
  allSubscriber() {
    return this.http.get<any>(this.ServerUrl +'allSubscriber').pipe(
      catchError(this.handleError)
    );
  }
  adminAllInterestArea() {
    return this.http.get<any>(this.ServerUrl +'adminAllInterestArea').pipe(
      catchError(this.handleError)
    );
  }
  adminAddInterestArea(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'adminAddInterestArea',formdata).pipe(
      catchError(this.handleError)
    );
  }
  adminAllStartupArea() {
    return this.http.get<any>(this.ServerUrl +'adminAllStartupArea').pipe(
      catchError(this.handleError)
    );
  }
  adminAddStartupArea(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'adminAddStartupArea',formdata).pipe(
      catchError(this.handleError)
    );
  }
  adminAllProjectFocus() {
    return this.http.get<any>(this.ServerUrl +'adminAllProjectFocus').pipe(
      catchError(this.handleError)
    );
  }
  adminAddProjectFocus(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'adminAddProjectFocus',formdata).pipe(
      catchError(this.handleError)
    );
  }
// -------------------------------
adminAllEduDropDown() {
  return this.http.get<any>(this.ServerUrl +'adminAllEduDropDown').pipe(
    catchError(this.handleError)
  );
}
adminAddEduDropDown(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAddEduDropDown',formdata).pipe(
    catchError(this.handleError)
  );
}
adminAllExpDropDown() {
  return this.http.get<any>(this.ServerUrl +'adminAllExpDropDown').pipe(
    catchError(this.handleError)
  );
}
adminAddExpDropDown(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAddExpDropDown',formdata).pipe(
    catchError(this.handleError)
  );
}
adminAllUser() {
  return this.http.get<any>(this.ServerUrl +'adminAllUser').pipe(
    catchError(this.handleError)
  );
}

adminAllProject(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAllProject',formdata).pipe(
    catchError(this.handleError)
  );
}
adminAddProjectApproval(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAddProjectApproval',formdata).pipe(
    catchError(this.handleError)
  );
}
adminAllHelpArea() {
  return this.http.get<any>(this.ServerUrl +'adminAllHelpArea').pipe(
    catchError(this.handleError)
  );
}
adminAddHelpArea(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAddHelpArea',formdata).pipe(
    catchError(this.handleError)
  );
}
adminAllSubHelpArea() {
  return this.http.get<any>(this.ServerUrl +'adminAllSubHelpArea').pipe(
    catchError(this.handleError)
  );
}
adminAddSubHelpArea(formdata:any) {
  return this.http.post<any>(this.ServerUrl +'adminAddSubHelpArea',formdata).pipe(
    catchError(this.handleError)
  );
}
// ================== dashboatd items ============================
adminBabaStartCount() {
  return this.http.get<any>(this.ServerUrl +'adminBabaStartCount').pipe(
    catchError(this.handleError)
  );
}
adminSubscriberCount() {
  return this.http.get<any>(this.ServerUrl +'adminSubscriberCount').pipe(
    catchError(this.handleError)
  );
}
adminHelpAreaCount() {
  return this.http.get<any>(this.ServerUrl +'adminHelpAreaCount').pipe(
    catchError(this.handleError)
  );
}
adminIntrestAreaCount() {
  return this.http.get<any>(this.ServerUrl +'adminIntrestAreaCount').pipe(
    catchError(this.handleError)
  );
}
adminUserCount() {
  return this.http.get<any>(this.ServerUrl +'adminUserCount').pipe(
    catchError(this.handleError)
  );
}
adminMentorCount() {
  return this.http.get<any>(this.ServerUrl +'adminMentorCount').pipe(
    catchError(this.handleError)
  );
}
adminMenteeCount() {
  return this.http.get<any>(this.ServerUrl +'adminMenteeCount').pipe(
    catchError(this.handleError)
  );
}
adminProjectsCount() {
  return this.http.get<any>(this.ServerUrl +'adminProjectsCount').pipe(
    catchError(this.handleError)
  );
}
adminApprovedProjectsCount() {
  return this.http.get<any>(this.ServerUrl +'adminApprovedProjectsCount').pipe(
    catchError(this.handleError)
  );
}
adminPendingProjectsCount() {
  return this.http.get<any>(this.ServerUrl +'adminPendingProjectsCount').pipe(
    catchError(this.handleError)
  );
}
adminRejectedProjectsCount() {
  return this.http.get<any>(this.ServerUrl +'adminRejectedProjectsCount').pipe(
    catchError(this.handleError)
  );
}
allMeetingAdminDashboard() {
  return this.http.get<any>(this.ServerUrl +'allMeetingAdminDashboard').pipe(
    catchError(this.handleError)
  );
}
allMeetingAdminDashboardToday() {
  return this.http.get<any>(this.ServerUrl +'allMeetingAdminDashboardToday').pipe(
    catchError(this.handleError)
  );
}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
