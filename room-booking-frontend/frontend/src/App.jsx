import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import supabase from "./supabaseClient";
import { useEffect } from "react";
async function Handlelogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:");
  console.log(session);

  console.log("TOKEN:");
  console.log(session?.access_token);
}

async function getMyBookings() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  const response = await fetch("http://localhost:3000/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`, // TODO:cookies
    },
  });

  const data = await response.json();

  console.log(data);
}

async function getVenue() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  console.log(token);
  try {
    const res = await fetch("http://localhost:3000/venues", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("venues:", data);
    return data;
  } catch (err) {
    console.error("failed to fetch venues", err);
    throw err;
  }

}
function App() {
  //TODO : supabase.auth.onAuthStateChange()
  // useEffect(() => {getSession()}, [])

  return (
    <>
      <button onClick={Handlelogin}>Login</button>
      <button onClick={getMyBookings}>get bookings</button>
      <button onClick={getVenue}>get venue</button>
    </>
  );
}

export default App;
