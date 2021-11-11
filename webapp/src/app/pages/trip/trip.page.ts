import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService, Trip } from 'src/app/backend';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  id: any;
  trip: Trip;

  constructor(private api: ApiService, private activatedRouter: ActivatedRoute, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loadTrips();
  }

  save() {
    this.api.updateTrip(this.trip.id.toString(), this.trip).subscribe(() => {
      this.toastCtrl.create({
        message: 'Trip updated',
        duration: 2000
      }).then(toast => toast.present());
    });
  }

  private async loadTrips() {
    this.id = this.activatedRouter.snapshot.params["trip"];
    this.trip = await this.api.retrieveTrip(this.id).toPromise();
  }
}
