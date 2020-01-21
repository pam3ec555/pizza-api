const path = require('path');
const { appDir } = require('../../utils');
const fs = require('fs');
const { userIsLoggedIn } = require('../../auth');

/**
 * @type {string}
 */
const templateDirPath = path.join(appDir, '/src/templates/');

/**
 * @type {string}
 */
const containerFile = path.join(templateDirPath, '_container.html');

/**
 * @param {string} href
 * @param {string} title
 * @return {string}
 */
const itemTemplate = ({ href, title }) => `<li class="header__nav-item">
    <a href="${href}">${title}</a>
</li>`;

/**
 * @param {boolean} isAuthenticated
 * @return {string}
 */
const getHeaderNavItems = (isAuthenticated) => {
  let list;
  if (isAuthenticated) {
    list = [
      {
        title: 'Menu',
        href: 'menu/',
      },
      {
        title: 'Cart',
        href: 'cart/',
      },
      {
        title: 'Logout',
        href: 'logout/',
      },
    ];
  } else {
    list = [
      {
        title: 'Menu',
        href: 'menu/',
      },
      {
        title: 'Login',
        href: 'sign-in/',
      },
      {
        title: 'Sign up',
        href: 'sign-up/',
      },
    ];
  }

  return list.reduce((result, data) => result + itemTemplate(data), '');
};

/**
 * @param {Object} templateData
 * @param {string} template
 * @param {boolean} isAuthenticated
 * @param {function(err: string|boolean, template: string?)} callback
 */
const insertTemplateToContainer = ({
  template,
  callback,
  templateData,
  isAuthenticated,
}) => {
  fs.readFile(containerFile, 'utf8', (err,str) => {
    if (!err && typeof str === 'string' && str.length > 0) {
      str = str.replace('{{children}}', template);
      str = str.replace('{{navData}}', getHeaderNavItems(isAuthenticated));
      callback(false, interpolate({ templateData, str }));
    } else {
      callback('_container.html is not found');
    }
  });
};

/**
 * @param {string} str
 * @param {Object} templateData
 */
const interpolate = ({
  str,
  templateData = {},
}) => {
  if (typeof templateData === 'object') {
    for (const key in templateData) {
       str = str.replace(`{{${key}}}`, templateData[key]);
    }
  }

  return str;
};

/**
 * @param {Object} templateData
 * @param {string} file
 * @param {function(err: string|boolean, template: string?)} callback
 * @param {boolean} isAuthenticated
 */
const getTemplate = ({
  templateData = {},
  file,
  callback,
  isAuthenticated,
}) => {
  fs.readFile(`${templateDirPath}${file}.html`, 'utf8', (err, str) => {
    if (!err && typeof str === 'string' && str.length > 0) {
      insertTemplateToContainer({ callback, template: str, templateData });
    } else {
      callback(err);
    }
  });
};

/**
 * @param {Object} templateData
 * @param {string} file
 * @return {function(data: Object, callback: function)}
 */
const pageRoute = ({
  templateData,
  file,
}) => (data, callback) => {
  if (data.method === 'get') {
    userIsLoggedIn({
      token: data.headers.token, // Todo: this does not work
      callback: (err) => {
        getTemplate({
          file,
          templateData,
          isAuthenticated: !err,
          callback: (err, template) => {
            if (!err && template) {
              callback({
                statusCode: 200,
                data: template,
                contentType: 'html',
              });
            } else {
              callback({
                statusCode: 500,
                data: { error: err },
              });
            }
          },
        });
      },
    });
  } else {
    callback({ statusCode: 405 });
  }
};

module.exports = pageRoute;
