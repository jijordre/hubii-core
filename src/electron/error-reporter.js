const electron = require('electron');
const cleanStack = require('clean-stack');
const ensureError = require('ensure-error');
const debounce = require('lodash.debounce');

const app = electron.app || electron.remote.app;
const dialog = electron.dialog || electron.remote.dialog;
const clipboard = electron.clipboard || electron.remote.clipboard;

let installed = false;
const errorMsg = 'An unexpected error occured. Please report this issue to (https://github.com/hubiinetwork/hubii-core) with the following error logs:';

module.exports = () => {
  if (installed) {
    return;
  }

  installed = true;

  const options = {
    // eslint-disable-next-line no-console
    logger: console.error,
    showDialog: true,
  };

  const handleError = (title, err) => {
    const error = ensureError(err);

    try {
      options.logger(error);
    } catch (err2) { // eslint-disable-line unicorn/catch-error-name
      dialog.showErrorBox('The `logger` option function threw an error', ensureError(err2).stack);
      return;
    }

    if (options.showDialog) {
      const stack = cleanStack(error.stack);
      if (app.isReady()) {
        const btnIndex = dialog.showMessageBox({
          type: 'error',
          buttons: [
            'OK',
            process.platform === 'darwin' ? 'Copy Error' : 'Copy error',
          ],
          defaultId: 0,
          noLink: true,
          message: errorMsg,
          detail: cleanStack(error.stack, { pretty: true }),
        });

        if (btnIndex === 1) {
          clipboard.writeText(`${title}\n${stack}`);
        }
      } else {
        dialog.showErrorBox(title, stack);
      }
    }
  };

  if (process.type === 'renderer') {
    const errorHandler = debounce((error) => {
      handleError('Unhandled Error', error);
    }, 200);
    window.addEventListener('error', (event) => {
      event.preventDefault();
      errorHandler(event.error);
    });

    const rejectionHandler = debounce((reason) => {
      handleError('Unhandled Promise Rejection', reason);
    }, 200);
    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault();
      // should remove this conditional when SDK is patched
      // https://github.com/hubiinetwork/nahmii-sdk/issues/67
      // https://github.com/hubiinetwork/hubii-core/issues/660
      if (event.reason.url === 'https://api2.dev.hubii.net/identity/apptoken') {
        console.error('Unhandled promise rejection from SDK: ', event); // eslint-disable-line
        return;
      }
      rejectionHandler(event.reason);
    });
  } else {
    process.on('uncaughtException', (err) => {
      handleError('Unhandled Error', err);
    });

    process.on('unhandledRejection', (err) => {
      handleError('Unhandled Promise Rejection', err);
    });
  }
};
