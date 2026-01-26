import { useAuth } from '@/hooks/useAuth'
import { Operario } from '@/types/types'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'

interface Props {
    operario: Operario | null
}

const LogOutComponent = ({ operario }: Props) => {

    const { logOut } = useAuth()

    return (
        <Pressable onPress={() => logOut(operario ? operario : null)}>
            <Ionicons name="person-circle-outline" size={50} color="white" />
        </Pressable>
    )
}

export default LogOutComponent