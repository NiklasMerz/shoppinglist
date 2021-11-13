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
  image: Blob;

  constructor(private api: ApiService, private activatedRouter: ActivatedRoute, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loadTrips();
  }

  save() {
    if (this.image) {
      this.trip.reciept = this.image;
    }
    console.debug(this.trip);

    const formdata = new FormData();

    for (let prop in this.trip) {
      formdata.append(prop, this.trip[prop]);
    }

    console.debug(formdata);

    this.api.partialUpdateTrip(this.trip.id.toString(), formdata as unknown as Trip).subscribe(() => {
      this.toastCtrl.create({
        message: 'Trip updated',
        duration: 2000
      }).then(toast => toast.present());
    });
  }

  addFile(event) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // get the blob of the image:
      this.image = new Blob([new Uint8Array((reader.result as ArrayBuffer))], { type: file.type });
      // create blobURL, such that we could use it in an image element:
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  };

  private async loadTrips() {
    this.id = this.activatedRouter.snapshot.params.trip;
    this.trip = await this.api.retrieveTrip(this.id).toPromise();
  }
}
