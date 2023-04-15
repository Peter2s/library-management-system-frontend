import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showLoading() {
    this.isLoading$.next(true);
  }

  hideLoading() {
    this.isLoading$.next(false);
  }
}
