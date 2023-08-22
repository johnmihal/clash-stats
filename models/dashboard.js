const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    title: { type: String, required: true },
    players: [{ type: String, required: true }],
  });


// Virtual for book's URL
DashboardSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/dashboard/${this._id}`;
  });
  
  // Export model
  module.exports = mongoose.model("Dashboard", DashboardSchema);