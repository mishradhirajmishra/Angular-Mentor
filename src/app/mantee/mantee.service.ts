import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpErrorResponse } from "@angular/common/http";
import {RegisterMantee  } from "../mantee/register-mantee";
import {throwError } from "rxjs";
import {catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ManteeService {
  ServerUrl = environment.url;
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }
  addBabaStart(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'addBabaStart', formdata).pipe(
      catchError(this.handleError)
    );
  }
  babaStartByProjectKey(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'babaStartByProjectKey', formdata).pipe(
      catchError(this.handleError)
    );
  }
  adminAllHelpArea() {
    return this.http.get<any>(this.ServerUrl + 'adminAllHelpArea').pipe(
      catchError(this.handleError)
    );
  }
  allSubHelpAreaByHelpAreaKey(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'allSubHelpAreaByHelpAreaKey', formdata).pipe(
      catchError(this.handleError)
    );
  }

  todayAllMeetingCount(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'todayAllMeetingCount', formdata).pipe(
      catchError(this.handleError)
    );
  }
    // ======================Post Function=========================
    chatProfile(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'chatProfile', formdata).pipe(
        catchError(this.handleError)
      );
    }
    chatRoom(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'chatRoom', formdata).pipe(
        catchError(this.handleError)
      );
    }
    chatContactExist(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'chatContactExist', formdata).pipe(
        catchError(this.handleError)
      );
    }
    addChatContact(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'addChatContact', formdata).pipe(
        catchError(this.handleError)
      );
    }
    chatContactList(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'chatContactList', formdata).pipe(
        catchError(this.handleError)
      );
    }
    loginStatusIndividual(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'loginStatusIndividual', formdata).pipe(
        catchError(this.handleError)
      );
    }
    logout(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'logout', formdata).pipe(
        catchError(this.handleError)
      );
    }
    addPost(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'addPost', formdata).pipe(
        catchError(this.handleError)
      );
    }
    deletePost(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'deletePost', formdata).pipe(
        catchError(this.handleError)
      );
    }
    allPost(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'allPost', formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    manteeAllPost(formdata:any) {
      return this.http.post<any>(this.ServerUrl +'manteeAllPost', formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    allIntrestareaforPost(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'allIntrestareaforPost',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    addPostLike(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'addPostLike',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    isPostLike(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'allIntrestareaforPost',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    allPostLikeCount(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'allPostLikeCount',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    addPostComment(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'addPostComment',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    updatePostComment(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'updatePostComment',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    allPostComment(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'allPostComment',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    addPostCommentReply(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'addPostCommentReply',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    allPostCommentReply(formdata:any) {
      return this.http.post<any>(this.ServerUrl + 'allPostCommentReply',formdata, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    
  // ======================Notification=========================
  addNotification(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'addNotification',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allNotification(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allNotification',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allNotificationCount(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allNotificationCount',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteNotification(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'deleteNotification',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // ======================Other Function=========================
  addFollow(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'addFollow', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  isFollow(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'isFollow', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allFollowCount(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'allFollowCount', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allChatMessage(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'allChatMessage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allUnreadMessage(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'allUnreadMessage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addChatMessage(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'addChatMessage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateChatMessage(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'updateChatMessage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deletrChatMessage(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'deletrChatMessage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  ifManteeExist(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'userExist', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  ifManteeEmailExist(formdata:any) {
    return this.http.post<any>(this.ServerUrl +'emailExist', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addMantee(formdata: RegisterMantee) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'addMantee', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addMeeting(formdata: any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'addMeeting', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateProfile(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateManteeProfile', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateProfileImage(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateManteeProfileImage', formdata).pipe(
      catchError(this.handleError)
    );
  }
  updateprojectImage(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateprojectImage', formdata).pipe(
      catchError(this.handleError)
    );
  }
  updateManteeIntrestArea(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateManteeIntrestArea', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateManteeHelpArea(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateManteeHelpArea', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateAccount(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateAccount', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getProfile(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'manteeProfile', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  acceptMeetingByAdmin(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'acceptMeetingByAdmin', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  cancelMeetingByUser(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'cancelMeetingByUser', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  rejectMeetingByAdmin(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'rejectMeetingByAdmin', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  otherProfile(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'orherProfile', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  accountByKey(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'accountByKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getprojectImage(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'projectImage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  projectByKey(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'projectByKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allIntrest(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allIntrestarea',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  allHelpArea(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allHelpArea',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  manteeAllProjects(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allProjectOfMantee',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  menteeProjDropdown(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'menteeProjDropdown',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allApprovedProjectOfMantee(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allApprovedProjectOfMantee',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'deleteMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allMeetingOfAdmin(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'allMeetingOfAdmin',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  upcommingMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'upcommingMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  rejectedMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'rejectedMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteRejectedMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'deleteRejectedMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  manageMeeting(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'manageMeeting',formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // ===========================
  allUser(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'allUser', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allMentor(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'allMentor', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  follower(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'follower', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  searchUser(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'searchUser', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allManteeCrousel(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'allManteeCrousel', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allManteeCrouselDesk(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'allManteeCrouselDesk', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // ========================
  manteeProfileEdulist() {
    return this.http.get<any>(this.ServerUrl + 'manteeProfileEdulist').pipe(
      catchError(this.handleError)
    );
  }
  manteeProfileExplist() {
    return this.http.get<any>(this.ServerUrl + 'manteeProfileExplist').pipe(
      catchError(this.handleError)
    );
  }
  addProject(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'addProject', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  profileImage(formdata:any) {
    return this.http.post<RegisterMantee>(this.ServerUrl + 'manteeProfileImage', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  projectFocusArea() {
    return this.http.get<any>(this.ServerUrl + 'projectFocusArea').pipe(
      catchError(this.handleError)
    );
  }
  checkRole(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'getRole', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }
   addProjectRequestToView(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'addProjectRequestToView', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }

   checkProjectRequestToViewStatus(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'checkProjectRequestToViewStatus', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }

   listViewOfProjectByProjectKey(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'listViewOfProjectByProjectKey', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }
   updateViewOfProject(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'updateViewOfProject', formdata, this.httpOptions).pipe(
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
