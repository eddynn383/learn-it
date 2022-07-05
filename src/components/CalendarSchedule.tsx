import { FC } from 'react';
import Calendar from 'react-calendar';
import '../assets/design/calendarSchedule.scss';
import 'react-calendar/dist/Calendar.css';
import { addClass, classModifier } from '../functions/utils';

interface IPropsCalendar {
    classes: Array<string>;
}

const CalendarSchedule:FC<IPropsCalendar> = ({classes}) => {
    return (
        <div className={addClass(classModifier('calendar', classes))}>
            <Calendar />
        </div>
    )
}

export default CalendarSchedule;