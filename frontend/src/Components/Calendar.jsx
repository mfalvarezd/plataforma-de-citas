import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "luxon";
import axios from "../api/axios"; // Asegúrate de configurar axios correctamente

function Calendar({ user }) {
  const [events, setEvents] = useState([]);

  // Función para obtener contratos desde la API
  const fetchContracts = async () => {
    try {
      const response = await axios.get("/contracts", {
        params: { client_id: user.id },
      });

      console.log("Contratos obtenidos:", response.data);

      // Convertir contratos a eventos para FullCalendar
      const formattedEvents = response.data.map((contract) => ({
        id: contract.id,
        title: `Contrato con ${contract.freelancer.name}`,
        start: DateTime.fromFormat(
          `${contract.date} ${contract.start_time}`,
          "yyyy-MM-dd HH:mm"
        ).toISO(),
        end: DateTime.fromFormat(
          `${contract.date} ${contract.end_time}`,
          "yyyy-MM-dd HH:mm"
        ).toISO(),
        description: `Servicio: ${contract.service.title}`,
      }));

      console.log("Eventos formateados:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", padding: "20px" }}>
      <h2>Calendario de Contratos</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        droppable={true}
      />
    </div>
  );
}

export default Calendar;
