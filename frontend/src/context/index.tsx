import { createContext, useContext, useEffect, useState } from "react";

interface AppConfig {
  sound: boolean;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppConfig: AppConfig = {
  sound: (() => {
    const storedSound = localStorage.getItem("sound");
    return storedSound ? JSON.parse(storedSound) : true;
  })(),
  setSound: () => {},
};

const AppContext = createContext<AppConfig>(initialAppConfig);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sound, setSound] = useState<boolean>(initialAppConfig.sound);

  useEffect(() => {
    localStorage.setItem("sound", JSON.stringify(sound));
  }, [sound]);

  return (
    <AppContext.Provider value={{ sound, setSound }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppConfig must be used within a AppContextProvider");
  }
  return context;
};
