import { createContext } from "react";

export class EventStore {
  weekendsVisible = true;
  open = false;
  eventGuid = 0;
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

  getEvents() {
    return this.events;
  }
  createEventId() {
    return String(this.eventGuid++);
  }
  addEvent(selectInfo, title) {
    this.events.push({
      id: this.createEventId(),
      title: title || "New Event",
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
    });
  }
  deleteEvent(id) {
    this.events.splice(
      this.events.findIndex((e) => e.id === id),
      1
    );
  }
  changeEvent(changeInfo) {
    const newEvent = changeInfo.event;
    const storedEvent = this.events.find((e) => e.id === changeInfo.event.id);
    if (storedEvent) {
      storedEvent.title = newEvent.title;
      storedEvent.allDay = newEvent.allDay;
      storedEvent.start = newEvent.start || storedEvent.start;
      storedEvent.end = newEvent.end || storedEvent.end;
    }
  }
  toggleModal(){
    this.open = !this.open;
  }
  toggleWeekends() {
    this.weekendsVisible = !this.weekendsVisible;
  }
}

export const eventStoreContext = createContext(new EventStore());