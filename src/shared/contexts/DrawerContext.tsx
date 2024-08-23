import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption{
  icon: string;
  label: string;
  path: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
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
  const [drawerOptions, setdrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setdrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
}