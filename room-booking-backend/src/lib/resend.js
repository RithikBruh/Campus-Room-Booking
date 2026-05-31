import { Resend } from 'resend';
import { getVenueById } from '../models/venues.model.js';

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function sendEmail(booking) {
    console.log(booking);

  const venue = booking?.venue ?? (booking?.venueId ? await getVenueById(booking.venueId) : null);
  const venueName = venue?.venue ?? 'Unknown venue';
  const statusColor = booking.status === 'rejected' ? '#dc2626' : '#15803d';
  const heading = booking.status === 'approved'
    ? 'Booking Approved 🎉'
    : booking.status === 'rejected'
      ? 'Booking Rejected ❌'
      : 'Booking Status Update';

  const html = `<div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:32px;">
    
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border:1px solid #e5e7eb;
      border-radius:16px;
      padding:24px;
    ">
      
      <h2 style="margin-top:0;">
        ${heading}
      </h2>

      <p>
        Your booking request has been ${booking.status}.
      </p>

      <div style="
        border:1px solid #e5e7eb;
        border-radius:12px;
        padding:16px;
        margin-top:20px;
      ">

        <p style="margin:0 0 12px 0;">
          <strong>Booking ID:</strong> #${booking.id}
        </p>

        <p style="margin:0 0 12px 0;">
          <strong>Venue:</strong>
          ${venueName}
        </p>

        <p style="margin:0 0 12px 0;">
          <strong>Status:</strong>
          <span style="
            color:${statusColor};
            font-weight:bold;
          ">
            ${booking.status}
          </span>
        </p>

        <p style="margin:0 0 12px 0;">
          <strong>Date:</strong> ${booking.date}
        </p>

        <p style="margin:0 0 12px 0;">
          <strong>Time:</strong>
          ${booking.startTime} - ${booking.endTime}
        </p>

        <p style="margin:0;">
          <strong>Purpose: ${booking.reason} </strong> 
        </p>


      </div>

      <p style="
        margin-top:24px;
        color:#6b7280;
        font-size:14px;
      ">
        Thank you for using our venue booking platform.
      </p>

    </div>
  </div>
  `;
  console.log("sending mail...");
const data = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: booking.email,
  subject: `Your Booking #${booking.id} Status Update`,
  html
});

console.log("email sent", data);

}