import React, { useState, ReactNode, useEffect } from 'react';
import { WebSocketContext } from '../Websocket/Websocket';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'Redusers/User/types';

type TestSocket = {
  send: (message: string) => void;
  addEventListener: (
    event: string,
    handler: (event: MessageEvent) => unknown
  ) => void;
  removeEventListener: (
    event: string,
    handler: (event: MessageEvent) => unknown
  ) => void;

  onopen?: () => unknown;
  onclose?: () => unknown;
  onerror?: () => unknown;
};

type Props = {
  children: ReactNode;
};

export const TestSocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<TestSocket | null>(null);
  const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);

  const [handlers, setHandlers] = useState<
    Set<(event: MessageEvent) => unknown>
  >(new Set());

  useEffect(() => {
    const createdSocket: TestSocket = {
      send: (message: string) => {
        let parsedData = JSON.parse(message);

        let newMessages = messages.concat({
          from: parsedData.from,
          message: parsedData.message,
          id: uuidv4(),
          time: Date.now(),
        });
        // let newMessages = messages.concat(message);
        setMessages(newMessages);

        handlers.forEach((handler) =>
          handler({ data: JSON.stringify(newMessages) } as any)
        );
      },
      addEventListener: (
        event: string,
        handler: (event: MessageEvent) => unknown
      ) => {
        handlers.add(handler);
        setHandlers(handlers);
      },

      removeEventListener: (
        event: string,
        handler: (event: MessageEvent) => unknown
      ) => {
        handlers.delete(handler);
        setHandlers(handlers);
      },
    };
    setSocket(createdSocket);
  }, [handlers, messages]);

  return (
    // @ts-ignore
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
