import React, {useState} from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const LOADING = "LOADING"
const EDIT = "EDIT"
const CONFIRM = "CONFIRM"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [message, setMessage] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    setMessage("Saving")
    transition(LOADING)
    
    props.bookInterview(props.id, interview)
    .then((error) => {
      console.log("THIS IS ERROR{{", error)
      if (error) {
        transition(ERROR_SAVE, true)
      } else {
      transition(SHOW)
    }
    })
  }

  function cancel() {
    setMessage("Deleting")
    transition(LOADING)
    props.cancelInterview(props.id)
    .then((error) => {
      console.log("THIS IS ERROR{{", error)
      if (error) {
        transition(ERROR_DELETE, true)
      } else {
      transition(EMPTY)
      }
    })
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header key={props.id} time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {console.log("Clicked onAdd"); transition("CREATE")}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={edit}
        />
      )} 
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => {console.log("Clicked Cancel"); back()}}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student} 
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => {console.log("Clicked Cancel"); back()}}
          onSave={save}
        />
      )}
      {mode === LOADING && (
        <Status
          message={message}
        />
      )} 
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={cancel}
          onCancel={() => {console.log("Clicked Cancel"); back()}}
        />
      )} 
      {mode === ERROR_SAVE && (
        <Error
          onClose={() => {console.log("Clicked Cancel"); back()}}
        />
      )} 
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => {console.log("Clicked Cancel"); back()}}
        />
      )} 
    </article>
  );
}