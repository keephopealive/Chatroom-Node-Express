module.exports = function Route(app){ // Required
  
	app.get('/', function(req, res){
  	res.render('index', {
  			title:'Welcome Page', 
  			session_data:req.session});
	});

  var users_array = [];

  app.io.route('connect_me', function(req){
    user_info = {name: req.data.name, id: req.socket.id};
    users_array.push(user_info);
    req.io.emit('connected', {name: req.data.name, id: req.socket.id, users: users_array});
    req.io.broadcast('connect_new_user', {name: req.data.name, id: req.socket.id, users: users_array});
  });

  app.io.route('submitted_chat', function(req){
    app.io.broadcast('broadcasted_message', { posting_name: req.data.name, posting_id: req.socket.id, posting_message: req.data.my_message });
  });

  app.io.route('disconnect', function(req){
    for(var i = 0; i < users_array.length; i++)
    {
      if ( users_array[i].id == req.socket.id)
      {
        users_array[i] = users_array[users_array.length-1];
        users_array.pop();
      }
    }
    req.io.broadcast('disconnect_user', {disconnect_this_id: req.socket.id});
  });

}