const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');

// Mailgun configuration
const DOMAIN = 'sandboxea8227f389ef42889f863dc0229b7570.mailgun.org'; // Replace with your Mailgun domain
const mg = mailgun({ apiKey: '8453ff323026d31674b42e948764648f-826eddfb-fdf4f292', domain: DOMAIN,  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    const { firstName, lastName, Email } = req.body;

    const data = {
        from: 'Deakin Newsletter <newsletter1@sandboxea8227f389ef42889f863dc0229b7570.mailgun.org>',
        to: Email,
        subject: 'Newsletter Subscription',
        text: `Hello ${firstName} ${lastName},\n\nThank you for subscribing to our newsletter!`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.send('You have Subscribed successful! Please Check your email.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
