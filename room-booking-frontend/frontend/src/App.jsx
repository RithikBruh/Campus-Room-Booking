import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import supabase from './supabaseClient'
import { useEffect } from 'react'
async function Handlelogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})
  }


async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("SESSION:")
  console.log(session)

  console.log("TOKEN:")
  console.log(session?.access_token)
}


async function getMyBookings() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const token = session?.access_token

  const response = await fetch(
    "http://localhost:3000/my-bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`, // TODO:cookies
      },
    }
  )

  const data = await response.json()

  console.log(data)
}


function App() {
  //TODO : supabase.auth.onAuthStateChange()
  // useEffect(() => {getSession()}, [])

  return <><button onClick={Handlelogin}>Login</button><button onClick={getMyBookings}>get bookings</button></> 
}

export default App
