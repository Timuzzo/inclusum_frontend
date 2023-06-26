import { useState, createContext } from "react";

export const ControlContext = createContext();

export default function ControlContextProvider(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <ControlContext.Provider
      value={{
        open,
        setOpen,
        handleClickOpen,
        handleClickClose,
      }}
    >
      {props.children}
    </ControlContext.Provider>
  );
}
