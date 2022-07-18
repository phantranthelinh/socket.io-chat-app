import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { Chat } from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoomHandler = () => {
    if (name.trim() !== "" && idRoom.trim() !== "") {
      socket.emit("join_room", idRoom);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <>
          <form onSubmit={joinRoomHandler}>
            <div className="joinChatContainer">
              <h3> Join A Chat</h3>
              <input
                type="text"
                placeholder="Elijah..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Room ID..."
                value={idRoom}
                onChange={(e) => setIdRoom(e.target.value)}
              />
              <button>Join A Room</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <Chat socket={socket} username={name} idRoom={idRoom}></Chat>
        </>
      )}
    </div>
  );
}

export default App;
