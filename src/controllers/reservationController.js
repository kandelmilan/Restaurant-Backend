const nodemailer = require("nodemailer");
const db = require("../config/db");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const sendReservation = async (req, res) => {
    const {
        name, email, phone, date, time,
        guests, seating, occasion, dietary, message
    } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
        return res.status(400).json({ error: "Please fill required fields" });
    }

    try {
        const sql = `
            INSERT INTO reservations 
            (name, email, phone, date, time, guests, seating, occasion, dietary, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            name, email, phone, date, time, guests,
            seating || null, occasion || null, dietary || null, message || null
        ], async (err, result) => {
            if (err) {
                console.log("DB Error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            const reservationId = result.insertId;

            // =============================================
            // ADMIN NOTIFICATION EMAIL (English + Japanese)
            // =============================================
            const adminMail = {
                from: `"Masala Zen Reservations" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER,
                subject: `🍽️ New Reservation #${reservationId} — ${name} (${date} at ${time})`,
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Georgia, serif; background: #fdfaf7; margin: 0; padding: 20px; }
                        .container { max-width: 620px; margin: auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
                        .header { background: linear-gradient(135deg, #f97316, #ef4444); padding: 32px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 26px; font-style: italic; }
                        .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
                        .badge { display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-top: 8px; }
                        .body { padding: 32px; }
                        .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #f97316; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #fed7aa; }
                        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
                        .row:last-child { border-bottom: none; }
                        .label { color: #9ca3af; font-size: 13px; min-width: 160px; }
                        .value { color: #111827; font-size: 13px; font-weight: 600; text-align: right; }
                        .highlight-box { background: #fff7ed; border-left: 4px solid #f97316; border-radius: 8px; padding: 16px; margin: 24px 0; }
                        .highlight-box p { margin: 0; color: #c2410c; font-size: 13px; line-height: 1.6; }
                        .message-box { background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 8px; }
                        .message-box p { margin: 0; color: #374151; font-size: 13px; line-height: 1.6; font-style: italic; }
                        .footer { background: #1c1917; padding: 20px; text-align: center; }
                        .footer p { color: #78716c; font-size: 12px; margin: 0; }
                        .divider { height: 1px; background: #f3f4f6; margin: 24px 0; }
                        .lang-label { display: inline-block; font-size: 10px; padding: 2px 8px; border-radius: 10px; margin-left: 6px; vertical-align: middle; }
                        .en-label { background: #dbeafe; color: #1d4ed8; }
                        .ja-label { background: #fce7f3; color: #9d174d; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <!-- Header -->
                        <div class="header">
                            <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0 0 8px;">🕉️ MASALA ZEN</p>
                            <h1>New Table Reservation</h1>
                            <p>新しいテーブル予約</p>
                            <span class="badge">Reservation #${reservationId}</span>
                        </div>

                        <!-- Body -->
                        <div class="body">

                            <!-- Guest Info -->
                            <div class="section-title">👤 Guest Information / ゲスト情報</div>
                            <div class="row">
                                <span class="label">Full Name / フルネーム</span>
                                <span class="value">${name}</span>
                            </div>
                            <div class="row">
                                <span class="label">Email / メール</span>
                                <span class="value">${email}</span>
                            </div>
                            <div class="row">
                                <span class="label">Phone / 電話番号</span>
                                <span class="value">${phone}</span>
                            </div>

                            <div class="divider"></div>

                            <!-- Booking Details -->
                            <div class="section-title">📅 Booking Details / 予約詳細</div>
                            <div class="row">
                                <span class="label">Date / 日付</span>
                                <span class="value">${date}</span>
                            </div>
                            <div class="row">
                                <span class="label">Time / 時間</span>
                                <span class="value">${time}</span>
                            </div>
                            <div class="row">
                                <span class="label">Guests / ゲスト数</span>
                                <span class="value">${guests} ${parseInt(guests) === 1 ? "Guest / 名" : "Guests / 名"}</span>
                            </div>

                            <div class="divider"></div>

                            <!-- Preferences -->
                            <div class="section-title">🍽️ Preferences / 選好度</div>
                            <div class="row">
                                <span class="label">Seating / 座席</span>
                                <span class="value">${seating || "No preference / 特に希望なし"}</span>
                            </div>
                            <div class="row">
                                <span class="label">Occasion / 特別な機会</span>
                                <span class="value">${occasion || "None / なし"}</span>
                            </div>
                            <div class="row">
                                <span class="label">Dietary / 食事の要件</span>
                                <span class="value">${dietary || "None / なし"}</span>
                            </div>

                            ${message ? `
                            <div class="divider"></div>
                            <div class="section-title">💬 Message / メッセージ</div>
                            <div class="message-box">
                                <p>"${message}"</p>
                            </div>
                            ` : ""}

                            <!-- Action required box -->
                            <div class="highlight-box">
                                <p>
                                    <strong>Action Required / 対応が必要:</strong><br>
                                    Please confirm this reservation by contacting the guest at 
                                    <strong>${email}</strong> or <strong>${phone}</strong>.<br>
                                    <span style="font-size:12px;">ゲストに <strong>${email}</strong> または <strong>${phone}</strong> でご連絡して予約を確認してください。</span>
                                </p>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="footer">
                            <p>🕉️ Masala Zen · 2-14-5 Minami-Aoyama, Minato-ku, Tokyo</p>
                            <p style="margin-top:4px;">This is an automated notification from your reservation system.</p>
                        </div>
                    </div>
                </body>
                </html>
                `
            };

            // =============================================
            // GUEST CONFIRMATION EMAIL (English + Japanese)
            // =============================================
            const confirmationMail = {
                from: `"Masala Zen 🕉️" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: `✅ Reservation Confirmed — Masala Zen (#${reservationId})`,
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Georgia, serif; background: #fdfaf7; margin: 0; padding: 20px; }
                        .container { max-width: 580px; margin: auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
                        .header { background: linear-gradient(135deg, #f97316, #ef4444); padding: 40px 32px; text-align: center; }
                        .emoji { font-size: 48px; display: block; margin-bottom: 12px; }
                        .header h1 { color: white; margin: 0; font-size: 28px; font-style: italic; }
                        .header h2 { color: rgba(255,255,255,0.9); margin: 6px 0 0; font-size: 18px; font-weight: normal; }
                        .body { padding: 32px; }
                        .greeting { font-size: 18px; color: #111827; margin-bottom: 6px; }
                        .greeting-ja { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
                        .summary-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin: 24px 0; }
                        .summary-title { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #f97316; margin-bottom: 12px; }
                        .summary-row { display: flex; justify-content: space-between; padding: 6px 0; }
                        .summary-label { color: #9ca3af; font-size: 13px; }
                        .summary-value { color: #111827; font-size: 13px; font-weight: 600; }
                        .big-date { text-align: center; background: #f97316; color: white; border-radius: 12px; padding: 16px; margin: 16px 0; }
                        .big-date .date { font-size: 24px; font-weight: bold; }
                        .big-date .time { font-size: 16px; opacity: 0.9; margin-top: 4px; }
                        .message-en { color: #374151; font-size: 14px; line-height: 1.7; margin-bottom: 12px; }
                        .message-ja { color: #6b7280; font-size: 13px; line-height: 1.7; border-top: 1px dashed #e5e7eb; padding-top: 12px; }
                        .footer { background: #1c1917; padding: 24px; text-align: center; }
                        .footer p { color: #78716c; font-size: 12px; margin: 4px 0; }
                        .social { margin-top: 12px; }
                        .divider { height: 1px; background: #f3f4f6; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <!-- Header -->
                        <div class="header">
                            <span class="emoji">🎉</span>
                            <h1>Reservation Confirmed!</h1>
                            <h2>ご予約が確認されました！</h2>
                        </div>

                        <!-- Body -->
                        <div class="body">
                            <p class="greeting">Dear ${name},</p>
                            <p class="greeting-ja">${name}様、</p>

                            <p class="message-en">
                                Thank you for choosing Masala Zen. Your reservation has been received and we look forward to welcoming you. We will reach out shortly to confirm your booking.
                            </p>
                            <p class="message-ja">
                                マサラ禅をお選びいただきありがとうございます。ご予約を承りました。まもなくご確認のご連絡をさせていただきます。
                            </p>

                            <!-- Date highlight -->
                            <div class="big-date">
                                <div class="date">📅 ${date}</div>
                                <div class="time">🕐 ${time}</div>
                            </div>

                            <!-- Summary -->
                            <div class="summary-box">
                                <div class="summary-title">📋 Reservation Summary / 予約概要</div>
                                <div class="summary-row">
                                    <span class="summary-label">Reservation ID / 予約番号</span>
                                    <span class="summary-value">#${reservationId}</span>
                                </div>
                                <div class="summary-row">
                                    <span class="summary-label">Guests / ゲスト数</span>
                                    <span class="summary-value">${guests} ${parseInt(guests) === 1 ? "person / 名" : "persons / 名"}</span>
                                </div>
                                ${seating ? `
                                <div class="summary-row">
                                    <span class="summary-label">Seating / 座席</span>
                                    <span class="summary-value">${seating}</span>
                                </div>` : ""}
                                ${occasion ? `
                                <div class="summary-row">
                                    <span class="summary-label">Occasion / 特別な機会</span>
                                    <span class="summary-value">${occasion}</span>
                                </div>` : ""}
                                ${dietary ? `
                                <div class="summary-row">
                                    <span class="summary-label">Dietary / 食事の要件</span>
                                    <span class="summary-value">${dietary}</span>
                                </div>` : ""}
                            </div>

                            <div class="divider"></div>

                            <p class="message-en" style="font-size:13px; color:#6b7280;">
                                If you need to make any changes, please contact us at 
                                <a href="mailto:${process.env.GMAIL_USER}" style="color:#f97316;">${process.env.GMAIL_USER}</a> 
                                or call us at <strong>+81 3-1234-5678</strong>.
                            </p>
                            <p class="message-ja" style="font-size:12px;">
                                変更が必要な場合は、<a href="mailto:${process.env.GMAIL_USER}" style="color:#f97316;">${process.env.GMAIL_USER}</a> またはお電話 <strong>+81 3-1234-5678</strong> までご連絡ください。
                            </p>
                        </div>

                        <!-- Footer -->
                        <div class="footer">
                            <p>🕉️ <strong style="color:#d6d3d1;">Masala Zen</strong></p>
                            <p>2-14-5 Minami-Aoyama, Minato-ku, Tokyo</p>
                            <p>+81 3-1234-5678 · hello@masalazen.jp</p>
                            <p style="margin-top:12px; color:#57534e; font-size:11px;">
                                We look forward to seeing you! / お会いするのを楽しみにしております！
                            </p>
                        </div>
                    </div>
                </body>
                </html>
                `
            };

            try {
                await transporter.sendMail(adminMail);
                await transporter.sendMail(confirmationMail);

                console.log(`✅ Reservation #${reservationId} saved & emails sent to ${email}`);

                return res.status(200).json({
                    success: true,
                    message: "Reservation saved & email sent",
                    reservationId
                });

            } catch (emailErr) {
                console.error("Email Error:", emailErr);
                // Still return success since reservation was saved in DB
                return res.status(200).json({
                    success: true,
                    message: "Reservation saved but email failed",
                    reservationId
                });
            }
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { sendReservation };