import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogVisibility = new BehaviorSubject<boolean>(false);
  dialogVisibility$ = this.dialogVisibility.asObservable();

  showDialog() {
    console.log('Showing dialog');
    this.dialogVisibility.next(true);
  }

  hideDialog() {
    console.log('Hiding dialog');
    this.dialogVisibility.next(false);
  }
}
