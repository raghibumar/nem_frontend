import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { CreateNote } from "./components/CreateNote";
import Notes from "./components/Notes";
import UpdateNote from "./components/UpdateNote";

function App() {
  return (
    <div className="App">
      <h1>Notes App</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createNote" element={<CreateNote />}></Route>
        <Route path="/notes" element={<Notes />} />
        <Route path="/update/:noteId" element={<UpdateNote />} />
      </Routes>
    </div>
  );
}

export default App;
