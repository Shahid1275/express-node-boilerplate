var command = require('./');

command()
  .run('touch lol.js')
  .run('echo "hi" > lol.js')
  .end(function(err) {
    console.log(err);
  });

