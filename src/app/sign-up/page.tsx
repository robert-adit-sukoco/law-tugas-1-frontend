"use client"

import { FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [emailState, setEmailState] = useState<string>("")
    const [usernameState, setUsernameState] = useState<string>("")
    const [passwordState, setPasswordState] = useState<string>("")

    const router = useRouter()

    async function postSubmitBody() {
        const submitBody = {
            email : emailState,
            username : usernameState,
            password : passwordState
        }
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`
        const response = await fetch(url, {
            method : 'POST',
            body : JSON.stringify(submitBody),
            headers : { 'Content-Type' : 'application/json'}
        })
        const data = await response.json()
    }

    const submitForm = () => {
        postSubmitBody().then(() => {
            router.push('/sign-in')
        })
    }  

    return (
        <>
        <Heading mb={3}>Register to RockerBoy</Heading>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' value={emailState} onChange={e => setEmailState(e.target.value)}/>
        </FormControl>
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type='text' value={usernameState} onChange={e => setUsernameState(e.target.value)}/>
        </FormControl>
        <FormControl>
            <FormLabel mt={5}>Password</FormLabel>
            <Input type='password' value={passwordState} onChange={e => setPasswordState(e.target.value)}/>
            <FormHelperText>8-20 characters, minimum of one uppercase letter</FormHelperText>
        </FormControl>
        
        <Button colorScheme='blue' mt={5} onClick={submitForm}>Register</Button>
        <Button mt={5} onClick={submitForm}>Login</Button>
        </>
    )
}