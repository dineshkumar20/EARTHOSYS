import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { Observable } from 'rxjs/Rx';
import { DjangoService } from './../django.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
e_data : earthquake_data[];// = this.appComponent.e_data;
  constructor(private djangoService : DjangoService) {
    Observable.interval(2000*60).subscribe(x => {
      let a = localStorage.getItem("store_data");
      this.e_data = JSON.parse(a);
    })
  }

  ngOnInit() {
    // this.djangoService.getEarthquakeHome() .subscribe(
    //   (result) => {
    //         this.e_data = [];

    //         var jsonData = JSON.parse(result["_body"]);
    //         for (var i = 0; i < jsonData.feeds.length; i++) {
    //             var feed = jsonData.feeds[i];
    //             this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami,near_lat : feed.near_lat, near_lng : feed.near_lng,distance : feed.distance, speed : feed.speed});
    //         }
    //       },
    //       (error) => {
    //         console.log("Error in HomeComponent ",error);
    //       }
    //     );
  }


}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  epic : number;
  date : String;
  tsu : boolean;
  near_lat : number;
  near_lng : number;
  distance : number;
  speed : String;
}