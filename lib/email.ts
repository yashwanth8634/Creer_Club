import nodemailer from "nodemailer";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * 1. PENDING REGISTRATION EMAIL
 * Sent immediately after user registers with payment screenshot.
 */
export function buildPendingEmailHtml(params: {
  name: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  transactionId: string;
  registrationId: string;
}): string {
  const { name, eventTitle, eventDate, venue, transactionId, registrationId } = params;
  const shortId = registrationId.slice(-8).toUpperCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Received - Pending Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2D1810;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5EFE6;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#FFFFFF;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(78,34,22,0.12);border:1px solid #EADBCE;">

          <!-- Brand Header -->
          <tr>
            <td style="background-color:#5A1827;padding:32px 28px 24px;text-align:center;">
              <p style="margin:0 0 6px;color:#E6C280;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Créer Club Workshop</p>
              <h1 style="margin:0;color:#FFFFFF;font-size:26px;font-weight:800;letter-spacing:0.5px;line-height:1.2;">Registration Received</h1>
            </td>
          </tr>

          <!-- Status Banner -->
          <tr>
            <td style="background-color:#FFF8E7;border-bottom:1px solid #F3DFC1;padding:16px 28px;text-align:center;">
              <table align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#FFF0C2;border:1px solid #DDA638;border-radius:30px;padding:6px 18px;">
                    <span style="color:#8A5400;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                      ⏳ Status: Pending Payment Verification
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:28px 28px 20px;">
              <p style="margin:0 0 14px;color:#2D1810;font-size:17px;line-height:1.5;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 22px;color:#5C3A2E;font-size:15px;line-height:1.6;">
                Thank you for registering! We have safely received your submission and payment details. Your registration is currently <strong>under review</strong> by our team.
              </p>

              <!-- Workshop Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF6F0;border:1px solid #EADBCE;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 6px;color:#8A5400;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Workshop Details</p>
                    <p style="margin:0 0 14px;color:#5A1827;font-size:19px;font-weight:800;line-height:1.3;">${eventTitle}</p>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:12px;">
                          <p style="margin:0 0 3px;color:#8C6D62;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">📅 Date</p>
                          <p style="margin:0;color:#2D1810;font-size:14px;font-weight:600;">${eventDate}</p>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:12px;">
                          <p style="margin:0 0 3px;color:#8C6D62;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">📍 Location</p>
                          <p style="margin:0;color:#2D1810;font-size:14px;font-weight:600;">${venue}</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" valign="top">
                          <p style="margin:0 0 3px;color:#8C6D62;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">🔢 Ref ID</p>
                          <p style="margin:0;color:#5A1827;font-size:13px;font-family:monospace;font-weight:700;">#${shortId}</p>
                        </td>
                        <td width="50%" valign="top">
                          <p style="margin:0 0 3px;color:#8C6D62;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">💳 Transaction ID</p>
                          <p style="margin:0;color:#2D1810;font-size:13px;font-family:monospace;">${transactionId}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's Next Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFF;border-left:4px solid #5A1827;padding:14px 18px;margin-bottom:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:#5A1827;font-size:13px;font-weight:700;">What happens next?</p>
                    <p style="margin:0;color:#5C3A2E;font-size:13px;line-height:1.5;">
                      Once our admin verifies your payment transaction screenshot, you will receive an official <strong>Entry Ticket Pass</strong> with confirmed entry access.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#8C6D62;font-size:12px;line-height:1.5;">
                Need help or have questions? DM us on Instagram or reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#2D1810;padding:20px 28px;text-align:center;">
              <p style="margin:0;color:#C4A493;font-size:12px;">Créer Club • Art & Expression Experiences</p>
              <p style="margin:4px 0 0;color:#8C6D62;font-size:11px;">creer.clubs@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 2. PAYMENT VERIFIED / YOU'RE IN TICKET EMAIL
 * Sent when admin clicks Approve. Includes an official workshop ticket pass.
 */
export function buildVerifiedTicketEmailHtml(params: {
  name: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  registrationId: string;
  transactionId?: string;
}): string {
  const { name, eventTitle, eventDate, venue, registrationId, transactionId } = params;
  const ticketNumber = registrationId.slice(-8).toUpperCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Verified - You're In!</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2D1810;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5EFE6;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

          <!-- Top Greeting Card -->
          <tr>
            <td style="background-color:#5A1827;border-radius:18px 18px 0 0;padding:32px 28px 24px;text-align:center;">
              <p style="margin:0 0 6px;color:#E6C280;font-size:13px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">Payment Verified</p>
              <h1 style="margin:0;color:#FFFFFF;font-size:30px;font-weight:900;letter-spacing:0.5px;line-height:1.2;">You Are In! 🎨🎟️</h1>
              <p style="margin:10px 0 0;color:#F5D8C7;font-size:15px;line-height:1.4;">
                Hi <strong>${name}</strong>, your spot is officially confirmed. Get ready for an amazing experience!
              </p>
            </td>
          </tr>

          <!-- TICKET CONTAINER -->
          <tr>
            <td style="background-color:#FFFFFF;padding:28px 24px;">

              <!-- The Actual Ticket Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid #800000;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(90,24,39,0.15);background-color:#FFFDF9;">

                <!-- Ticket Header Banner -->
                <tr>
                  <td style="background-color:#800000;padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <p style="margin:0;color:#E6C280;font-size:11px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;">Official Workshop Pass</p>
                          <h2 style="margin:4px 0 0;color:#FFFFFF;font-size:20px;font-weight:800;line-height:1.3;">${eventTitle}</h2>
                        </td>
                        <td align="right" valign="top">
                          <span style="display:inline-block;background-color:#2E7D32;color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:1px;padding:6px 14px;border-radius:20px;text-transform:uppercase;">
                            ✔ Confirmed
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Perforation / Notch Strip -->
                <tr>
                  <td style="background-color:#FFFDF9;padding:0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="18" style="height:24px;background-color:#FFFFFF;border-radius:0 12px 12px 0;border:1px solid #EADBCE;border-left:none;"></td>
                        <td style="border-bottom:2px dashed #C8AD9E;height:24px;"></td>
                        <td width="18" style="height:24px;background-color:#FFFFFF;border-radius:12px 0 0 12px;border:1px solid #EADBCE;border-right:none;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Ticket Body -->
                <tr>
                  <td style="padding:22px 28px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="55%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px;color:#8C6D62;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Attendee</p>
                          <p style="margin:0;color:#2D1810;font-size:17px;font-weight:800;">${name}</p>
                        </td>
                        <td width="45%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px;color:#8C6D62;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Ticket No.</p>
                          <p style="margin:0;color:#800000;font-size:18px;font-family:monospace;font-weight:900;letter-spacing:1px;">#${ticketNumber}</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="55%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px;color:#8C6D62;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">📅 Date & Time</p>
                          <p style="margin:0;color:#2D1810;font-size:14px;font-weight:700;">${eventDate}</p>
                        </td>
                        <td width="45%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px;color:#8C6D62;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">📍 Location</p>
                          <p style="margin:0;color:#2D1810;font-size:14px;font-weight:700;">${venue}</p>
                        </td>
                      </tr>
                      ${
                        transactionId
                          ? `<tr>
                              <td colspan="2" valign="top" style="padding-bottom:12px;">
                                <p style="margin:0 0 4px;color:#8C6D62;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">💳 Verified Transaction</p>
                                <p style="margin:0;color:#555;font-size:13px;font-family:monospace;">${transactionId}</p>
                              </td>
                            </tr>`
                          : ""
                      }
                    </table>
                  </td>
                </tr>

                <!-- Barcode & Gate Instruction -->
                <tr>
                  <td style="background-color:#FAF4ED;border-top:1px solid #EADBCE;padding:16px 28px;text-align:center;">
                    <!-- Simulated Barcode -->
                    <div style="font-family:'Courier New',Courier,monospace;letter-spacing:4px;font-size:22px;color:#5A1827;font-weight:bold;margin-bottom:6px;">
                      ||| | || |||| | ||||| || | ||| ||
                    </div>
                    <p style="margin:0;color:#7A5548;font-size:12px;font-weight:600;">
                      Show this email or ticket number at entry check-in.
                    </p>
                  </td>
                </tr>

              </table>
              <!-- END TICKET CARD -->

              <div style="margin-top:24px;padding:16px;background-color:#F5EFE6;border-radius:10px;">
                <p style="margin:0 0 4px;color:#5A1827;font-size:13px;font-weight:700;">Important Workshop Notes:</p>
                <p style="margin:0;color:#5C3A2E;font-size:12px;line-height:1.5;">
                  • Please arrive 10-15 minutes prior to start time.<br />
                  • All art materials and tote bags will be provided at the venue.<br />
                  • Wear comfortable clothes you don't mind getting paint on!
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#2D1810;border-radius:0 0 18px 18px;padding:20px 28px;text-align:center;">
              <p style="margin:0;color:#C4A493;font-size:12px;">Créer Club • Where Creativity Comes to Life</p>
              <p style="margin:4px 0 0;color:#8C6D62;font-size:11px;">creer.clubs@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 3. REJECTION EMAIL
 */
export function buildRejectionEmailHtml(params: {
  name: string;
  eventTitle: string;
  reason?: string;
}): string {
  const { name, eventTitle, reason } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Update on Your Registration</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2D1810;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5EFE6;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#FFFFFF;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(78,34,22,0.12);border:1px solid #EADBCE;">

          <tr>
            <td style="background-color:#5A1827;padding:30px 28px;text-align:center;">
              <p style="margin:0 0 6px;color:#E6C280;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Créer Club</p>
              <h1 style="margin:0;color:#FFFFFF;font-size:24px;font-weight:800;">Registration Update</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 14px;color:#2D1810;font-size:16px;">Hello <strong>${name}</strong>,</p>
              <p style="margin:0 0 18px;color:#5C3A2E;font-size:14px;line-height:1.6;">
                Thank you for your interest in <strong>${eventTitle}</strong>. Unfortunately, we were unable to verify your payment for this registration.
              </p>

              ${
                reason
                  ? `<div style="background-color:#FFF3F0;border-left:4px solid #C62828;padding:14px 18px;border-radius:6px;margin-bottom:20px;">
                      <p style="margin:0 0 4px;color:#C62828;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Reason</p>
                      <p style="margin:0;color:#2D1810;font-size:14px;">${reason}</p>
                    </div>`
                  : ""
              }

              <p style="margin:0;color:#5C3A2E;font-size:13px;line-height:1.5;">
                If you believe this was an error or would like to re-submit your payment screenshot, please reach out directly to us on Instagram.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#2D1810;padding:18px 28px;text-align:center;">
              <p style="margin:0;color:#C4A493;font-size:12px;">Créer Club Team • creer.clubs@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Dispatch an email with configured Gmail transporter
 */
export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Créer Club" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
