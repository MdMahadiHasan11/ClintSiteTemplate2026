/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { socketManager } from "@/lib/socket";
import {
  addSocketMessage,
  //   addSocketMessage,
  clearSocketMessages,
} from "@/redux/features/notification/notificationSlice";
import { useAppSelector } from "@/redux/hooks";
import { INotification } from "@/types";
import { notification } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emit: (event: string, data: any) => void;
  clearMessages: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  emit: () => {},
  clearMessages: () => {},
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationData {
  id?: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  event?: string;
  read?: boolean;
  receivedAt?: string;
  status?: string;
}

export const getNotificationType = (event: string): NotificationType => {
  switch (event) {
    case "INVOICE_TOUR":
      return "info";
    case "JOURNAL_VOUCHER":
      return "info";
    case "RECEIVE_VOUCHER":
      return "info";
    case "PAYMENT_VOUCHER":
      return "info";
    case "CONTRA_VOUCHER":
      return "warning";
    default:
      return "info";
  }
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const socketInstance = socketManager.connect(token || "");
    setSocket(socketInstance);

    const handleConnect = () => {
      setIsConnected(true);
      api.success({
        message: "Connected",
        description: "You get real-time notifications",
        placement: "topRight",
        duration: 2,
      });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      api.warning({
        message: "Disconnected",
        description: "Real-time connection lost",
        placement: "topRight",
        duration: 3,
      });
    };

    const handleNotification = (data: NotificationData) => {
      const { type, title, message, duration = 4 } = data;
      api[type || "info"]({
        message: title || "Notification",
        description: message,
        placement: "topRight",
        duration,
      });
    };

    const notificationEvents = [
      "INVOICE_TOUR",
      "RECEIVE_VOUCHER",
      "PAYMENT_VOUCHER",
      "CONTRA_VOUCHER",
      "JOURNAL_VOUCHER",
      "ADD_INVOICE_VISA",
      "UPDATE_INVOICE_VISA",
      "DELETE_INVOICE_VISA",
      "ADD_INVOICE_TOUR",
      "UPDATE_INVOICE_TOUR",
      "DELETE_INVOICE_TOUR",
    ];

    notificationEvents.forEach((event) => {
      socketInstance.on(event, (data: any) => {
        if (!data.message) {
          console.error(`Invalid data for ${event}:`, data);
          return;
        }

        // const message: INotification = data;

        const notificationData: INotification = {
          ...data,

          id: Date.now() + Math.random().toString(36).slice(2, 11),
          userId: Date.now() + Math.random().toString(36).slice(2, 11),
          eventKey: event,

          type: getNotificationType(event),
          isRead: false,
          readAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isSocket: true,
        };

        // Log before Redux dispatch
        dispatch(addSocketMessage(notificationData));
        (api as any)[notificationData.type]({
          message: notificationData.eventKey || event,
          description: notificationData.message,
          placement: "topRight",
          duration: 4,
        });
      });
    });
    if (process.env.NODE_ENV != "production") {
      socketInstance.on("connect", handleConnect);
    }

    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("notification", handleNotification);

    return () => {
      notificationEvents.forEach((event) => socketInstance.off(event));
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.off("notification", handleNotification);
      socketManager.disconnect();
      setSocket(null);
      setIsConnected(false);
      dispatch(clearSocketMessages());
    };
  }, [api, token, dispatch]);

  const emit = (event: string, data: any) => {
    socketManager.emit(event, data);
  };

  const clearMessages = () => {
    dispatch(clearSocketMessages());
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, emit, clearMessages }}
    >
      {contextHolder}
      {children}
    </SocketContext.Provider>
  );
};
