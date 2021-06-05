import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { user } = useAuth();

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!user || user == null) {
        history.push("/");
        return;
      }
      axios
        .get(`${process.env.REACT_APP_CHAT_ENGINE_URL}/users/me/`, {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
            "user-name": user.email || user.displayName,
            "user-secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          console.log("e", e.response);

          let formdata = new FormData();
          formdata.append("email", user.email || "");
          formdata.append("username", user.email || user.displayName);
          formdata.append("secret", user.uid);
          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);
            axios
              .post(
                `${process.env.REACT_APP_CHAT_ENGINE_URL}/users/`,
                formdata,
                {
                  headers: {
                    "private-key":
                      process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
                  },
                }
              )
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                console.log("error", error.response);
              });
          });
        });
    }
  }, [user, history]);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={user.email || user.displayName}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
