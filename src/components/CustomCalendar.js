import React, { useContext } from "react";
import CustomModal from "./CustomModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { observer } from "mobx-react-lite";
import { eventStoreContext } from "./EventStore";


const CustomCalendar = observer(function CustomCalendar() {
  const eventStore = useContext(eventStoreContext);  

  const handleDateSelect = (selectInfo) => {
    eventStore.toggleModal();
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
  }



  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
 

  return (
    <div className="">
      <div className="m-5">
        <FullCalendar
          height="auto"
          weekends={eventStore.weekendsVisible}
            initialEvents={eventStore.events.slice()} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleDateSelect}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          timeZone="local"
          initialDate={new Date()}
          nowIndicator="true"
          slotMinTime="09:00:00"
          slotMaxTime="23:00:00"
          editable={true}
          selectable={true}
          selectMirror={true}
        />
        <CustomModal/>
      </div>
    </div>
  );
}
)
export default CustomCalendar;