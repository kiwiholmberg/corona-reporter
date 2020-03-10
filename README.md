## Description
A serverless function that posts a count of corona (COVID-19) cases to a slack channel. Data is fetched on demand from the public health agency of Sweden.

## Test on local
Testing locally requires node.js. Run `npm run test-local`, which only prints the result to your terminal (no slack config required).

## Config
The environment variable SLACK_HOOK_URL must be supplied. Read more about incoming webhooks for slack [here](https://api.slack.com/messaging/webhooks).
Supply this variable in now secrets: `now secrets add slack-hook-url "https://hooks.slack.com/services/xyz"`

## Deploy
On zeit.co with the `now` commandline tool. Super simple!

## Security
The endpoint for this function has no authentication which means anyone could request it. Consider this before using it :)

## Scheduling
To get a periodic report posted, use a service like https://cron-job.org/en/ that calls your API endpoint.
