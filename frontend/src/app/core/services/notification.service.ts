  import {Injectable} from '@angular/core';
  import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

  @Injectable({ 
    providedIn: 'root'
  }) 

export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(
      public snackBar: MatSnackBar,
    ) {}
    public open(message:any, action = 'success', duration = 5000) {
      if(action === 'error'){
        if (
          typeof message.error === "object" &&
          !message.error.byteLength
        ) {
          for (var key in message.error) {
              this.snackBar.open(key+ " - "+(typeof message.error[key] === "string"
                  ? message.error[key]
                  : message.error[key][0]), "Close", {
                  duration,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
          }
        } else {
          this.snackBar.open(message.status+" - "+message.statusText, "Close", {
           duration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        }
      }

      if(action === 'success') {
        this.snackBar.open(message, "Close", {
         duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      }
    }
}
