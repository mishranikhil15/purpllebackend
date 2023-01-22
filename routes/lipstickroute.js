const express = require("express")
// const regex=require("regex")

const { Lipstickmodel } = require("../models/lipstickmodel")

const lipstickrouter = express.Router();

lipstickrouter.get("/", async (req, res) => {
    const { title1,country,price,rating,sortby, order } = req.query
    let store = {};
    let sort = {}
    if (title1 != undefined && sortby != undefined && order != undefined) {
        store = { title: title1 }
        sort[sortby] = order;
        console.log(store);
        console.log(sort);
    } else if (title1 == undefined && order != undefined && sortby != undefined) {
        store = {}
        sort[sortby] = order;
        // console.log(8)

    } else if (title1 != undefined && order == undefined && sortby == undefined) {
        store.title = { '$regex': title1, '$options': 'i' }; 
        // sort={};
        console.log(store)
    } else if(country!=undefined) {
        store={country:country}
    }else if(price!=undefined){
        store={}
        sort={price:price}
        
    }else if(rating!=undefined){
        store={}
        sort={rating:rating}
    }else{
        store = {};
        sort = {}
    }


    try {

        const data = await Lipstickmodel.find(store).sort(sort)
        res.status(200).json(data)


    } catch (error) {
        console.log(error);
        res.status(404).send({ "msg": "something went wrong" })
    }
})

lipstickrouter.post("/create", async (req, res) => {
    const store = req.body;

    try {
        const data = new Lipstickmodel(store);
        await data.save();
        res.status(200).send("Posted the Data")
    } catch (error) {
        console.log(error);
        res.status(408).send({ "msg": "something went wrong" })
    }

})

lipstickrouter.patch("/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await Lipstickmodel.findByIdAndUpdate({ _id: ID }, payload)
        res.send(`updated the todo data whose id is ${ID}`)
    } catch (error) {
        console.log(error);
        res.send({ "err": "something went wrong" })
    }
})


lipstickrouter.delete("/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await Lipstickmodel.findByIdAndDelete({ _id: ID })
        res.send(`Deleted the todo data whose id is ${ID}`)
    } catch (error) {
        console.log(error);
        res.send({ "err": "something went wrong" })
    }
})


module.exports = {
    lipstickrouter
}
