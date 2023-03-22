import * as React from "react";
import { posts } from "../assets/posts";

const PostsContext = React.createContext(); // Creamos el contexto que usaremos para pasar el estado.

/*
 ** Mi reducer recibe el estado actual y una accion, y dependiendo del tipo de accion va **
 ** a modificar el estado, despues va a retornar ese nuevo estado generando un re render  **
 */
function PostsReducer(state, action) {
  switch (action.type) {
    case "newEntry": {
      const newArr = [...state.students];
      newArr.push({
        ...action.payload,
        id: state.students.length + 1,
      });
      return { ...state, students: newArr };
    }
    case "delete": {
      const studentIndex = state.students.findIndex(
        (student) => student.id === action.payload
      );
      const newArr = [...state.students];
      newArr.splice(studentIndex, 1);
      return { ...state, students: newArr };
    }
    case "modify": {
      const studentIndex = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      const newArr = [...state.students];
      newArr[studentIndex] = {
        ...action.payload,
      };
      console.log(newArr);
      return { ...state, students: newArr };
    }
    case "selectPost": {
      return { ...state, selectedStudent: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/*
 ** El provider es un componente que se va a encargar de entregar el contexto o estado **
 ** y el metodo dispatch a los componentes hijos, en este caso el componente Table que **
 ** usamos en App.JS                                                                   **
 */
function PostsProvider({ children }) {
  const [state, dispatch] = React.useReducer(PostsReducer, {
    students,
    selectedStudent: undefined,
    isAddNewStudentModalOpen: false,
    isEditNewStudentDialogOpen: false,
  });
  const value = { state, dispatch };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

/*
 ** useStudents es una funcion que nos devuelve el context de la aplicacion y lo vamos **
 ** a usar siempre que necesitemos acceder al state o cuando vamos a usar dispatch     **
 */
function usePosts() {
  const context = React.useContext(PostsContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { PostsProvider, usePosts };
