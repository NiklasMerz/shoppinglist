import { Component } from '@angular/core';
import { ApiService, Trip } from 'src/app/backend';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage {
  trips: Trip[] = [];

  constructor(private api: ApiService) { }

  ionViewDidEnter() {
    this.load();
  }


  private async load() {
    this.trips = await this.api.listTrips().toPromise();
  }
}
