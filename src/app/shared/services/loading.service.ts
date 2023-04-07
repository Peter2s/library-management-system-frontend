import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showLoading() {
    this.isLoading$.next(true);
    console.log("Loading show");
  }

  hideLoading() {
    this.isLoading$.next(false);
        console.log("Loading hide");

  }
}
