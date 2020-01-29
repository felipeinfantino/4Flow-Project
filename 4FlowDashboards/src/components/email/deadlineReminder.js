import React, { Component } from "react";
import firebase from "../firebase/Firebase";
var db = firebase.firestore();

function splitDate(date) {
  return {
    day: date.getDay(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

export default class DeadlineRem extends Component {
  async getData() {
    const currentDate = new Date();
    const splittedDate = splitDate(currentDate);
    const currentDay = splittedDate.day;
    const currentMonth = splittedDate.month;
    const currentYear = splittedDate.year;
    const data = [];
    try {
      const snapshot = await db.collection("PlanerTasks").get();
      snapshot.forEach(doc => {
        const deadline = doc.get("deadline");
        const status = doc.get("status");
        if (deadline && status !== "Done") {
          const { day, month, year } = splitDate(deadline.toDate());
          if (
            currentDay === day &&
            currentMonth === month &&
            currentYear === year
          ) {
            console.log("pushing")
            data.push(doc.get("title"));
          }
        }
      });
    } catch (e) {}
    return data;
  }

  async sendEmail() {
    const data = await this.getData();
    if(data.length === 0){
        alert("no tasks to remind");
        return;
    }
    const message = "Reminder : Following tasks are due today : \n" + data.join(" ");
    try {
      const response = await fetch("http://localhost:3001/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destinations: ["amostuproject@gmail.com"],
          subject: "REMINDER",
          text: message
        })
      });
      alert("Email successfully sent");
    } catch (e) {
      console.log("error ", e);
    }
  }

  render() {
    return (
      <div>
        <div>
          <button
            type="btn"
            className="btn btn-primary submit-button"
            onClick={() => this.sendEmail()}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}
