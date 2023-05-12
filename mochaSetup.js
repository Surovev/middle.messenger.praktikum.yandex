
const { JSDOM } = require("jsdom");

const dom = new JSDOM('<div id="root"><div>', { url: "http://localhost:3000" });
global.window = dom.window;
global.document = dom.window.document;
global.window.history = dom.window.History;

global.HTMLElement = class {
  innerHtml = "";
};

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
}

global.XMLHttpRequest = class {
  status = 200;
  onload = () => null;

  setRequestHeader = (headers) => null;

  getResponseHeader = (header) => {
    return "no headers";
  };

  open = (method, url) => null;

  send = (data) => {
    this.status = 200;
    this.response = "OK";
    this.onload();
  };
};
