import { useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Page404 from "./components/page-404/Page404";
import Chat from "./components/chat/Chat";
import UserProfile from "./components/user-profile/UserProfile";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c5b70",
    },
  },
});

function App() {
  const [messageList, setMessageList] = useState([]);
  const [listChat, setListChat] = useState([]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  messageList={messageList}
                  setMessageList={setMessageList}
                  listChat={listChat}
                  setListChat={setListChat}
                />
              }
            />
            <Route path="/chat/:id" element={<Chat listChat={listChat} />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>

          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
