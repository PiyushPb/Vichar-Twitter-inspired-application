import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const history = useNavigate();

  useEffect(() => {
    toast.error(
      "This page is under development, or you might not have beta / dev access"
    );
    history("/");
  }, [history]);

  return <p></p>;
};

export default Notifications;
