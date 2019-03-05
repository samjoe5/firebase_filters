import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { text } from '@angular/core/src/render3';
import * as firebase from 'firebase';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { timestamp } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Key } from 'protractor';
import { link } from 'fs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public message: any = {
    coin: "",
  }


  public messages = [];
  public messdata = [];
  constructor(db: AngularFireDatabase, private zone: NgZone) {
    this.message = db.list('/message');

  }

  // websoc(): void {


  //   if ("WebSocket" in window) {
  //     alert("WebSocket is supported by your Browser!");

  //     // Let us open a web socket
  //     var ws = new WebSocket("ws://35.200.188.175/marketdata/all");

  //     ws.onopen = () => {

  //       // Web Socket is connected, send data using send()
  //       ws.send("Message to send");
  //       alert("Message is sent...");
  //     };

  //     ws.onmessage = (evt) => {
  //       var received_msg = evt.data;
  //       //alert("Message is received...");
  //       console.log(received_msg)
  //       this.message.push(received_msg)
  //     };
  //     //  this.message.push({
  //     //   "received": this.message.received_msg,
  //     //  // "time": firebase.database.ServerValue.TIMESTAMP

  //     // });


  //   } else {

  //     // The browser doesn't support WebSocket
  //     alert("WebSocket NOT supported by your Browser!");
  //   }
  // }

  view(): void {
    // this.messages = [];
    // var ref = firebase.database().ref("message/");
    // ref.on("value", (snapshot, prevChildKey) => {

    //   var newMessage = (snapshot.val());

    //   this.zone.run(() => {
    //     for (let id in newMessage) {
    //       const msg = newMessage[id];

    //       this.messages.push(
    //         {
    //           "coin": (msg.coin),
    //           "title": (msg.title),
    //           "url": (msg.url),
    //           "time": (msg.time)
    //         });
    //     }
    //   });
      
      this.messdata = [];
      var ref = firebase.database().ref("message/");
    ref.on("value", (snapshot, prevChildKey) => {

      var newMessage = (snapshot.val());
      //console.log(newMessage)

        this.zone.run(() => {
        for (let coinid in newMessage) {
          const mess = newMessage[coinid];
          //console.log(mess)

        }
        ref.orderByChild("coinbase").on("child_added", (snapshot) => {
          console.log(snapshot.val().coinbase);
          this.messdata.push(
            {"coin": (snapshot.val().coinbase)
          
          
          })
       });
      })


        // ref.orderByChild("coin").startAt("BTC").on("child_added", function (snapshot) {
        //   console.log("Start at filter: " + snapshot.val().coin);
        //   ref.orderByChild("coin").endAt("BTC").on("child_added", function (snapshot) {
        //     console.log("End at filter: " + snapshot.val().coin);
        //   })
        // })
      //});


      //console.log(this.messages);


      // var messageRef = firebase.database().ref("message/");

      // messageRef.on("child_added", (data) => {
      //   //this.messages = [];
      //   var newMessage = data.val();

      //   // console.log("coin: " + newMessage.coin);
      //   // console.log("title: " + newMessage.title);
      //   // console.log("url: " + newMessage.url);
      //   // console.log("time: " + newMessage.time)
      //   //console.log("Previous Message: " + prevChildKey);

      //   //this.zone.run(() => {
      //     this.messages.push({
      //       "coin": (newMessage.coin),
      //       "title": (newMessage.title),
      //       "url": (newMessage.url),
      //       "time": (newMessage.time),
      //       //"prevChildKey": prevChildKey,

      //     });


      //     //console.log(this.messages[0].coin)
      //     //console.log(this.messages[0].title)
      //     //console.log(this.messages[0].url)
      //     //console.log(this.messages[0].time)
      //     console.log(this.messages)
      //     this.messages5 = this.messages;

    })
  };


  cancel(): void {
    console.log('do nothing')
    this.message.coin = ""
    this.message.url = ""
  }
  save(): void {
    let error = false;

    if (error === false) {
      this.message.push({
        "coin": this.message.coin,
        "title": this.message.title,
        "url": this.message.url,
        "time": firebase.database.ServerValue.TIMESTAMP

      });
      console.log(this.message);
      alert("Submitted Successfully!");
      this.message.coin = ""
      this.message.title = ""
      this.message.url = ""

    }
  }
}