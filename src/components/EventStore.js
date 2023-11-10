import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class EventStore {
  weekendsVisible = true;
  open = false;
  user = {};
  eventGuid = 0;
  currentEvent = null;
  events = [
    {
      id: this.createEventId(),
      title: "All-day event",
      start: new Date(),
      allDay: true,
    },
    {
      id: this.createEventId(),
      title: "Timed event",
      start: new Date(),
      allDay: false,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getEvents() {
    return this.events;
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  addEvent(selectInfo, title) {
    this.events.push({
      id: this.user.id || this.createEventId,
      title: title || "New Event",
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
    });
  }

  deleteEvent() {
    if (this.currentEvent.event) {
      this.toggleModal();
      this.currentEvent.event.remove();
    }
  }

  changeEvent(title) {
    if (this.currentEvent.event) {
      this.currentEvent.event.setProp("title", title);
    } else {
      this.currentEvent.view.calendar.addEvent({
        id: this.user.id || this.createEventId(),
        title: title || "New Event",
        start: this.currentEvent.start,
        end: this.currentEvent.end,
        allDay: this.currentEvent.allDay,
      });
    }
  }

  toggleModal() {
    this.open = !this.open;
  }
  
  toggleWeekends() {
    this.weekendsVisible = !this.weekendsVisible;
  }
}

export const eventStoreContext = createContext(new EventStore());
