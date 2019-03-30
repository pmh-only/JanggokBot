const cheerio = require('cheerio')
const request = require('request')
const discord = require('discord.js')
const bot = new discord.Client()

let teachersRaw = "교장|이상규|교무통할|-|교감|윤순영|교무관리|-|보직교사|황인규|기술/교무운영부장|-|보직교사|홍정애|수학/교육과정부장|-|보직교사|조미숙|영어/교육연구부장|-|보직교사|박우열|미술/생활안전지도부장|-|보직교사|강상희|정보/교육정보부장|-|보직교사|김성철|체육/문화체육부장|-|보직교사|이숙희|사회/환경인성부장|-|보직교사|남문희|음악/창의계발부장|-|보직교사|황정순|진로/진로상담부장|-|보직교사|김도훈|과학/1학년부장|1-6|보직교사|성민정|음악/2학년부장|2-6|보직교사|정영림|국어/3학년부장|3-6|교사|민경자|사회/인성|1-1|교사|구장춘|가정/정보|1-2|교사|정은미|수학/수업계1|1-3|교사|송재현|영어/자유학기제|1-4|교사|이혜진|기술/평가계1|1-5|교사|김단희|한문/대회평가 및 연수|1-7|교사|김정애|국어/문예 및 홍보|1-8|교사|금순이|국어/장학금|1-9|교사|김민지|과학/과학교육|1-10|교사|김대섭|도덕/기획 및 출결|1-11|교사|주영희|체육/생활지도1|1-12|교사|여선희|과학/창의계발기획|2-1|교사|민보라|도덕/창체|2-2|교사|김아란|역사/기획 및 출결|2-3|교사|오수미|국어/학적1(전출)|2-4|교사|조의석|영어/안전교육|2-5|교사|황상연|정보/교육정보기획|2-7|교사|이상희|과학/평가계2|2-8|교사|장지은|도덕/교육과정기획|2-9|교사|김지혜|국어/다문화 및 국제이해교육|2-10|교사|박은현|한문/방과후학교|2-11|교사|강병진|영어/생활지도2|2-12|교사|권미영|특수/특수|2-13|교사|최기식|수학/환경봉사|3-1|교사|정수진|국어/학부모회|3-2|교사|최수란|가정/생활기록부1|3-3|교사|석민정|역사/기획 및 출결|3-4|교사|김순희|영어/교원평가|3-5|교사|이은미|과학/평가계3|3-7|교사|김효정|미술/생활기록부2|3-8|교사|변유정|사회/학적2(전입)|3-9|교사|최영빈|과학/교육연구기획|3-10|교사|박미영|수학/기록|3-1|교사|박형식|체육/생활지도3|3-12|교사|추대근|특수/특수|3-13|교사|장윤진|진로/ 진로상담기획 및 국제교류|-|교사|이미리|역사/학력향상|-|교사|김경희|미술/실내외 청소1|-|교사|김복진|국어/실내외 청소2|-|교사|이후남|영어/문화체육기획|-|교사|한종열|체육/문화체육 체육|-|교사|김형섭|체육/문화체육 학교스포츠|-|교사|김현희|가정/교무기획|-|교사|장주영|수학/수업계2|-|교사|정은수|과학/교육정보 방송|-|교사|김문산|수학/학교폭력책임|-|교사|김치호|체육/학교폭력담당1|-|교사|김민정|영어/학교폭력담당2|-|교사|김해정|국어/생활안전지도기획|-|교사|최원용|수학/학생생활선도|-|교사|하현진|국어/독서토론|-|보건교사|채경희|보건|영양교사|이순진|영양||행정실장|백순철|행정업무총괄|-|행정계장|권혁주|지방공무원 인사 및 주요행정업무|-|주무관|권민정|학교회계|-|주무관|최송죽|행정사무|-|주무관|윤여환|학교시설물관리|-|행정실무사|김연옥|세입.민원|-|교무행정사|이해영|교무행정|-|교무행정사|박초롱|교무행정|-|특수실무사|정성아|특수업무보조|-|전문상담사|박미선|전문상담사|-|조리사|서금자|조리 업무|-|조리원|이경숙|조리 업무|-|조리원|박영미|조리 업무|-|조리원|김둘금|조리 업무|-|조리원|황명자|조리 업무|-|조리원|손영수|조리 업무|-|조리원|김덕화|조리 업무|-|조리원|문명숙|조리 업무|-|조리원|장영미|조리 업무|-|배움터지킴이|이천우|교내외 순찰|-"
let teachers = teachersRaw.split('|')
let embed
let author
let date

bot.login(process.env.token)

bot.on('ready', () => {
  console.log(bot.user.username + ' is online!')
})

bot.on('message', (msg) => {
  let msgArr = msg.content.split(' ')
  if (msgArr[0] === 'swag' || msgArr[0] === 'SWAG') {
    console.log(msg.author.username + ' (' + msg.author.id + ')> ' + msg.content)
    if (msgArr[1] === '보고서' || msgArr[1] === '계획서' || msgArr[1] === '학습상황' || msgArr[1] === '문서' || msgArr[1] === '학습상황보고서') {
      msg.channel.send('지켜보고있습니다, 반달행위 적발시 SWAG에서 추방 당할 수 있습니다\nhttps://docs.google.com/document/d/12RRySSr3kIkuuLzSrafvNutyc1sml8frOFL9L5qkcYM/edit?usp=sharing')
    } else {
      embed = new discord.RichEmbed()
      .setColor('#ff0000')
      .addField('삐빅, 없는 명령어입니다', '현재 학습상황보고서 을(를) 열람하실 수 있습니다')
      msg.channel.send(embed)
    }
  } else if (msgArr[0] === '장곡중') {
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
    } else if (msgArr[1] === '학교소식') {
      
      request('http://school.gyo6.net/janggok/0201/board/29480', (err, response, html) => {
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
            embed.addField((i + 1) + ')  ' + $(elem).attr('title').split('\n').join(''), '[바로가기](' + 'http://school.gyo6.net/janggok/0201/board/29480/' + $(elem).attr('onclick').split('\'')[3] + ') | ' + author + '님이 ' + date + '에 작성하였습니다\n')
          }
        })
        msg.channel.send(embed)
      })
    } else if (msgArr[2] === '선생님') {
      let teacherName = msgArr[1]
      let teacherNumber = teachers.indexOf(teacherName)
      let teacherRole = teachers[teacherNumber - 1]
      let teacherDo = teachers[teacherNumber + 1]
      let teacherClass = teachers[teacherNumber + 2] === '-' ? null :  teachers[teacherNumber + 2]
      if (teacherClass) {
        msg.channel.send(teacherName + ' 선생님은 ' + teacherRole + '이시고, ' + teacherDo + '와 같은일을 하십니다, 또한 ' + teacherClass + '의 담임이시기도 하십니다.')
      } else {
        msg.channel.send(teacherName + ' 선생님은 ' + teacherRole + '이시고, ' + teacherDo + '와 같은일을 하십니다')
      }
    } else {
      embed = new discord.RichEmbed()
      .setColor('#ff0000')
      .addField('삐빅, 없는 명령어입니다', '현재 공지사항 / 학교소식 / 가정통신문을 열람하실 수 있습니다')
      msg.channel.send(embed)
    }
  }
})
