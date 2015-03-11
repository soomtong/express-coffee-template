haroo-kit
=========

custom haroo cloud platform for your business

- contain markdown text and user files to mysql database
- source code written by coffee script
- bower and npm package manager used

### development

coffee app.coffee
nodemon app.coffee

or

cake build
cake run

### production

cake build
pm2 start harookit.js