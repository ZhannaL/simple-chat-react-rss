import React, {
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from 'react';

type WindowSize = Readonly<{
  width: number;
}>;

const getSize = () => ({
  width: window.innerWidth,
  heigt: window.innerHeight,
});

export const WindowSizeContext = createContext<WindowSize>(getSize());

type Props = {
  children: ReactNode;
};

export const WindowSizeContextProvider = ({ children }: Props) => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    let handler: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (handler) {
        clearTimeout(handler);
      }

      handler = setTimeout(() => {
        setSize(getSize());
      }, 50);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSize]);
  return (
    <WindowSizeContext.Provider value={size}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => useContext(WindowSizeContext);
