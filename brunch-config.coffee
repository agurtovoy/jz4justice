exports.config =

  conventions:
    assets: /^client\/app\/assets\//

  paths:
    watched: [ 'client', 'server' ]

  files:
    javascripts:
      joinTo:
        'javascripts/client.js': /^client\/app/
        'javascripts/vendor.js': /^client\/(vendor|bower_components)/

    stylesheets:
      joinTo:
        'stylesheets/main.css': /^client\/app/

  server:
    path: 'brunchServer.js'
    port: 3000
    base: '/'
    
  overrides:
    production:
      optimize: true
      sourceMaps: false
      plugins: autoReload: enabled: false

  onCompile: (generatedFiles) ->
    console.log generatedFiles.map (f) -> f.path
