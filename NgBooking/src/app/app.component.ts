import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  public test : Observable<Test[]>;
  title = 'NgBooking';

  constructor(private afs: AngularFirestore) {
    this.test = this.afs.collection('test').valueChanges();
  }

  ngOnInit(): void {
    this.afs.collection('test').valueChanges()
    .subscribe( res => {
      console.log(res);
    })
  }
}


class Test {
  id?: string;
  ime?: string;
}