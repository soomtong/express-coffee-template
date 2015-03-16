production =
  port: 3000
  database:
    auth: ['admin', 'password']

development =
  port: 3001
  database:
    auth: ['test', 'hello']

module.exports = (mode) ->
  switch mode
    when 'production' then return production
    when 'development' then return development
