const cheerio = require('cheerio')
const request = require('request')
const discord = require('discord.js')
const bot = new discord.Client()

let embed
let author
let date

bot.login(process.env.token)

bot.on('ready', () => {
  console.log(bot.user.username + ' is online!')
})

bot.on('message', (msg) => {
  let msgArr = msg.content.split(' ')
  if (msgArr[0] === '장곡중') {
    console.log(msg.author.username + ' (' + msg.author.id + ')> ' + msg.content)
    if (msgArr[1] === '공지사항') {
      request('http://school.gyo6.net/janggok/0201/board/29478', (err, response, html) => {
        if (err) { console.log(err) }
        // console.log(html)
        embed = new discord.RichEmbed()
        .setColor('#73FFB7')
        const $ = cheerio.load(html)
        $('a[href="#contents"]').each((i, elem) => {
          if ($(elem).attr('title').split('\n').join('') !== '뷰화면이동') {
            $('td').each((i2, elem2) => {
              if (i2 === (i * 5) + 2) {
                author = $(elem2).text()
              }
            })
            $('td').each((i2, elem2) => {
              if (i2 === (i * 5) + 4) {
                date = $(elem2).text()
              }
            })
            embed.addField((i + 1) + ')  ' + $(elem).attr('title').split('\n').join(''), '[바로가기](' + 'http://school.gyo6.net/janggok/0201/board/29478/' + $(elem).attr('onclick').split('\'')[3] + ') | ' + author + '님이 ' + date + '에 작성하였습니다\n')
          }
        })
        msg.channel.send(embed)
      })
    } else if (msgArr[1] === '가정통신문') {
      
      request('http://school.gyo6.net/janggok/0201/board/29505', (err, response, html) => {
        if (err) { console.log(err) }
        // console.log(html)
        embed = new discord.RichEmbed()
        .setColor('#73FFB7')
        const $ = cheerio.load(html)
        $('a[href="#contents"]').each((i, elem) => {
          if ($(elem).attr('title').split('\n').join('') !== '뷰화면이동') {
            $('td').each((i2, elem2) => {
              if (i2 === (i * 5) + 2) {
                author = $(elem2).text()
              }
            })
            $('td').each((i2, elem2) => {
              if (i2 === (i * 5) + 4) {
                date = $(elem2).text()
              }
            })
            embed.addField((i + 1) + ')  ' + $(elem).attr('title').split('\n').join(''), '[바로가기](' + 'http://school.gyo6.net/janggok/0201/board/29505/' + $(elem).attr('onclick').split('\'')[3] + ') | ' + author + '님이 ' + date + '에 작성하였습니다\n')
          }
        })
        msg.channel.send(embed)
      })
    } else {
      embed = new discord.RichEmbed()
      .setColor('#ff0000')
      .addField('삐빅, 없는 명령어입니다', '현재 공지사항 / 가정통신문을 열람하실 수 있습니다')
      msg.channel.send(embed)
    }
  }
})

  
