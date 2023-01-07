const express = require('express');
const app = express();
const winston = require('winston');
const { exec } = require('child_process');

// Set up the Winston logger to log to a file
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'api.log' }),
  ]
});

const approvedKeys = require('./api_keys');

app.get('/create_note', (req, res) => {
  // Extract the input parameters from the request
  const apiKey = req.query.apiKey;
  const title = req.query.title;
  const text = req.query.text;
  const notebook = req.query.notebook;

  // Verify the API key
  if (!approvedKeys.includes(apiKey)) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  // Create the x-callback-url
  const xCallbackUrl = `upnote://x-callback-url/note/new?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}&notebook=${encodeURIComponent(notebook)}`;

  // Run the x-callback-url using the child_process module
  exec(`xdg-open "${xCallbackUrl}"`, { shell: '/data/data/com.termux/files/usr/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running x-callback-url: ${error}`);
      res.status(500).send({ error: 'Internal Server Error' });
      return;
    }

    // Log the request
    logger.info(`API request from ${req.ip}: ${xCallbackUrl}`);

    // Send a success response to the client
    res.send({ message: 'Success' });
  });
});

app.get('/start_ssh', (req, res) => {
  // Extract the input parameters from the request
  const apiKey = req.query.apiKey;


  // Verify the API key
  if (!approvedKeys.includes(apiKey)) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  // Run the SSHD script
  exec(`sshd`, { shell: '/data/data/com.termux/files/usr/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send({ error: 'Internal Server Error' });
      return;
    }

    // Log the request
    logger.info(`API request from ${req.ip}: start_ssh`);

    // Send a success response to the client
    res.send({ message: 'Success' });
  });
});
app.listen(3000, () => {
  console.log('API listening on port 3000');
});
