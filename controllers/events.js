const { response } = require('express');
const Event = require('../models/Event-model');
/**
 * obtener los eventos
 */
const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    try {
        return res.status(200).json({
            ok: true,
            events
        })
    } catch (error) {
        console.log(error);
    }

}

/**
 * crear los eventos
 */
const createEvents = async (req, res = response) => {

    const event = new Event(req.body);
    console.log(event);

    try {
        event.user = req.uid;

        const eventSave = await event.save();
        res.json({
            ok: true,
            event: eventSave
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}


/*
Actualizar los eventos
*/
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    // console.log('mi uid', uid);

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdated
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        })
    }

}

/**
 * Eliminar los eventos
 */

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
           return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        await Event.findByIdAndDelete(eventId, { new: true });

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        })
    }

}


module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent
}