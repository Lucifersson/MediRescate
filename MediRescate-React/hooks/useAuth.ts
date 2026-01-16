import { router } from "expo-router";
import { useState } from "react";


export const useAuth = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorCamposVacios, setErrorCamposVacios] = useState<String>();
    const [errorUsuario, setErrorUsuario] = useState<String>(); //Errores del servidor para usuario no encontrado o contraseña incorrecta
    const [usuario, setUsuario] = useState(null)  //Es tipo usuario

    const setUsernameValue = (value: string) => {
        setUsername(value)
    }

    const setPasswordValue = (value: string) => {
        setPassword(value)
    }



    const onLoginPress = () => {
        if (username == '' || password == '') {
            setErrorCamposVacios('Rellena usuario y contraseña');
            return;
        }


        {/* 
            llama a servidor y comprueba campos

            if (username no existe){
                setErrorUsuario(Mensaje de servidor || "Usuario no encontrado");
                return;
            }

            if (contraseña no coincide){
                setErrorUsuario(Mensaje de servidor || "Contraseña incorrecta");
                return;
            }
            */}        

        setErrorCamposVacios('');
        //setUsuario()  
        router.replace("/(stack)/(tabs)/operario"); //Remplazar por lo de abajo

        {/* 
           if (usuario.cargo == "operario") {
            router.replace("/(stack)/(tabs)/operario");
           }
            
           if (usuario.cargo == "administrador") {
            router.replace("/(stack)/(tabs)/admin");
           }

           if (usuario.cargo == "teleoperador") {
            router.replace("/(stack)/(tabs)/teleoperador");
           }
            */}  



    }

    return {
        username,
        password,
        errorCamposVacios,
        errorUsuario,

        setUsernameValue,
        setPasswordValue,
        onLoginPress
    }
}