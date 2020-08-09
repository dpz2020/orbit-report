import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceList: Satellite[];
  displayList: Satellite[]; 
  title = 'orbit-report';

  //   constructor() {
  //     this.sourceList = [
  //        new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
  //        new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
  //        new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
  //        new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
  //        new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
  //     ];
  //  }


  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function (response) {
      response.json().then(function (data) {

        let fetchedSatellites = data.satellites;
        fetchedSatellites.forEach(fetchedSatellites => {
          this.sourceList.push(new Satellite(fetchedSatellites.name, fetchedSatellites.type, fetchedSatellites.launchDate, fetchedSatellites.orbitType, fetchedSatellites.operational));
          this.displayList = this.sourceList.slice(0);
        });

      }.bind(this));
    }.bind(this));

  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for (let i = 0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }

}
