/**
 * Created by reza on 2/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);