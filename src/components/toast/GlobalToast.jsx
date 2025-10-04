"use client";

import React from "react";
import { useNotificationStore } from "@/store/notificationStore";
import Toast from "./Toast";

const GlobalToast = () => {
  const { show, message, type, hideToast } = useNotificationStore();

  if (!show) {
    return null;
  }

  return <Toast message={message} type={type} onClose={hideToast} />;
};

export default GlobalToast;
