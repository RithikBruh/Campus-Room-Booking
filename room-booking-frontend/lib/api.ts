import { supabase } from "@/lib/supabaseClient";

const {
  data: { session },
} = await supabase.auth.getSession();

//   console.log(session?.access_token);

const BackendURL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const token = session?.access_token;
// console.log(token);

export async function fetchRole(): Promise<string | undefined> {
  console.log("fetching role");
  const response = await fetch(BackendURL + "/me", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // TODO : handle error responses
  const data = await response.json();
  return data.role;
}

export async function fetchVenues() {
  const response = await fetch(BackendURL + "/venues", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  data.statusCode = response.status;
  console.log("Fetched venues:", data);

  if (data.statusCode >= 200 && data.statusCode < 300) {
    return data;
  }

  return [];
}

export async function submitBookingRequest(
  venueId: number,
  reason: string,
  date: string,
  time: string,
) {
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
      timing: time,
    }),
  });

  const status = response.status;

  const data = await response.json();
  data.statusCode = status;

  return data;
}

export async function fetchBookings() {
  const response = await fetch(BackendURL + "/bookings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });


    const data = await response.json();
    data.statusCode = response.status;
    console.log("Status update response:", data);
    if (data.statusCode >= 200 && data.statusCode < 300) {
      return data ;
    }
    return [];
}

export async function deleteBookingFromID(bookingId: number) {
    const response = await fetch(BackendURL + "/bookings/" + bookingId, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });
    return response.status;
}

// --- Applicable for admin dashboard ---

export async function fetchBookingRequests() {
    const response = await fetch(BackendURL + "/booking-requests", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });


    const data = await response.json();
    data.statusCode = response.status;
    console.log("Status update response:", data);
    if (data.statusCode >= 200 && data.statusCode < 300) {
      return data ;
    }
    return [];
}

export async function updateBookingRequestStatus(bookingId: number, newStatus: "approved" | "rejected") {
    const response = await fetch(BackendURL + "/booking-requests/" + bookingId, {
        method: "PUT",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: newStatus,
        }),
    });

    const status = response.status;

    const data = await response.json();
    data.statusCode = status;
    console.log("Status update response:", data);
    return data;
}


export async function fetchYourVenues() {
    const response = await fetch(BackendURL + "/my-venues", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    }); 
    
    const data = await response.json();
    data.statusCode = response.status;
    
    if (data.statusCode >= 200 && data.statusCode < 300) {
      return data;
    }
    return [];
}

export async function addVenue(venueName: string) {
    const response = await fetch(BackendURL + "/venues", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            venue: venueName,
        }),
    });

    const status = response.status;

    const data = await response.json();
    data.statusCode = status;
    console.log("Add venue response:", data);
    return data;
}

export async function deleteVenue(venueId: number) {
    const response = await fetch(BackendURL + "/venues/" + venueId, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });
    return response.status;
}