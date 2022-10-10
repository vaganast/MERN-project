const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    //template literal date fns package dimiourgoume dateTime diko mas
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}` 
    // \t tab space, \n new line logItem bazei to date, ena uniq id k to message st telos
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` 
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
             await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    //origin= where the request originate for kai ta grafoume ola st reqLog.log
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger}