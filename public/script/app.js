window.Harookit = Ember.Application.create();

Harookit.Router.map(function() {
    this.resource('articles', { path: '/' });
});
