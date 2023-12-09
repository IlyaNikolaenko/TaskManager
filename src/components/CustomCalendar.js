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
    if (!selectInfo?.event) {
      eventStore.toggleModal();
      eventStore.getCurrentEvent(selectInfo);
      selectInfo.view.calendar.unselect(); // clear date selection
    } else if (selectInfo?.event.id === eventStore.user.id) {
      eventStore.toggleModal();
      eventStore.getCurrentEvent(selectInfo);
      selectInfo.view.calendar.unselect(); // clear date selection
    } else {
      alert("This slot is already reserved");
    }
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>
          {eventInfo.event.title !== " " ? eventInfo.event.title : "No Name"}
        </b>
      </>
    );
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
          selectable={true}
          selectMirror={true}
        />
        <CustomModal />
      </div>
    </div>
  );
});
export default CustomCalendar;
