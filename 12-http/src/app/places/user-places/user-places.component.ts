import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  isError = signal('');
  private placesService = inject(PlacesService)
  private destroyRef = inject(DestroyRef)
  places = this.placesService.loadedUserPlaces

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces()
      .subscribe({
        // next: (places) => {
        /* 有observe: response的話 */
        // console.log(response.body?.places)

        /* 設定給signal */
        //   console.log(places);
        //   this.places.set(places);
        // },
        /* 這裡只是暫時管理，可以到error-service取作更好的統一管理 */
        error: (error: Error) => {
          console.log(error.message);
          this.isError.set("Something went wrong!!");
          // this.isError.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    });
  }

  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    });
  }
}
