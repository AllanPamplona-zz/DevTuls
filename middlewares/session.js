var User=require('../models/mong').User;
module.exports=function(req,res,next){
	if(!req.session.user_id) //Si no hay una sesion activa
		res.redirect("/");
	
	else{
		User.findById(req.session.user_id, function(err,user){
			if(err){
				
				res.redirect("/");
			}
			else{
				res.locals = {user:user};
				next();
			}

		});

		
	}

}