import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private MIN_LOADING_TIME_MS = 3000; // 3 segundos

  // Muestra el spinner
  show() {
    this.loadingSubject.next(true);
  }

  // Oculta el spinner después de 3 segundos (mínimo)
  hide() {
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, this.MIN_LOADING_TIME_MS);
  }
}