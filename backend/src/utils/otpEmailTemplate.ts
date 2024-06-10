export const getOtpEmailTemplate = (OTP_CODE: number, APP_NAME: string) => {
	return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification for ${APP_NAME} App</title>
        <style>
            /* Responsive Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    width: 100% !important;
                }
            }
        </style>
    </head>
    
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <table class="container" cellpadding="0" cellspacing="0" border="0" align="center"
            style="width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse;">
            <tr>
                <td style="background-color: #f8f8f8; padding: 40px 20px; text-align: center;">
                    <h1 style="margin: 0; color: #333;">Welcome to ${APP_NAME} App</h1>
                    <p style="font-size: 16px; color: #666; margin-top: 10px;">Thank you for choosing ${APP_NAME}!</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 20px; background-color: #fff;">
                    <p style="font-size: 16px; color: #333; margin-top: 0;">To complete your registration, please use
                        the following One Time Password (OTP):</p>
                    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <h2 style="margin: 0; font-size: 24px; color: #333; text-align: center;">${OTP_CODE}</h2>
                    </div>
                    <p style="font-size: 16px; color: #333; margin-top: 20px;">This OTP is valid for 5 minutes. Please enter it in the app to verify your account.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; background-color: #f8f8f8; text-align: center;">
                    <p style="font-size: 14px; color: #666; margin: 0;">If you didn't request this OTP, please ignore
                        this email.</p>
                    <p style="font-size: 14px; color: #666; margin: 0;">For any questions or concerns, contact us at www.jagan.pro@gmail.com</p>
                    <p style="font-size: 14px; color: #666; margin: 0;">FMT, Sector 102, Noida, Uttar Pradesh 201204, India</p>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
    
    
    `;
};
