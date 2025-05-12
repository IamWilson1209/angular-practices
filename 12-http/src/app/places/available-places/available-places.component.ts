import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from 'rxjs'

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  isError = signal('');
  private placeServices = inject(PlacesService)
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    this.isFetching.set(true);
    const subscription =
      this.placeServices.loadAvailablePlaces().subscribe({
        next: (places) => {
          /* 有observe: response的話 */
          // console.log(response.body?.places)

          /* 設定給signal */
          console.log(places);
          this.places.set(places);
        },
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

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placeServices.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resData) => console.log(resData)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    });
  }
}
