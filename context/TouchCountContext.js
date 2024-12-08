// src/context/TouchCountContext.js
import React, { createContext, useState, useContext } from "react";

const TouchCountContext = createContext();

export const TouchCountProvider = ({ children }) => {
  const [touchCount, setTouchCount] = useState(0);

  const incrementTouchCount = () => setTouchCount((prev) => prev + 1);

  return (
    <TouchCountContext.Provider value={{ touchCount, incrementTouchCount }}>
      {children}
    </TouchCountContext.Provider>
  );
};

export const useTouchCount = () => useContext(TouchCountContext);
