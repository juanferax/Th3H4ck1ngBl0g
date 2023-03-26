import * as React from "react";
import { posts } from "../assets/posts";

const PostsContext = React.createContext(); // Creamos el contexto que usaremos para pasar el estado.

/*
 ** Mi reducer recibe el estado actual y una accion, y dependiendo del tipo de accion va **
 ** a modificar el estado, despues va a retornar ese nuevo estado generando un re render **
 */
function PostsReducer(state, action) {
  switch (action.type) {
    case "newEntry": {
      const newArr = [...state.posts];
      newArr.push({
        ...action.payload,
        id: state.posts.length + 1,
      });
      return { ...state, posts: newArr };
    }
    case "delete": {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload
      );
      const newArr = [...state.posts];
      newArr.splice(postIndex, 1);
      console.log(newArr);
      return { ...state, posts: newArr };
    }
    case "modify": {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      const newArr = [...state.posts];
      newArr[postIndex] = {
        ...action.payload,
      };
      console.log(newArr);
      return { ...state, posts: newArr };
    }
    case "selectPost": {
      return { ...state, selectedPost: action.payload };
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
function PostsProvider({ children }) {
  const [state, dispatch] = React.useReducer(PostsReducer, {
    posts,
    selectedPost: undefined,
  });
  const value = { state, dispatch };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

/*
 ** usePosts es una funcion que nos devuelve el context de la aplicacion y lo vamos **
 ** a usar siempre que necesitemos acceder al state o cuando vamos a usar dispatch  **
 */
function usePosts() {
  const context = React.useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}

export { PostsProvider, usePosts };
