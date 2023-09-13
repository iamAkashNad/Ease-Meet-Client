import React, { useContext } from 'react';

import AppContext from '../context/AppContext';

export default function OffHour({ offHour }) {
  const { getTime, getDate, deleteOffHour } = useContext(AppContext);
  return (
    <li className="off-hour">
        <article>
            <p><strong>From</strong>: {`${getTime(offHour.start)} (${getDate(offHour.start)})`}</p>
            <p><strong>To</strong>: {`${getTime(offHour.end)} (${getDate(offHour.end)})`}</p>
            <div style={{ textAlign: "right" }}>
                <button onClick={deleteOffHour.bind(null, offHour._id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
        </article>
    </li>
  )
}
