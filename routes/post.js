var express = require('express'),
	router = express.Router(),
	Post = require("models/Post"),
	User = require("models/User"),
	translit = require("libs/translit"),
	checkAuth = require('middleware/checkAuth')
	vow = require('vow');

router
	.get('/add',  checkAuth, function(req, res, next){
		res.render("addPost");
	})
	.post('/add', checkAuth, function(req, res, next){

		var post = new Post({
			name: req.body.name,
			body: req.body.body,
			author: req.user._id
		});

		post.save(function(err,user){
		if(err) return next(err);
		res.redirect('/post');
	});
})
.get(/\/(\w+\/)?(\w+|\d+)?/ , function(req, res, next) {

	var PP = require('libs/promises/PostPromises');

	var cat  = req.params[0],
		nameOrPage = req.params[1],
		Limit = 7,
		Skip = (Number(nameOrPage)||0)*Limit;

	var query = {
		where:{},
		select: {
			name: 1,
			author: 1,
			modified: 1	
		},
		skip: Skip,
		limit: Limit
	}

	if( nameOrPage && !(Number(nameOrPage)||false) ){
		delete query.skip;
		delete query.limit;
		query.select['body'] = 1;
	    query.where['name'] = nameOrPage;	
	}

	PP.getPosts(query)
		.then(PP.getIdsofPosts)
		.then(PP.usersOfPosts)
		.then(function(arg){
			for(var i in arg.posts){
				if(arg.posts[i].author){
					var user = arg.users[arg.posts[i].author];

					arg.posts[i].author = {
						name: user.username
					}
				}
			}
			console.log(nameOrPage)
			res.json(arg.posts)
		//O	res.render('posts',{title:"Статьи", posts:PP.Posts});
		});
});


module.exports = router;
