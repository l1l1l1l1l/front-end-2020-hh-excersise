import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

function TrainingCalendar() {
    const localizer = momentLocalizer(moment);
    const [session, setSession] = useState([]);

    const getData = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
          .then((response) => response.json())
          .then((data) => {
            let sessionArray = []
            for (let i = 0; i < data.length; i++) {
              sessionArray.push({
                title: data[i].activity,
                start: new Date(data[i].date),
                end: moment(data[i].date).add(data[i].duration, "min").toDate(),
              })
              setSession(sessionArray)
            }
          })
          .catch((err) => console.error(err))
      }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={session}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '800px', width: '90%', margin: 'auto' }}
            />
        </div>
    )
}

export default TrainingCalendar;