import { NativeModules } from 'react-native'
import dns from 'dns.js'
const { DnsLookup } = NativeModules

dns.lookup = (...args) => DnsLookup.lookup(...args)

module.exports = dns
