import { Component, OnInit } from '@angular/core';
import { ApiService, Trip } from 'src/app/backend';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  trips: Trip[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.load();
  }


  private async load() {
    this.trips = await this.api.listTrips().toPromise();
  }
}
