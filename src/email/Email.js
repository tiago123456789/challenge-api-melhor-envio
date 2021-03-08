import nodemailer from "nodemailer";

class Email {

    constructor() {
        this._host = process.env.EMAIL_HOST
        this._port = process.env.EMAIL_PORT
        this._auth = {
            user: process.env.EMAIL_AUTH_USER, 
            pass: process.env.EMAIL_AUTH_PASS,
        };
        this._from = null;
        this._to = null; 
        this._subject = null;
        this._text = null;
        this._html = null;
    }

    withFrom(from) {
        this._from = from;
        return this;
    }

    withTo(to) {
        this._to = to;
        return this;
    }

    withSubject(subject) {
        this._subject = subject;
        return this;
    }

    withText(text) {
        this._text = text;
        return this;
    }

    withHtml(html) {
        this._html = html;
        return this;
    }

    send() {
        const transporter = nodemailer.createTransport({
            host: this._host,
            port: this._port,
            auth: this._auth
        });

        return transporter.sendMail({
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: this._text,
            html: this._html
        });
    }
}

export default Email;