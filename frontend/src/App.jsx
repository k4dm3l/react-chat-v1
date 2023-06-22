import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Button, Input, Card, Ribbon, Text, Alert } from "@rewind-ui/core";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = { from: "Me", body: message };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);

    setMessage("");
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="flex items-center justify-center h-screen w-96">
      <Card>
        <Card.Header className="relative">
          <Ribbon color="red" radius="md" shadow="md" shadowColor="dark">
            Anonymous Chat
          </Ribbon>
          <span>
            <Text color="black" size="4xl">
              Welcome!
            </Text>
          </span>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={message}
              style={{ marginBottom: "25px" }}
              placeholder="Write message"
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button
              color="red"
              shadow="base"
              shadowColor="black"
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </form>
        </Card.Body>
        <Card.Footer style={{"overflow-y": "auto", /* Hace que el contenido sea desplazable verticalmente */
  "max-height": "500px"}}>
          <div className="w-full p-05">
            {messages.map((message, id) =>
              message.from == "Me" ? 
                <Card key={id}>
                  <Alert
                    color="red"
                    style={{ marginBottom: "8px" }}
                    title={message.body}
                  >
                    {message.from}
                  </Alert>
                </Card>
              : 
                <Card key={id}>
                  <Alert
                    color="blue"
                    style={{ marginBottom: "8px" }}
                    title={message.body}
                  >
                    {message.from}
                  </Alert>
                </Card>
            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default App;
