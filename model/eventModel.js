const events = require('../data/events');
const { v4: uuidv4, stringify } = require('uuid');
const { writeDataToFile } = require('../utils');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(events);
    });
}

const findById = id => {
    return new Promise((resolve, reject) => {
        const event = events.filter(e => e.id === id);
        resolve(event);
    });
}

const findBySearch = query => {
    return new Promise((resolve, reject) => {
        
        let queryList = query.split('+');
        let foundEvents = [];

        // 1. loop query in queryList arr
        queryList.forEach(query => {
            // create the match/check algo or regex
            const regex = new RegExp(`${query}`, 'gi');
            // 2. check if the query appears in name/desc of any of the event in DB using the above algo
            events.forEach(event => {
                // if it appears; it means the user might need it
                if (event["name"].search(regex) >= 0 || event["description"].search(regex) >= 0){
                    
                    // check if event not in the array yet.
                    if(foundEvents.length > 0){
                        foundEvents.forEach(et => {
                            if(!Object.is(event, et)){
                                // If not in, push it into a new arr; else do nothing
                                foundEvents.push(event);
                            }
                        })
                    }else{
                        foundEvents.push(event);
                    }
                }
            });
        });
        // const regex = new RegExp(`[^a-zA-Z0-9]${query}[^a-zA-Z0-9]`, 'gim');
        resolve(foundEvents);
    });
}

const create = event => {
    return new Promise((resolve, reject) => {
        const newEvent = {id: uuidv4(), ...event };
        events.push(newEvent);
        writeDataToFile('./data/events.json', events);
        resolve(newEvent);
    });
}

const update = (id, data) => {
    return new Promise((resolve, reject) => {
        let index = events.findIndex(event => event.id === id);
        events[index] = {id, ...data};
        writeDataToFile('./data/events.json', events);
        resolve(events[index]);
    });
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        const newEvents = events.filter(e => e.id !== id);
        writeDataToFile('./data/events.json', newEvents);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    findBySearch,
    create,
    update,
    remove
}