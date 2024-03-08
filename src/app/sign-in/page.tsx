"use client"

import { FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCookies } from "next-client-cookies"



export default function LoginPage() {
    const [usernameState, setUsernameState] = useState<string>("")
    const [passwordState, setPasswordState] = useState<string>("")
    const cookies = useCookies()

    const router = useRouter()

    async function postSubmitBody() {
        const submitBody = {
            username : usernameState,
            password : passwordState
        }
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`
        const response = await fetch(url, {
            method : 'POST',
            body : JSON.stringify(submitBody),
            headers : { 'Content-Type' : 'application/json' }
        })
        const data = await response.json()
        return data
    }

    const submitForm = () => {
        postSubmitBody().then((data) => {
            cookies.set('access_token', data['access_token'])
            router.push('/')
        })
        .catch(err => {
            console.error(err)
        })
    }  

    return (
        <>
        <Heading mb={3}>Login</Heading>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='text' value={usernameState} onChange={e => setUsernameState(e.target.value)}/>
        </FormControl>
        <FormControl>
            <FormLabel mt={5}>Password</FormLabel>
            <Input type='password' value={passwordState} onChange={e => setPasswordState(e.target.value)}/>
            <FormHelperText>8-20 characters, minimum of one uppercase letter</FormHelperText>
        </FormControl>
        
        <Button colorScheme='blue' mt={5} onClick={submitForm}>Login</Button>
        <Button mt={5} onClick={submitForm}>Register</Button>
        </>
    )
}