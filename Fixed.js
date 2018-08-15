//To fix the frontend editor:

//1. Open the following two files:

//wp-content\plugins\js_composer\assets\js\frontend_editor\frontend_editor.js
//wp-content\plugins\js_composer\assets\js\frontend_editor\custom_views.js

//2. Replace

this.$controls = $( _.template( template, data, vc.template_options ).trim() ).addClass( 'vc_controls' ); with
this.$controls = $( ( "vc.template_options" ).trim() ).addClass( 'vc_controls' );

//To fix the backend editor:

/*
Find html2element in
Version < 4.8: /wp-content/plugins/js_composer/assets/js/backend/composer-view.js
Version > 4.9: wp-content/plugins/js_composer/assets/js/dist/backend-actions.min.js
*/
html2element: function(html) {
  var attributes = {},
    $template;
  if (_.isString(html)) {
    this.template = _.template(html);
    $template = $(this.template(this.model.toJSON()).trim());
  } else {
    this.template = html;
    $template = html;
  }
  _.each($template.get(0).attributes, function(attr) { // **errors on this line**
    attributes[attr.name] = attr.value;
  });
  this.$el.attr(attributes).html($template.html());
  this.setContent();
  this.renderContent();
},
/*
Then replace to function
*/
html2element: function(html) {
    var $template, attributes = {},
        template = html;
    $template = $(template(this.model.toJSON()).trim()), _.each($template.get(0).attributes, function(attr) {
        attributes[attr.name] = attr.value
    }), this.$el.attr(attributes).html($template.html()), this.setContent(), this.renderContent()
},
