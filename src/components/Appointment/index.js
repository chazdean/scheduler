import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header key={props.id} time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {console.log("Clicked onAdd"); transition("CREATE")}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )} 
      {mode === CREATE && (
        <Form 
          student={"Chaz Dean"}
          interviewer={1}
          interviewers={props.interviewers}
          onCancel={() => {console.log("Clicked Cancel"); back()}}
          onSave={() => {console.log("Clicked Save"); transition("SAVING")}}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )} 
    </article>
  );
}