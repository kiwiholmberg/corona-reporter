## Description
A serverless function that posts a count of corona (COVID-19) cases to a slack channel. Data is fetched on demand from the public health agency of Sweden.

![image](https://user-images.githubusercontent.com/1312802/76363339-183ede80-6323-11ea-9500-8ce45497edc1.png)


## Test on local
Testing locally requires node.js. Run `npm run test-local`, which only prints the result to your terminal (no slack config required).

## Config
The environment variable SLACK_HOOK_URL must be supplied. Read more about incoming webhooks for slack [here](https://api.slack.com/messaging/webhooks)

## Deploy
On zeit.co with the `now` commandline tool.

## Security
The endpoint for this function has no authentication which means anyone could request it. Consider this before using it :)

## Scheduling
To get a periodic report posted, use a service like https://cron-job.org/en/ that calls your API endpoint.
