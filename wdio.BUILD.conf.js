const wdioConfig = require('./wdio.conf.js');

wdioConfig.config.capabilities = [{
    browserName: 'chrome',
}];

wdioConfig.config.services = ['phantomjs','chromedriver'];

exports.config = wdioConfig.config;
