import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [InterviewerName, setInterviewerName] = useState("");
  const [IntervieweeName, setIntervieweeName] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");

  const [interviewList, setInterviewList] = useState([]);

  const createInterview = () => {
    Axios.post("http://localhost:3001/create", {
      InterviewerName: InterviewerName,
      IntervieweeName: IntervieweeName,
      StartTime: StartTime,
      EndTime: EndTime,

      

    }).then(() => {
      setInterviewList([
        ...interviewList,
        {
          InterviewerName: InterviewerName,
          IntervieweeName: IntervieweeName,
          StartTime: StartTime,
          EndTime: EndTime,
        },
      ]);
    });
  };

  const getInterviews = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setInterviewList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setInterviewList(
        interviewList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1><u>Interview Creation Tool</u></h1>
        <label>Interviewer Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setInterviewerName(event.target.value);
          }}
        />
        <label>Interviewee Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setIntervieweeName(event.target.value);
          }}
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            setStartTime(event.target.value);
          }}
        /> 
        <label>End Time:</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            setEndTime(event.target.value);
          }}
        />

        <button onClick={createInterview}>Create Interview</button>
      </div>
      <div className="showInterviews">
        <button onClick={getInterviews}>Show Interviews</button>

        {interviewList.map((val, key) => {
          return (
            <div className="showInterviews">
              <div>
                <h3>Interviewer Name: {val.InterviewerName}</h3>
                <h3>Interviewee Name: {val.IntervieweeName}</h3>
                <h3>Start Time: {val.StartTime}</h3>
                <h3>End Time: {val.EndTime}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
