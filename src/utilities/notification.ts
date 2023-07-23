import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.GMAIL_USERNAME}`,
        pass: `${process.env.GMAIL_PASSWORD}`,
        // user: "danieljegede65@gmail.com",
        // pass: "loqqxxtbmuhcivxr"
    },
    tls:{
        rejectUnauthorized: false
    }
})

export const sendmail = async(from:string, to:string, subject:string, html:string) =>{
    try {
        const response = await transporter.sendMail({
            from: process.env.GMAIL_USERNAME,
            // from: "danieljegede65@gmail.com",
            to,
            subject:"Welcome!",
            html
        })
    } catch (err) {
        console.log(err);
        
    }
}

export const emailHtml = (email:string, password:string) =>{
    const mail =`<h1>Welcome To Decagon<h1>
                    <p>Your username: ${email}<p><br>
                    <p>Your password: ${password}<p><br>
                    <p>Thank You!<p>`
                    return mail

}