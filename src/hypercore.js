const levelup = require('levelup')
const randomAccessKeyValue = require('random-access-key-value')
const ram = require('random-access-memory')
const realmdown = require('realm-down')
const hypercore = require('hypercore')
const swarm = require('discovery-swarm')
const pump = require('pump')
const forEachChunk = require('./for-each-chunk')

const db = levelup(realmdown())
const storage = filename => randomAccessKeyValue(db, filename)

const feed = hypercore(ram, 'ba6ae04d574f27de896dae9f3fc4d5c9332b8efc465a2897f592f84ce3b07967', { valueEncoding: 'utf-8' })

feed.on('ready', function() {
  console.warn(feed.discoveryKey.toString('hex'))

  var sw = swarm({
    utp: false
  })

  sw.listen()

  sw.join(feed.discoveryKey.toString('hex'))

  sw.on('connection', function (connection) {
    console.log('found + connected to peer')
  })

});

//const read = feed.createReadStream()
//read.pipe(forEachChunk((chunk, enc, next) => {
  //console.log(chunk.toString())
  //next()
//}))

//const feed = hypercore(ram, { valueEncoding: 'utf8' })

//feed.append('test')
//setInterval(() => {
  //feed.append('test')
//}, 2000);

//feed.ready(() => {
  //const feed2 = hypercore(ram, feed.key, { valueEncoding: 'utf8' })
  //const sync1 = feed.replicate({ live: true })
  //const sync2 = feed2.replicate({ live: true })

  //const read = feed2.createReadStream({ live: true })
  //read.pipe(forEachChunk((chunk, enc, next) => {
    //console.log(chunk.toString())
    //next()
  //}))

  //pump(
    //sync1,
    //sync2,
    //sync1,
    //err => {
      //if (err) {
        //return console.log(err.message)
      //}

      //feed2.get(0, console.log)
    //}
  //)
//})
