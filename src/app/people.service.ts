import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

interface Person {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Injectable()
export class PeopleService {
  //A BehaviorSubject is also the same thing as an observable that can be controlled
  public people$ = new BehaviorSubject<Person[]>([]);
  constructor(private http: HttpClient) {}

  async fetchPeople(page = 1, limit = 20): Promise<Person[]> {
    const people = (await this.http
      .get("https://jsonplaceholder.typicode.com/users", {
        params: {
          page: String(page),
          limit: String(limit)
        }
      })
      .toPromise()) as Person[];
    //Update the behavioral subject observable
    this.people$.next(people);

    return people;
  }
}
