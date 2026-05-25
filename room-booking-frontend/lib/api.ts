import { supabase } from "@/lib/supabaseClient";

const {
data: { session },
} = await supabase.auth.getSession();

//   console.log(session?.access_token);

const BackendURL: string =
process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const token = session?.access_token;

export async function fetchRole() : Promise<string | undefined> {

    console.log("fetching role");
  const response = await fetch(BackendURL + "/me", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.role;
}

export async function fetchVenues()  {
    const response = await fetch(BackendURL + "/venues", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log("Fetched venues:", data);
    return data;
}


export async function submitBookingRequest(venueId: number, reason: string, date: string, time: string) {
    const response = await fetch(BackendURL + "/bookings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            venueId,
            reason,
            date,
            timing : time,
        }),
    });

    const status = response.status;
    
    const data = await response.json();
    data.statusCode = status;

    return data;
}

