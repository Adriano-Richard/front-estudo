import { createContext, useCallback, useContext, useState } from 'react';


interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const UseDrawerContext = () => {
  return useContext(DrawerContext);
}

interface IAppThemeProviderProps{
    children: React.ReactNode
}

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);



  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}