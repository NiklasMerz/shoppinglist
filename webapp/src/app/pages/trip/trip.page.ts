import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Trip } from 'src/app/backend';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  id: any;
  trip: Trip;

  constructor(private api: ApiService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.loadTrips();
  }


  private async loadTrips() {
    this.id = this.activatedRouter.snapshot.params["trip"];
    this.trip = await this.api.retrieveTrip(this.id).toPromise();
  }
}
