import * as React from "react";

const AuthenticationContext = React.createContext(); // Creamos el contexto que usaremos para manejar la autenticación.

/*
 ** Mi reducer recibe el estado actual y una accion, y dependiendo del tipo de accion va **
 ** a modificar el estado, despues va a retornar ese nuevo estado generando un re render **
 */
function AuthenticationReducer(state, action) {
  switch (action.type) {
    case "login": {
      return { ...state, loggedIn: true };
    }
    case "logout": {
      return { ...state, loggedIn: false };
    }
    case "openLoginModal": {
      return { ...state, openLoginModal: true };
    }
    case "closeLoginModal": {
      return { ...state, openLoginModal: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/*
 ** El provider es un componente que se va a encargar de entregar el contexto o estado    **
 ** y el metodo dispatch a los componentes hijos, en este caso el componente BlogHomeView **
 ** que usamos en App.JS                                                                  **
 */
function AuthenticationProvider({ children }) {
  const [state, dispatch] = React.useReducer(AuthenticationReducer, {
    loggedIn: false,
    openLoginModal: false,
  });
  const value = { state, dispatch };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

/*
 ** useAuthentication es una funcion que nos devuelve el context de la aplicacion y lo vamos **
 ** a usar siempre que necesitemos acceder al state o cuando vamos a usar dispatch           **
 */
function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
}

export { AuthenticationProvider, useAuthentication };
