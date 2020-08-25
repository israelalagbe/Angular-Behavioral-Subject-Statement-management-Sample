import { Component } from "@angular/core";

import { PeopleService } from "./people.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  //Addign the people$ observable to a as
  people$ = this.peopleService.people$;
  isLoading = false;
  constructor(private peopleService: PeopleService) {
    //You can even use subscribe here to watch the value change
    // this.people$.subscribe((value)=>console.log(value))
  }

  async fetchPeople() {
    try {
      this.isLoading = true;
      await this.peopleService.fetchPeople();
    } catch (e) {
      alert("Error occured while fetching people");
    } finally {
      this.isLoading = false;
    }
  }
}
