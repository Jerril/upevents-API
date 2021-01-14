const http = require('http');
const { getEvents, getEvent, getEventsBySearch, createEvent, updateEvent, deleteEvent } = require('./controller/eventController');

const server = http.createServer((req, res) => {
    if(req.url === '/api/events' && req.method === 'GET'){
        getEvents(req, res);
    }else if(req.url.match(/\/api\/events\/([0-9]+)/) && req.method === 'GET'){
        let id = req.url.split('/')[3];
        getEvent(req, res, id);
    }else if(req.url.match(/\/api\/events\/search\?q=[a-zA-Z0-9_-]+((\+[a-zA-Z0-9_-]+)+)?/) && req.method === 'GET'){
        let query = req.url.split('?')[1].split('=')[1];
        getEventsBySearch(req, res, query);
    }else if(req.url === '/api/events' && req.method === 'POST'){
        createEvent(req, res);
    }else if(req.url.match(/\/api\/events\/([0-9]+)/) && req.method === 'PUT'){
        let id = req.url.split('/')[3];
        updateEvent(req, res, id);
    }else if(req.url.match(/\/api\/events\/([0-9]+)/) && req.method === 'DELETE'){
        let id = req.url.split('/')[3];
        deleteEvent(req, res, id);
    }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message : "Route not found" }));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`App started at http://localhost:${PORT}`));