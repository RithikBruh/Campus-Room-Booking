import { supabase } from "@/lib/supabaseClient";

const {
  data: { session },
} = await supabase.auth.getSession();

  // console.log(session?.access_token);

const BackendURL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const token = session?.access_token;
// console.log(token);

async function parseResponse(response: Response) {
  const text = await response.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    data = text;
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : text || `Request failed with status ${response.status}`;
    const err: any = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function fetchRole(): Promise<string | undefined> {
  try {
    const response = await fetch(BackendURL + "/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await parseResponse(response);
    return data.role;
  } catch (err) {
    console.error("fetchRole error:", err);
  }
}

export async function fetchVenues() {
  try {
    const response = await fetch(BackendURL + "/venues", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await parseResponse(response);
    data.statusCode = response.status;
    console.log("Fetched venues:", data);
    return data;
  } catch (err) {
    console.error("fetchVenues error:", err);
    return [];
  }
}

export async function submitBookingRequest(
  venueId: number,
  reason: string,
  date: string,
  startTime: string,
  endTime: string,
) {
  try {
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
        startTime,
        endTime,
      }),
    });

    const data = await parseResponse(response);
    data.statusCode = response.status;
    return data;
  } catch (err) {
    console.error("submitBookingRequest error:", err);
    throw err;
  }
}

export async function fetchBookings() {
  try {
    const response = await fetch(BackendURL + "/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await parseResponse(response);
    data.statusCode = response.status;
    console.log("Status update response:", data);
    return data;
  } catch (err) {
    console.error("fetchBookings error:", err);
    return [];
  }
}

export async function deleteBookingFromID(bookingId: number) {
  try {
    const response = await fetch(BackendURL + "/bookings/" + bookingId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Failed to delete booking ${bookingId}`);
    }

    return response.status;
  } catch (err) {
    console.error("deleteBookingFromID error:", err);
    throw err;
  }
}

// --- Applicable for admin dashboard ---

export async function fetchBookingRequests() {
  try {
    const response = await fetch(BackendURL + "/booking-requests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await parseResponse(response);
    data.statusCode = response.status;
    console.log("Status update response:", data);
    return data;
  } catch (err) {
    console.error("fetchBookingRequests error:", err);
    return [];
  }
}

export async function updateBookingRequestStatus(
  bookingId: number,
  newStatus: "approved" | "rejected",
) {
  try {
    const response = await fetch(
      BackendURL + "/booking-requests/" + bookingId,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      },
    );

    const data = await parseResponse(response);
    data.statusCode = response.status;
    console.log("Status update response:", data);
    return data;
  } catch (err) {
    console.error("updateBookingRequestStatus error:", err);
    throw err;
  }
}

export async function fetchYourVenues() {
  try {
    const response = await fetch(BackendURL + "/my-venues", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await parseResponse(response);
    data.statusCode = response.status;
    return data;
  } catch (err) {
    console.error("fetchYourVenues error:", err);
    return [];
  }
}

export async function addVenue(venueName: string) {
  try {
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

    const data = await parseResponse(response);
    data.statusCode = response.status;
    console.log("Add venue response:", data);
    return data;
  } catch (err) {
    console.error("addVenue error:", err);
    throw err;
  }
}

export async function deleteVenue(venueId: number) {
  try {
    const response = await fetch(BackendURL + "/venues/" + venueId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Failed to delete venue ${venueId}`);
    }

    return response.status;
  } catch (err) {
    console.error("deleteVenue error:", err);
    throw err;
  }
}
