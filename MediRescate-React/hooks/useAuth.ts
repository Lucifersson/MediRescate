import { router } from "expo-router";
import { useState } from "react";

export const useAuth = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const setUsernameValue = (value: string) => {
        setUsername(value)
    }

    const setPasswordValue = (value: string) => {
        setPassword(value)
    }

    const onLoginPress = () => {
        if (username == '' || password == '') {
            setError('Rellena usuario y contraseña');
            return;
        }

        setError('');
        router.replace("/(stack)/(tabs)/operario")
    }

    return {
        username,
        password,
        error,

        setUsernameValue,
        setPasswordValue,
        onLoginPress
    }
}