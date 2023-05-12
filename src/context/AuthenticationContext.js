import * as React from "react";
import { useState } from "react";
import AuthenticationService from "../services/AuthenticationService";
import { useEffect } from "react";

const AuthenticationContext = React.createContext(); // Creamos el contexto que usaremos para manejar la autenticación.

/*
 ** El provider es un componente que se va a encargar de entregar el contexto o estado    **
 ** y el metodo dispatch a los componentes hijos, en este caso el componente BlogHomeView **
 ** que usamos en App.JS                                                                  **
 */
export function AuthenticationProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthenticationContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
