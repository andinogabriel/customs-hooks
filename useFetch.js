import { useEffect, useRef, useState } from 'react';
import '../components/02-useEffect/effect.css';

export const useFetch = (url) => {
    
    //Mantener la referencia cuando este hook esta vivo o el componente que lo usa sigue montado
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        //Este cambio no va a disparar la renderizacion del componente. Se pone falso cuando deja de existir
        return () => {
            isMounted.current = false;
        };

    }, []); //Que el efecto se dispare cuando se carga por primera vez

    useEffect(() => {

        //Para que cada peticion que haga setee el loading y demases
        setState({data: null, loading: true, error: null});

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                //Si el componente no esta desmontado
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data: data
                    });  
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });
            });
    }, [url]); //useEffect se ejecuta solamente cuando el url cambia

    return state; 

};
