import React from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

function Calendar() {
  // Configuración del calendario usando useCalendarApp
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
    ],
    events: [
      {
        id: 1,
        title: "Reunión con ....",
        start: "2025-01-24 00:00",
        end: "2025-01-24 02:00",
        description: "My new event",
      },
    ],
    selectDate: "2025-01-25 00:00",
    plugins:[createEventModalPlugin(), createDragAndDropPlugin()]
  });

  // Retorno del componente ScheduleXCalendar
  return <ScheduleXCalendar calendarApp={calendar} />;
}

export default Calendar;
