const wdioConfig = require('./wdio.conf.js');

wdioConfig.config.capabilities = [{
    browserName: 'chrome',
}];

wdioConfig.config.services = ['selenium-standalone'];

exports.config = wdioConfig.config;
