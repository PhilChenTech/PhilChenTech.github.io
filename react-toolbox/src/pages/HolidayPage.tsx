import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { saveAs } from 'file-saver';
import Layout from '../components/Layout/Layout';
import './HolidayPage.css';

interface HolidayEvent {
  start: string;
  title: string;
  isHoliday: boolean;
  color: string;
}

const HolidayPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [holidayData, setHolidayData] = useState<HolidayEvent[]>([]);

  useEffect(() => {
    const loadHolidayData = async () => {
      try {
        const response2025 = await fetch('/holiday/data/2025-holiday.json');
        const response2026 = await fetch('/holiday/data/2026-holiday.json');
        
        if (response2025.ok && response2026.ok) {
          const data2025 = await response2025.json();
          const data2026 = await response2026.json();
          const combinedData = [...data2025, ...data2026];
          
          setHolidayData(combinedData);
          
          const calendarEvents = combinedData.map((holiday: HolidayEvent) => ({
            date: holiday.start,
            title: holiday.title,
            backgroundColor: holiday.color,
            borderColor: holiday.color
          }));
          
          setEvents(calendarEvents);
        }
      } catch (error) {
        console.error('Failed to load holiday data:', error);
        setEvents([]);
      }
    };

    loadHolidayData();
  }, []);

  const exportCalendar = () => {
    const icsContent = generateICS(holidayData);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    saveAs(blob, 'national-holidays.ics');
  };

  const generateICS = (holidays: HolidayEvent[]): string => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//兔田建設//Holiday Calendar//ZH',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    holidays.forEach((holiday) => {
      if (holiday.isHoliday) {
        const date = holiday.start.replace(/-/g, '');
        icsLines.push(
          'BEGIN:VEVENT',
          `DTSTART;VALUE=DATE:${date}`,
          `DTEND;VALUE=DATE:${date}`,
          `SUMMARY:${holiday.title}`,
          `UID:${holiday.start}-${holiday.title}@holiday-calendar`,
          'END:VEVENT'
        );
      }
    });

    icsLines.push('END:VCALENDAR');
    return icsLines.join('\r\n');
  };

  return (
    <Layout>
      <div className="holiday-page">
        <div className="holiday-header">
          <h1 className="holiday-title">日曆</h1>
          <p className="holiday-subtitle">國定假日、補假、週末皆有標示</p>
        </div>

        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            locale="zh-tw"
          />
        </div>

        <div className="export-section">
          <button 
            id="exportCalendar"
            onClick={exportCalendar}
            className="export-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="download-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"/>
            </svg>
            <span>下載國定假日 (.ics)</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HolidayPage;