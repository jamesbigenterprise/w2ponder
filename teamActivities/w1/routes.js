const fs = require('fs');

const requestHandler = (req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head> <title> Team Activity</title></head>')
        res.write('<body> <h1> Hello for the Team activity </h1> </body>');
        //res.write('<body><form action="/message" method="POST"> <input type="text" name="message"> <button type="submit"> Send </button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/activities'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        const sports = ['soccer', 'basketball', 'golf'];
        res.write('<ul>');
        res.write('<li>' + sports[0] + '</li>');
        res.write('<li>' + sports[1] + '</li>');
        res.write('<li>' + sports[2] + '</li>');
        res.write('</ul>');
        res.write('<form action="/add-activity" method="POST"> <input type="text" name="message"> <button type="submit"> Submit </button></form>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/add-activity' && method === 'POST') {
        const body =[];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/activities');
                return res.end();
            });  
        });
    }
}

module.exports = requestHandler;