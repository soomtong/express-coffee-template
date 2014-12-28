
window.Harookit = Ember.Application.create({});
/*

Harookit.ApplicationAdapter = DS.FixtureAdapter;

Harookit.Article = DS.Model.extend({
    name         : DS.attr(),
    email        : DS.attr(),
    bio          : DS.attr(),
    avatarUrl    : DS.attr(),
    creationDate : DS.attr()
});

Harookit.Article.FIXTURES = [{
    id: 1,
    name: 'Sponge Bob',
    email: 'bob@sponge.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: 'http://jkneb.github.io/ember-crud/assets/images/avatars/sb.jpg',
    creationDate: 'Mon, 26 Aug 2013 20:23:43 GMT'
}, {
    id: 2,
    name: 'John David',
    email: 'john@david.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: 'http://jkneb.github.io/ember-crud/assets/images/avatars/jk.jpg',
    creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}];
*/

Harookit.LoginView = Ember.View.extend({
    templateName: 'login',

    firstName: "Albert",
    lastName: "Hofmann"
});

Harookit.InfoView = Ember.View.extend({
    templateName: 'info',

    posts: 25,
    hobbies: "Riding bicycles"
});

Harookit.Router.map(function() {
    this.route("masthead", { path: "/head" });
    this.route("articles", { path: "/articles" });
    //this.resource('article', function() {
    //    this.route('list', { path: ':slug' });
    //});
});

Harookit.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        // Set the IndexController's `title`
        controller.set('title', "Harookit");
        controller.set('version', "0.0.1");
    }
});

Harookit.isLoginController = Ember.Controller.extend({
    isLogin: false
});

Harookit.articlesRoute = Ember.Route.extend({
    setupController: function(controller, isLogin) {
        controller.set('model', isLogin);
    }
});

/*
Harookit.ArticlesRoute = Ember.Route.extend({
    model: function() {
        var articleObejcts = [];
        Ember.$.getJSON('/articles', function(artists) {
            artists.forEach(function(data) {
                //articleObejcts.pushObject(Harookit.Article.createRecord(data));
                articleObejcts.pushObject(Harookit.Article.createRecord(data));
            });
        });
        return articleObejcts;
    }
});
*/
