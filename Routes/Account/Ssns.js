var Express = require('express');
var connections = require('../Connections.js');
var Tags = require('../Validator.js').Tags;
var ssnUtil = require('../Session.js');
var router = Express.Router({caseSensitive: true});

router.baseURL = '/Ssns';

// Begin '/Ssns/' functions

// Returns a list of all active sessions. Admin-privileged AU required.
// Returns array of
//             cookie - Unique cookie value for session
//             usrId  - ID of User logged in
router.get('/', function(req, res) {
   var body = [], ssn;

   if (req.validator.checkAdmin()) {
      for (cookie in ssnUtil.sessions) {
         ssn = ssnUtil.sessions[cookie];
         console.log("Session: " + cookie + ' -> ' + ssn);
         body.push({cookie: cookie, prsId: ssn.id, loginTime: ssn.loginTime});
      };
      res.status(200).json(body);
   }
	else
		console.log("I am not Admin");
});

// A successful POST generates a browser-session cookie that will permit continued access for 2 hours.
// Indicated User becomes the AU.
// An unsuccessful POST results in a 400/No Permission error code, with no further information.
//
// Fields {
//          email    : Email of user requesting login
//          password : Password of user
//       }
router.post('/', function(req, res) {
   var cookie;
	console.log('POST Ssns/');

   connections.getConnection(res, function(cnn) {
      cnn.query('select * from Users where email = ?', [req.body.email], function(err, result) {
         if (req.validator.check(result.length  && result[0].password === req.body.password, Tags.badLogin)) {
            cookie = ssnUtil.makeSession(result[0], res);
            res.location(router.baseURL + '/'  + cookie).end();
         }
         cnn.release();
      });
   });
});

// Begin 'Ssns/:cookie' functions

// Log out the specified Ssn.
//
// AU must be owner of Ssn or admin.
router.delete('/:cookie', function(req, res, next) {
   if (req.validator.check(req.params.cookie === req.cookies[ssnUtil.cookieName]
    || req.session.isAdmin(), Tags.noPermission)) {
       ssnUtil.deleteSession(req.params.cookie);
       res.sendStatus(200);
   }
});

// Returns usrId that corresponds to the provided (valid) cookie
//
// Note that this function is not specified in the project API Interface but is
// kept since it seems like it could be a handy utility
router.get('/:cookie', function(req, res, next) {
   var cookie = req.params.cookie;
   var vld = req.validator;
   if (vld.checkPrsOK(ssnUtil.sessions[cookie].id)) {
      res.json({prsId: req.session.id});
   }
})

module.exports = router;
