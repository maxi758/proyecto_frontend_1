import { useState, useCallback, useRef, useEffect } from "react";

// export const useHttpClient = () => {
//   const [isLoading, setIsLoading] = useState(false); // para saber si esta cargando
//   const [error, setError] = useState(); // para saber si hubo un error

// 	const activeHttpRequests = useRef([]); // para saber si hay un request activo, para cancelarlo en caso de que el usuario cambie de pagina
//   const sendRequest = useCallback(
//     async (url, method = "GET", body = null, headers = {}) => {
//       setIsLoading(true);
//       console.log("Sending request to: " + url);
//       const httpAbortCtrl = new AbortController(); // para cancelar el request en caso de que el usuario cambie de pagina
// 			activeHttpRequests.current.push(httpAbortCtrl);
//       try {
//         const response = await fetch(url, {
//           method,
//           body,
//           headers,
//           signal: httpAbortCtrl.signal, // para cancelar el request en caso de que el usuario cambie de pagina
//         });
//         console.log("Response: " + response);
//         const responseData = await response.json();

// 				activeHttpRequests.current = activeHttpRequests.current.filter(
// 					reqCtrl => reqCtrl !== httpAbortCtrl
// 				);  // mantiene los abortControllers que no son el que se esta cancelando
//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }
//         setIsLoading(false);
//         return responseData;
//       } catch (err) {
//         setError(err.message || "Something went wrong, please try again.");
// 				setIsLoading(false);
// 				throw err;
//       }
//     }

//   ,[]); // useCallback para que no se cree una nueva funcion cada vez que se renderiza el componente
// 		const clearError = () => {
// 			setError(null);
// 		};	

// 	useEffect(() => {
// 		return () => {
// 			activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
// 		};
// 	}
// 	,[]); // limpia los abortControllers cuando se desmonta el componente
//   return { isLoading, error, sendRequest, clearError };

// };

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      const responseData = await response.json();

      setIsLoading(false);

      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};