const Event = require('../model/eventModel');

const { getPostData } = require('../utils');

// @dec      get all events
// @route    GET /api/events
async function getEvents(req, res) {
    try {
        const events = await Event.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(events));
    } catch (error) {
        console.log(error);
    }
}

// @desc     get event by Id
// @route    GET /api/events/:id
async function getEvent(req, res, id) {
    try {
        const event = await Event.findById(id);

        if(!event || Object.entries(event).length === 0){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "Event Not Found" }));    
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(event));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc     get events by search term
// @route    GET /api/events/search?q=string
async function getEventsBySearch(req, res, query) {
    try {
        let events = await Event.findBySearch(query);

        if(!events || events.length === 0){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "No Event Found" }));    
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(events));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc     create event
// @route    POST /api/events
async function createEvent(req, res) {
    try {
        const body = await getPostData(req);

        const  { name, image, description, type } = JSON.parse(body);

        const eventData = {
            name,
            image,
            description,
            type
        }

        const newEvent = await Event.create(eventData);

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newEvent));

    } catch (error) {
        console.log(error);
    }
}

// @desc     update event
// @route    PUT /api/events/:id
async function updateEvent(req, res, id) {
    try {
            const event = await Event.findById(id);
    
            if(!event || Object.entries(event).length === 0){
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: "Event Not Found" }));    
            }else{
                const body = await getPostData(req);

                const  { name, image, description, type } = JSON.parse(body);

                const eventData = {
                    ...event,
                    name: name || event.name,
                    image: image || event.image,
                    description: description || event.description,
                    type: type || event.type
                }

                const newEvent = await Event.update(id, eventData);

                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(newEvent));
            }

    } catch (error) {
        console.log(error);
    }
}

// @desc     remove event
// @route    DELETE /api/events/:id
async function deleteEvent(req, res, id) {
    try {
            const event = await Event.findById(id);
    
            if(!event || Object.entries(event).length === 0){
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: "Event Not Found" }));    
            }else{
                const newEvent = await Event.remove(id);

                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: `Event with ID: ${id} removed successfully`}));
            }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEvents,
    getEvent,
    getEventsBySearch,
    createEvent,
    updateEvent,
    deleteEvent,
}