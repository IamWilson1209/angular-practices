import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService)
  private httpClient = inject(HttpClient)
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong!')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something went wrong!')
      .pipe(
        tap({
          next: (userPlaces) => this.userPlaces.set(userPlaces)
        })
      )
  }

  /* 樂觀更新 */
  addPlaceToUserPlaces(place: Place) {
    /* 紀錄原本的狀態，用於Rollback */
    const prevState = this.userPlaces();

    /* 確認不會重複新增 */
    if (!prevState.some((p) => p.id === place.id)) {
      /* 更新前端資料 */
      this.userPlaces.set([...prevState, place]);
    }

    /* 更新後端資料（後端自己有檢查重複的邏輯） */
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id, /* 後端要的是 req.body.placeId; */
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevState); /* Rollback */
        this.errorService.showError("faile to connect to backend") /* Error state的統一管理 */
        return throwError(() => new Error("faile to connect to backend"))
      })
    )
  }

  removeUserPlace(place: Place) {
    /* 紀錄原本的狀態，用於Rollback */
    const prevState = this.userPlaces();

    /* 確認不會重複刪除 */
    if (prevState.some((p) => p.id === place.id)) {
      /* 更新前端資料 */
      this.userPlaces.set(prevState.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id)
      .pipe(catchError((error) => {
        this.userPlaces.set(prevState); /* Rollback */
        this.errorService.showError("faile to connect to backend") /* Error state的統一管理 */
        return throwError(() => new Error("faile to connect to backend"))
      }))
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, { /* observe: 'response' */ })
      .pipe(
        map((resData) => resData.places), /* 去掉 places key */
        // catchError((error, obs) => {
        //   console.log(error);
        //   return throwError(() => new Error(errorMessage))
        // })
      )
  }
}
