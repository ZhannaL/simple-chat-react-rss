import React, {
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { Message } from 'Redusers/User/types';

export const WebSocketContext = createContext<WebSocket | null>(null);

type Props = {
  children: ReactNode;
};

export const WebSocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      // const createdSocket = new WebSocket('ws://localhost:8080');
      // const createdSocket = new WebSocket('ws://st-chat.shas.tel');
      const createdSocket = new WebSocket(
        'wss://server-rss-simple-chat.herokuapp.com/'
      );
      setSocket(createdSocket);

      createdSocket.onopen = () => {
        console.log('Connected');
      };

      createdSocket.onclose = (event) => {
        setSocket(null);
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          event.reason
        );
        setTimeout(() => {
          connect();
        }, 1000);
      };

      createdSocket.onerror = (err) => {
        console.error('Socket encountered error: ', err, 'Closing socket');
        createdSocket.close();
      };
    };
    connect();
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSocket = (fn: (message: Array<Message>) => any) => {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      fn(JSON.parse(event.data));
    };
    if (socket) {
      socket.addEventListener('message', handler);
      return () => {
        socket.removeEventListener('message', handler);
      };
    }
  }, [fn, socket]);
};

export const useSocketConnect = (fn: (message: Event) => any) => {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    const handler = (event: Event) => {
      fn(event);
    };

    if (socket) {
      socket.addEventListener('open', handler);
      return () => {
        socket.removeEventListener('open', handler);
      };
    }
  }, [fn, socket]);
};
