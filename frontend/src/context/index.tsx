import { createContext, useContext, useState } from "react";

interface AppConfig {
  sound: boolean;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppConfig: AppConfig = {
  sound: true,
  setSound: () => {},
};

const AppContext = createContext<AppConfig>(initialAppConfig);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sound, setSound] = useState<boolean>(initialAppConfig.sound);

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
