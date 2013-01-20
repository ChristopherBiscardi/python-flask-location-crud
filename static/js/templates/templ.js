(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['create_form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n    <a href=\"/locations\" class=\"locations\">View Locations</a>\n    ";}

  buffer += "<div class=\"well\">\n  <h2>Create Location</h2>\n  <form>\n    <input type=\"text\" placeholder=\"name\" name=\"name\">\n    <input type=\"text\" placeholder=\"address\" name=\"address\">\n    <button class=\"btn btn-large btn-primary\">create</button>\n    ";
  stack1 = depth0.locations_link;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </form>\n</div>";
  return buffer;});
templates['home_setup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"span4 offset4\">\n    </div>\n</div>\n</div>";});
templates['locations'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <ul class=\"locations-list span8 offset2\">\n      ";
  stack1 = depth0.locations;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"row-fluid\">\n        ";
  stack1 = {};
  stack1 = helpers.each.call(depth0, depth0, {hash:stack1,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n      ";
  return buffer;}
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"span6\">\n          <a href=\"/locations/\" + this._id>\n            <div class=\"well\">\n              <h4>";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h4>\n              <p>";
  stack1 = depth0.address;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n            </div>\n          </a>\n        </li>\n        ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "\n    <li><em>no locations found</em></li>\n    ";}

  buffer += "<div class=\"container\">\n  <div class=\"row\">\n    ";
  stack1 = depth0.locations;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;});
})();