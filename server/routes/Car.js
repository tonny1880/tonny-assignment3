let express = require('express')
let router = express.Router()
let mongoose = require('mongoose');

// connect with car model

let cars = require('../models/CarList');

/* Read Operation */
/* Get route for carbuy */

router.get('/',(req,res,next)=>{
    cars.find((err,carbuy)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/buy',{
                title: 'Car Buy', 
                Carbuy: carbuy})
        }
    });
}); 
module.exports=router;

/* Add Operations */
/* Get Route for displaying the Add-page -- Create Operation */
router.get('/add',(req,res,next)=>{
res.render('cars/add',{title:'Add Car'})


});
/* Post Route for processing the Add-page -- Create Operation */
router.post('/add',(req,res,next)=>{
    let newCar = cars ({
        "Make":req.body.Make,
        "Model":req.body.Model,
        "Color":req.body.Color,
        "Year":req.body.Year,
        "Price":req.body.Price,
        "Description":req.body.Description
    })
    cars.create(newCar,(err,Car) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/cars-list');
        }

    })

});
/* Edit Operations */
/* Get Route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',(req,res,next)=>{
    let id = req.params.id;
    cars.findById(id,(err,carToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('cars/edit',{title:'Cars Menu Edit', cars:carToEdit});
        }
})

});

/* Post Route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',(req,res,next)=>{
    let id=req.params.id;
    let updateCar = cars({
        "_id":id,
        "Make":req.body.Make,
        "Model":req.body.Model,
        "Color":req.body.Color,
        "Year":req.body.Year,
        "Price":req.body.Price,
        "Description":req.body.Description
    })
    cars.updateOne({_id:id},updateCar,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }   
        else
        {
            res.redirect('/cars-list');   
        }


    })
});
/*Delete Operation */
/* Get to perform Delete Operation -- Delete Operation*/
router.get('/delete/:id',(req,res,next)=>{
    let id =req.params.id;
    cars.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }   
        else
        {
            res.redirect('/cars-list'); 
        }
    })
});

