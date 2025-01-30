// src/Components/CalendarFreelancer.jsx
import React, { useEffect, useState } from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

const CalendarFreelancer = ({ contracts }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convertir contratos activos a eventos de calendario
    const calendarEvents = contracts.map(contract => {
      const { date, start_time, end_time } = contract;
      if (!date || !start_time || !end_time) {
        console.warn(`Contrato con ID ${contract.id} tiene datos incompletos de fecha/hora.`);
        return null;
      }

      // Crear objetos Date en formato ISO 8601
      const startDateTime = new Date(`${date}T${start_time}:00`);
      const endDateTime = new Date(`${date}T${end_time}:00`);

      // Verificar si las fechas son válidas
      if (isNaN(startDateTime) || isNaN(endDateTime)) {
        console.warn(`Contrato con ID ${contract.id} tiene fechas/hora inválidas.`);
        return null;
      }

      return {
        id: contract.id,
        title: contract.service.title,
        start: startDateTime, // Objeto Date
        end: endDateTime, // Objeto Date
        description: `Cliente: ${contract.client.name}`,
      };
    }).filter(event => event !== null); // Eliminar contratos sin date/time

    // Añadir un console.log para verificar los eventos
    console.log('Eventos para el Calendario:', calendarEvents);

    setEvents(calendarEvents);
  }, [contracts]);

  // Configuración del calendario usando useCalendarApp
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
    ],
    events: events, // Eventos provenientes de props
    selectDate: "2025-02-01T00:00:00", // Fecha inicial seleccionada en formato ISO
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
};

export default CalendarFreelancer;
