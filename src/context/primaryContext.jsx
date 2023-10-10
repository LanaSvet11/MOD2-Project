import { createContext, useState } from "react";

export const mainContext = createContext();

const MainProvider = (props) => {
  const [movies, setMovies] = useState([]);
  return (
    <mainContext.Provider
      value={{
        movies,
        setMovies,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainProvider;
