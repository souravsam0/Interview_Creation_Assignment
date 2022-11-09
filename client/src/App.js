import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [interviewer, setInterviewer] = useState("");
  const [interviewee, setInterviewee] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const [interviewList, setinterviewList] = useState([]);

  const addInterview = () => {
    Axios.post("http://localhost:3001/create", {
      interviewer: interviewer,
      interviewee: interviewee,
      startTime: startTime,
      endTime: endTime,
    }).then(() => {
      setinterviewList([
        ...interviewList,
        {
          interviewer: interviewer,
          interviewee: interviewee,
          startTime: startTime,
          endTime: endTime,
        },
      ]);
    });
  };

  const getInterview = () => {
    Axios.get("http://localhost:3001/interviews").then((response) => {
      setinterviewList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1><u>Interview Creation Portal</u></h1>
        <label>Interviewer:</label>
        <input
          type="text"
          onChange={(event) => {
            setInterviewer(event.target.value);
          }}
        />
        <label>Interviewee:</label>
        <input
          type="text"
          onChange={(event) => {
            setInterviewee(event.target.value);
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
        <button onClick={addInterview}>Add Interview</button>
      </div>
      <div className="interviews">
        <button onClick={getInterview}>Show Interviews</button>

        {interviewList.map((val, key) => {
          return (
            <div className="interview">
              <div>
                <h3>Interviewer: {val.interviewer}</h3>
                <h3>Interviewee: {val.interviewee}</h3>
                <h3>Start Time: {val.startTime}</h3>
                <h3>End Time: {val.endTime}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
