const got = require('got')
const cheerio = require('cheerio')

const slackHook = process.env.SLACK_HOOK_URL
const url = 'https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/aktuellt-epidemiologiskt-lage/'

module.exports = async (req, res) => {
  try {
    const response = await got(url)
    const $ = cheerio.load(response.body)
    const primary = $('#content-primary div')

    const header = primary.find("h2:contains('Antal fall i Sverige')").first()
    console.log('Got header: ', header.text())

    const list = header.nextAll('ul').first()
    console.log('List stats: ', list.text())

    let topCountiesText = ''
    let otherCountiesCounter = 0

    list.children().each((i, elm) => {
      if (i <= 4) {
        topCountiesText += $(elm).text() + '\n'
      } else {
        const match = $(elm).text().match(/(\d+)/)
        otherCountiesCounter += parseInt(match[0], 10)
      }
    })
    const otherCountiesText = `${otherCountiesCounter} personer i övriga län`

    const slackText = `${header.text()}\n\n${topCountiesText}${otherCountiesText}\n\nKälla: <${url}|Folkhälsomyndigheten>`

    if (!slackHook) {
      console.log(slackText)
      console.log('No SLACK_HOOK_URL envvar present. Exiting.')
      return
    }
    await got.post(slackHook, {
      json: {
        text: slackText
      }
    })
  } catch (err) {
    console.log(err)
    if (res) {
      return res.status(500).end()
    }
  }

  if (res) {
    return res.status(200).end()
  }
}

