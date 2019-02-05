var swarm = require('discovery-swarm')
var { pipeline } = require('stream')
var hypercore = require('hypercore')
const ram = require('random-access-memory')
var feed = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'})

//feed.append('hello')
//feed.append('world', function (err) {
  //if (err) throw err
  //feed.get(0, console.log) // prints hello
  //feed.get(1, console.log) // prints world
//})

feed.ready(() => {
  var sw = swarm({
    utp: false,
    stream: () => feed.replicate()
  })

  sw.listen()

  sw.join(feed.discoveryKey.toString('hex')) // can be any id/name/hash

  sw.on('connection', function (connection) {
    console.log('found + connected to peer')
  })

  //const feed2 = hypercore(ram, feed.key, { valueEncoding: 'utf-8' })
  //const sync1 = feed.replicate({ live: true })
  //const sync2 = feed2.replicate({ live: true })

  //const read = feed2.createReadStream({ live: true })
  //read.pipe(process.stdout)

  //pipeline(
    //sync1,
    //sync2,
    //sync1
  //)
  console.log(feed.discoveryKey.toString('hex'))
  console.log('listening: ', feed.key.toString('hex'))
})
