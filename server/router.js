const Authentication = require('./controllers/authentication.js');
const ProjectController = require("./controllers/projectController.js");
const TicketController = require("./controllers/ticketController.js");
const UserRoles = require("./controllers/userRoles.js");
const { listProjects } = require("./controllers/projectController.js");
const passportService = require("./services/passport");
const { listRoles } = require("./controllers/userRoles.js");
const FileUpload = require("./controllers/fileUpload.js");
const passport = require("passport");

const requireAuth = passport.authenticate('jwt', { session : false });//It is a kind of middleware that tells that request should go through passport
const requireSignin = passport.authenticate('local', { session : false});

module.exports = function(app){
    app.get('/', function(req, res){ UserRoles.listRoles(req, res); });
   

    //User Routes
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('/getUsers',  Authentication.getUsers);

    //Project Routes
    app.get("/listProjects", requireAuth, function(req, res){ProjectController.listProjects(req, res);  });
    app.post("/createProject", requireAuth, ProjectController.createProject);
    app.post("/updateProject", requireAuth, ProjectController.updateProject);

    //Ticket Routes
    app.get("/listTickets", requireAuth, function(req, res){TicketController.listTickets(req, res);  });
    app.post("/createTicket", requireAuth, TicketController.createTicket);
    app.post("/updateTicket", requireAuth, TicketController.updateTicket);

    //FileUpload
    app.post('/uploads', FileUpload.upload.single("file"), function(req, res){
        res.send({ file : req.file});
       // FileUpload.getFileName(req, res,req.file);
    });
    app.get('/image/:filename', FileUpload.getFileName);
    app.post("/files/:filename", FileUpload.deleteFile);

}