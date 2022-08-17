import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TalkingRobot from "../talking-robot/TalkingRobot";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";

import "./Main.css";

const Main = (props) => {
  const elInputName = useRef(null);
  const elInputMessage = useRef(null);
  const [nameUser, setNameUser] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [progress, setProgress] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm();

  const FormTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7c5b70",
        border: "2px solid #7c5b70",
      },
      "&:hover fieldset": {
        borderColor: "#7c5b70",
      },
    },
  });

  const onSubmit = (data) => {
    setProgress(true);

    setNameUser(data.nameUser);
    setTextMessage(data.textMessage);
  };

  const calcId = (type) => {
    let res;
    switch (type) {
      case "mess": {
        res = props.messageList.length ? props.messageList.length + 1 : 1;
        break;
      }
      case "chat": {
        res = props.listChat.length ? props.listChat.length + 1 : 1;
        break;
      }
      case "chatList": {
        res = props.listChat[props.listChat.length - 1]?.chat.length
          ? props.listChat[props.listChat.length - 1]?.chat.length + 1
          : 1;
        break;
      }

      default:
        break;
    }
    return res;
  };

  const createNewChat = () => {
    console.log("createNewChat");
    props.setMessageList([]);
    reset();
  };

  const removeChat = (id) => {
    const dataFilter = props.listChat.filter((list) => list.id !== +id);
    props.setListChat(dataFilter);
  };

  useEffect(() => {
    if (elInputName.current) {
      elInputName.current.focus();
    }
  }, [props.messageList]);

  useEffect(() => {
    if (props.listChat.length === 0 && props.setMessageList.length > 0) {
      props.setMessageList([]);
      reset();
    }
    // eslint-disable-next-line
  }, [props.listChat]);

  useEffect(() => {
    if (nameUser?.trim() !== "" && textMessage?.trim() !== "") {
      if (props.messageList.length === 0) {
        props.setListChat((prev) => [
          ...prev,
          {
            id: calcId("chat"),
            name: nameUser,
            date: new Date(),
            chat: [
              {
                id: 1,
                author: nameUser,
                text: textMessage,
              },
              {
                id: 2,
                author: "Robot",
                text: `Привет, ${nameUser}!`,
              },
            ],
          },
        ]);

        setTimeout(() => {
          props.setMessageList((prev) => [
            ...prev,
            {
              id: calcId("mess") + 1,
              author: "Robot",
              text: `Привет, ${nameUser}!`,
            },
          ]);

          setProgress(false);
        }, 1500);
      } else {
        props.listChat[props.listChat.length - 1].chat.push({
          id: calcId("chatList"),
          author: nameUser,
          text: textMessage,
        });

        setTimeout(() => {
          props.setMessageList((prev) => [
            ...prev,
            {
              id: calcId("mess") + 1,
              author: "Robot",
              text: `Привет, ${nameUser}!`,
            },
          ]);

          props.listChat[props.listChat.length - 1].chat.push({
            id: calcId("chatList"),
            author: "Robot",
            text: `Привет, ${nameUser}!`,
          });
          setProgress(false);
        }, 1500);
      }

      props.setMessageList((prev) => [
        ...prev,
        {
          id: calcId("mess"),
          author: nameUser,
          text: textMessage,
        },
      ]);

      resetField("textMessage");
    }
    // eslint-disable-next-line
  }, [nameUser, textMessage]);

  return (
    <div className="main">
      <Container className="main-container" maxWidth="sm">
        <List
          className="chat-list"
          sx={{
            width: "100%",
            maxWidth: 360,
            minWidth: 250,
            bgcolor: "background.paper",
          }}
        >
          {props.listChat && props.listChat?.length > 0 ? (
            props.listChat.map((chat) => (
              <div className="chat-wrap" key={chat.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={chat.name} src="../../image/robot.gif" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={
                      <React.Fragment>
                        <Moment format="DD.MM.YYYY HH:mm">{chat.date}</Moment>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <div onClick={() => removeChat(chat.id)} className="btn-remove">
                  +
                </div>
                <div className="wrap-icons">
                  <Link className="link" to={"chat/" + chat.id}>
                    <ArticleIcon className="icon-open" />
                  </Link>
                  <Link className="link" to={"user-profile/"}>
                    <PersonIcon className="icon-user" />
                  </Link>
                </div>

                <Divider variant="inset" component="li" />
              </div>
            ))
          ) : (
            <div className="no-chat">No chat</div>
          )}
        </List>
        <Box
          className="box"
          sx={{
            bgcolor: "#fef6e4",
          }}
        >
          <h2 className="text">Ask the robot Max something:</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              inputRef={elInputName}
              label="Type your name"
              id="custom-css-outlined-input"
              name="nameUser"
              className="input"
              fullWidth
              {...register("nameUser", {
                required: "Name is required.",
              })}
              error={Boolean(errors.nameUser)}
              helperText={errors.nameUser?.message}
            />

            <FormTextField
              inputRef={elInputMessage}
              label="Type your message"
              id="custom-css-outlined-input"
              name="textMessage"
              className="input"
              fullWidth
              {...register("textMessage", {
                required: "Message is required.",
              })}
              error={Boolean(errors.textMessage)}
              helperText={errors.textMessage?.message}
            />

            <div className="group_btn">
              <button type="submit" className="btn btn-submit">
                SEND
              </button>
              <button
                onClick={createNewChat}
                type="button"
                className="btn btn-newchat"
              >
                NEW CHAT
              </button>
            </div>
          </form>
          <TalkingRobot chat={props.messageList} progress={progress} />
        </Box>
      </Container>
    </div>
  );
};

export default Main;
