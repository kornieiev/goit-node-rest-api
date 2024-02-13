Остановился на ошибке при отправке запроса POST на адрес:

http://localhost:3000/users/verify

с боди:

{
"email":"mail.korneev@gmail.com"
}

reVerification - string 18-22

ERROR:
Error: Message failed: 550 Message body: SPAM FOUND
at SMTPConnection.\_formatError (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:790:19)
at SMTPConnection.\_actionSMTPStream (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:1706:34)
at SMTPConnection.<anonymous> (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:1174:22)
at SMTPConnection.\_processResponse (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:969:20)
at SMTPConnection.\_onData (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:755:14)
at SMTPConnection.\_onSocketData (/Users/dmytrokorneev/Documents/GoIT/Node/HW/goit-node-rest-api/node_modules/nodemailer/lib/smtp-connection/index.js:193:44)
at TLSSocket.emit (node:events:514:28)
at addChunk (node:internal/streams/readable:545:12)
at readableAddChunkPushByteMode (node:internal/streams/readable:495:3)
at Readable.push (node:internal/streams/readable:375:5) {
code: 'EMESSAGE',
response: '550 Message body: SPAM FOUND',
responseCode: 550,
command: 'DATA'
}
