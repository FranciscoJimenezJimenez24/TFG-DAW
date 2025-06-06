import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private MIN_LOADING_TIME_MS = 1000; // Tiempo mínimo de visualización (1 segundo)
  private startTime: number | null = null;
  private timeoutId: any = null;

  // Muestra el spinner
  show() {
    if (!this.loadingSubject.value) {
      this.startTime = Date.now();
      this.loadingSubject.next(true);
    }
  }

  // Oculta el spinner respetando el tiempo mínimo de visualización
  hide() {
    if (this.loadingSubject.value) {
      const elapsed = Date.now() - (this.startTime || 0);
      const remainingTime = Math.max(0, this.MIN_LOADING_TIME_MS - elapsed);

      // Cancelar cualquier timeout previo
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.loadingSubject.next(false);
        this.startTime = null;
        this.timeoutId = null;
      }, remainingTime);
    }
  }
}