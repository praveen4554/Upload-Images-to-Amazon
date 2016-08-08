module.exports = function(express, app, formidable, fs, os, gm, knoxClient, mongoose, io,bodyParser){

var Socket;
var mlab=require('../CoreModule/mlab.js');
   var getData = require('../CoreModule/getData.js');
   var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;
    var multer = require('multer');
    var gallery=[];
   var detailed=[];
io.on('connection', function(socket){
	Socket = socket;
})

var Imagedata = new mongoose.Schema({
	filename:String,
	votes:Number
})
var ImagedataModel = mongoose.model('Imagedata', Imagedata);


var router = express.Router();
var path=require('path');



router.get('/admin', function(req, res, next){
	res.render('admin', {host:app.get('host')});
})
router.post('/getHost',function(req,res){
	res.json({"host":app.get('host')});
})
router.post('/update',function(req,res,next){
  var acc = new mlab(mongoose);

   acc.updatelab(req.body.rand,req.body.data,req.body.created_date);
  console.log(req.body.rand+":"+req.body.data);
  res.json({"success":"success"});
})

router.post('/updateimg',function(req,res,next){
  var acc = new mlab(mongoose);

   acc.updateimglab(req.body.rand,req.body.data,req.body.created_date);
  console.log(req.body.rand+":"+req.body.data);
  res.json({"success":"success"});
})
router.get('/aftradmin', function(req, res, next){
	console.log(getEmailid+":"+password);
	console.log("sdf1");
 var kemail = "a@a";
 var kpassword = "s";
//res.redirect('/aftradmin');
 if(getEmailid==kemail){
	 if(password==kpassword){
		 //console.log("sanajy2");
		 //res.send("sanjay");
		 var val="views/aftradmin.html";
		 res.sendFile(path.resolve(val));
	 }else {
		 console.log("sanajy3");
		 res.render('admin', {host:app.get('host')});
	 }
 }else {
	 console.log("sanajy4");
	 res.render('admin', {host:app.get('host')});
 }

	//res.sendFile(path.resolve(val));
	//res.sendFile('aftradmin', {host:app.get('host')});
})
var getEmailid,password;
router.post('/checkloginbox', function(req,res){
		 getEmailid = req.body.email;
		 //console.log(getEmailid);
		 password = req.body.password;
})

router.post('/getimages', function(req, res, next){
	ImagedataModel.find({}, function(err, result){
	  console.log(result[result.length-1].filename);
	  var img=result[result.length-1].filename;
		res.json({"Images":img});
	})
		
})
router.post('/removeImage',function(req,res){
   var filename=req.body.imageName;
   console.log(filename);
	knoxClient.deleteFile("/"+filename,function(err,res){
           if (200 == res.statusCode) { console.log('Deleted'); }
    else console.log('Failed to delete');

	});
});
router.get('/newdetails',function(req,res){
	console.log(detailed);
   res.json({"details":detailed});
});
router.get('/detailedView',function(req,res){
    var val="views/Editview.html";
		 res.sendFile(path.resolve(val));
});
router.post('/newtab',function(req,res){
      detailed=req.body.data;
      //console.log(detailed);
      res.redirect('/detailedView');
});

router.get('/detailedgalView',function(req,res){
    var val="views/galleryedit.html";
     res.sendFile(path.resolve(val));
});
router.post('/newgaltab',function(req,res){
      detailed=req.body.data;
      //console.log(detailed);
      res.redirect('/detailedgalView');
});
router.post('/completeDetails',function(req,res){
      detailed=req.body.data;
      //console.log(detailed);
      res.redirect('/completeView');
});
router.delete('/delete:a', function(req, res){     
        var rand=req.params.a;
        MongoClient.connect('mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly', function(err, db) {
            var query={"rand":rand};
        db.collection('data').remove(query,function(err, doc) {
          if(err) {
           console.log(err);
          }
        else{
           res.json(doc); 
          }
          db.close();
          });
        });
 });

router.delete('/delimg:a', function(req, res){     
        var rand=req.params.a;
        MongoClient.connect('mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly', function(err, db) {
            var query={"rand":rand};
        db.collection('datagal').remove(query,function(err, doc) {
          if(err) {
           console.log(err);
          }
        else{
           res.json(doc); 
          }
          db.close();
          });
        });
 });
router.post('/sendData',function(req,res){

   console.log(req.body.data);

   var acc = new mlab(mongoose);

   acc.sendtomlab(req.body.data);
});

router.post('/Gallery',function(req,res){

   var acc = new mlab(mongoose);

   acc.sendGaltomlab(req.body.data);
   res.json({"success":"success"});
});
router.get('/getGallery',function(req,res){
  MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
          if(db==undefined)
          {
            console.log("hello");
          }
    findGallery(db, function() {
      db.close();
      console.log(gallery);
    res.json(gallery);
  });
    gallery=[];
  });   
});

var findGallery = function(db, callback) {
  a=[];
   var cursor =db.collection('datagal').find( );
   cursor.each(function(err, doc) {
    //console.log(doc);
      if (doc != null) {
        GalPush(doc);
      } 
      else {
         callback();
      }
   });
};
function GalPush(consultant){
      gallery.push({
        data:consultant.data,
        rand:consultant.rand
      });
      //console.log(a);
  }
var consultants=[];
router.get('/getDatafromDb',function(req,res){
  MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
          if(db==undefined)
          {
            console.log("hello");
          }
    findConsultants(db, function() {
      db.close();
    res.json(consultants);
  });
    consultants=[];
  });
});
var findConsultants = function(db, callback) {
  a=[];
   var cursor =db.collection('data').find( );
   cursor.each(function(err, doc) {
    //console.log(doc);
      if (doc != null) {
        ConsultantsPush(doc);
      } 
      else {
         callback();
      }
   });
};

function ConsultantsPush(consultant){
      consultants.push({
        data:consultant.data,
        rand:consultant.rand,
        created_date: consultant.created_date
      });
      //console.log(a);
  }
router.get('/voteup/:id', function(req, res, next){
	singleImageModel.findByIdAndUpdate(req.params.id, {$inc:{votes:1}}, function(err, result){
		res.send(200, {votes:result.votes});
	})
})
 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './');
        },
        filename: function (req, file, cb) {
        	var datetimestamp = Date.now();
        	/*knoxClient.putFile('routes/gilbert.jpg', 'guitarists/gilbert.jpg', {'Content-Type': 'image/jpeg', 'x-amz-acl': 'private'}, function(err, result) {
    console.log(err+";"+result.statusCode);
    if (200 == result.statusCode) { console.log('Uploaded to mazon S3'); }
    else { console.log('Failed to upload file to Amazon S3'); }
});*/
            var fname=file.fieldname;
        	var nfile=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        	gm(file).resize().write(nfile,function(){
        		fs.readFile(nfile, function(err, buf){
						var req = knoxClient.put(nfile, {
							'Content-Length':buf.length,
							'Content-Type':'image/jpeg'
						})
        		req.on('response', function(res){
							if(res.statusCode == 200){
								// This means that the file is in the S3 Bucket !
								var newImage = new ImagedataModel({
									filename:nfile,
									votes:0
								}).save();
								///Socket.emit('status', {'msg':'Saved !!', 'delay':3000});
								//Socket.emit('doUpdate', {});

								// Delete the Local File
								fs.unlink(nfile, function(){
									console.log('Local File Deleted !');
								})


							}
						})
        		req.end(buf);
					})
        	});
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    /** API path that will upload the files */
    router.post('/imgupload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });
app.use('/', router);
}
