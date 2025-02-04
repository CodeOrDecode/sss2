const { Router } = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const authmiddleware2 = require("../middlewares/authmiddleware2")
const Notemodel = require("../models/noteModel");


const noteRouter = Router();


noteRouter.post("/create", authmiddleware, authmiddleware2(["admin", "manager"]), async (req, res) => {
    const { title, description, userid, username } = req.body;

    try {
        let note = new Notemodel({ title, description, userid, username });
        await note.save();
        res.status(200).json({ message: "note created successfully" })
    } catch (error) {
        res.status(400).json({ message: "error creating note" })
    }

})


noteRouter.get("/allnote", authmiddleware, authmiddleware2(["admin", "manager"]), async (req, res) => {
    let userid = req.body.userid
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 2
    let skip = (page - 1) * limit

    try {
        let allnotes = await Notemodel.find({ userid })
        let totalpage = Math.ceil(allnotes.length / limit)
        let notes = await Notemodel.find({ userid }).limit(limit).skip(skip)
        res.status(200).json({ page: page, totalpage, totalpage, notes: notes })
    } catch (error) {
        res.status(404).json({ message: "error getting notes" })
    }

})



noteRouter.patch("/update/:id", authmiddleware, async (req, res) => {
    let { id } = req.params

    try {
        await Notemodel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({ message: "note updated successfully" })
    } catch (error) {
        res.status(400).json({ message: "error updating note" })
    }

})

noteRouter.delete("/delete/:id", authmiddleware, async (req, res) => {
    let { id } = req.params

    try {
        await Notemodel.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "note deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "error deleting note" })
    }

})

module.exports = noteRouter