import { Component, OnInit } from '@angular/core';
import { DjangoService } from './../django.service';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  magnitude : String;
  focal_depth : String;
  latitude : String;
  longitude : String;
  markers: earthquake_data[];// = this.appComponent.e_data;
  lat: number= 0.0;
  lng: number = 0.0;
  constructor(public djangoService : DjangoService ) {
     let a = localStorage.getItem("store_data");
    this.markers = JSON.parse(a);
    this.lat = this.markers[0].lat;
    this.lng = this.markers[0].lng;
  }

  ngOnInit() {
      this.djangoService.getEarthquake() .subscribe(
      (result) => {
            this.markers = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                this.markers.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,date : feed.date, tsu : feed.tsunami});
            }

          },
          (error) => {
            console.log("Error in MapComponent ",error);
          }
        );
  }




}
// just an interface for type safety.

interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  date : String;
  tsu : boolean;
}
