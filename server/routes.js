var controller = require('./restful/controller');
var router = require('express').Router();

//------Restful API
// standard data interactions, no filtering...
router.get('/api/general', controller.general.get);
router.post('/general', controller.general.post);

// custom interactions...
router.get('/filtered', controller.filtered.get);
router.put('/filtered', controller.filtered.put);
router.delete('/filtered', controller.filtered.delete);
//------end Restful API


module.exports = router;