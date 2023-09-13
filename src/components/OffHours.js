import React, { useContext } from "react";

import AppContext from "../context/AppContext";
import Model from "./Model";
import Input from "./Input";
import OffHour from "./OffHour";

export default function OffHours() {
  const { offHours, addOffHour } = useContext(AppContext);
  return (
    <>
    <Model title={"Add Off Hour"} id={"add_off_hour"}>
        <form className="model-form" onSubmit={addOffHour.bind({ id: "add_off_hour" })}>
            <Input label={"Start Time"} name={"start"} type={"datetime-local"} required={true} id={"start"} />
            <Input label={"End Time"} name={"end"} type={"datetime-local"} required={true} id={"end"} />
            <div className="container">
                <button className="btn btn-primary">Add!</button>
            </div>
        </form>
    </Model>
    <div className="text-center mt-4">
        <h5 className="mb-3">Your Off Hours</h5>
        <button 
            className="btn btn-sm btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#add_off_hour"
        >
          Add Off Hours!
        </button>
        <div className="my-4">
            {!offHours || offHours.length === 0 ? (
                <p>No off hours are there!</p>
            ) : (
                <ul className="grid">
                    {offHours.map(offHour => <OffHour offHour={offHour} />)}
                </ul>
            )}
        </div>
    </div>
    </>
  );
}
