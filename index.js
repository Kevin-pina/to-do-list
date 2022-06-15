//dependencias necesarias para el funcionamiento de la aplicacion
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//renderizar archivos css 
app.use(express.static("public"));

//placeholders para la tarea añadida
var task = ["estudiar matematicas", "comprar cereal", "comprar un brincolin"];
//placeholders para la tarea eliminada
var complete = ["tareas completadas", "aprender a bailar salsa"];

//ruta post para añadir nueva tarea 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //añadir nueva tarea desde la ruta post
    task.push(newTask);
    console.log("dos");
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //comprueba el typeof de las diferentes tareas completadas, luego lo añade en la tarea completa
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //comprueba si la tarea completada ya existe en la tarea cuando está marcada ,entonces la remueve
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    console.log("tres");
    res.redirect("/");
});

//renderiza los ejs y muestra la tarea agregada, la tarea completada
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
    console.log("uno");
});

//se configura para escuchar en el puerto 3001
app.listen(3000, function() {
    console.log("corriendo el servidor en el puerto 3001");
});