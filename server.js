var registryUpdates = require('pull-npm-registry-updates')
var pull = require('pull-stream')

pull(
  registryUpdates(),
  pull.drain(function (update) {
    var doc = update.doc
    if (!doc) return
    if (doc.versions) {
      Object.keys(doc.versions).forEach(function (version) {
        var meta = doc.versions[version]
        var author = meta.author
        if (typeof author === 'string') {
          if (author.includes(':')) {
            console.log(JSON.stringify({
              name: meta.name,
              author
            }))
          }
        } else if (typeof author === 'object') {
          Object.keys(author).forEach(function (key) {
            var value = author[key]
            if (typeof value === 'string' && value.includes(':')) {
              console.log(JSON.stringify({
                name: meta.name,
                author
              }))
            }
          })
        }
        var contributors = meta.contributors
        if (Array.isArray(contributors)) {
          contributors.forEach(function (contributor) {
            if (typeof contributor === 'string') {
              if (contributor.includes(':')) {
                console.log(JSON.stringify({
                  name: meta.name,
                  contributor
                }))
              }
            } else if (typeof contributor === 'string') {
              Object.keys(author).forEach(function (key) {
                var value = author[key]
                if (typeof value === 'string' && value.includes(':')) {
                  console.log(JSON.stringify({
                    name: meta.name,
                    author
                  }))
                }
              })
            }
          })
        }
      })
    }
  })
)
