var http = require('http'),
    dispatcher = require('httpdispatcher');
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    // This is our React component, shared by server and browser thanks to browserify
    App = React.createFactory(require('./App'))
    
var fs = require('fs');
var path = require('path');


// Just create a plain old HTTP server that responds to two endpoints ('/' and
// '/bundle.js') This would obviously work similarly with any higher level
// library (Express, etc)
http.createServer(function(req, res) {
  // If we hit the homepage, then we want to serve up some HTML - including the
  // server-side rendered React component(s), as well as the script tags
  // pointing to the client-side code
  if (req.url == '/') {

    res.setHeader('Content-Type', 'text/html')

    
    var html = ReactDOMServer.renderToStaticMarkup(body(null,
        script({href: '/styles.css', rel: "stylesheet"}),
      
      div({style: {textAlign: 'center'},id: 'content', dangerouslySetInnerHTML: {__html:
        ReactDOMServer.renderToString(App())
      }}),

      

      
      script({src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'}),
      script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react.min.js'}),
      script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react-dom.min.js'}),

      script({src: '/bundle.js'})
    ))

    // Return the page to the browser
    res.end(html)

  } else if (req.url == '/bundle.js') {

    res.setHeader('Content-Type', 'text/javascript')

    browserify()
      .add('./browser.js')
      .transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
      }))
      .bundle()
      .pipe(res)

  } else if(req.url == '/styles.css'){
      console.log("qew");
      fs.readFile('.' + req.url, function(error, content){
            if(error){
                console.log(error);
            }else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(content, 'utf-8');
            }
      });
  } else {
    dispatcher.dispatch(req,res);
    res.end();
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})

dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('We are “Money Ball” meets “Source Code“ - Our team consists of some of the most talented upcoming sports journalists and writers covering the latest developments in sports, aided by a talented tech team who are providing better visual tools and interface to approach these realms while also having a heady mix of ex-consultants and bankers who keen to put the best of their own learnings into driving what makes Media 2.0 work. What unites the team in spite of such differences in background is a simple one - we are all fans of the various sports we want to speak to you about. It is this desire to listen and present from a fan’s perspective which makes us special and hopefully unique in this industry.”Sometime ago, I went to meet a project manager in an small IT services company in connection with the website development work I had given them. After the meeting, he caught me outside the office and wanted to talk to me and I agreed. He told me about his personal ambition to be an entrepreneur  and he had an idea and explained it and asked me if I can finance him with some angel funding.');
});
dispatcher.onGet("/page6", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Why are we here ?Our aim is to become the one-stop platform to the Indian sports fan where he can follow his favorite sports through live-scores, match reports, features, engaging forums and much more. We wish to be not just limited to Cricket, but cover popular sports like Badminton, Football, Hockey, Tennis, Kabaddi and others of the ilk in an age where more and more Indians now follow local leagues and championships. There exists a distinct and ever-growing fanbase into what would earlier be considered the fringes of the popular and it is to service this very base that is our motto.The passion he displayed to execute and the conviction he had that it will succeed was quite remarkable. I  got a sense that given sufficiently adequate funding, it might take off. However the domain he had chosen was not my cup of tea and I had kept it out of my purview. I suggested to him to meet some other people and indicated other avenues he can reach out and left.');
});
dispatcher.onGet("/page7", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I got convinced how eager the venture funds flush with funds from abroad are in investing,  when I met a start up founder whom I had met sometime earlier. He told me that a venture capital fund had provided him with seed funding. A year ago when I had met him, he was explaining his idea which was in a crowded sector and he had no proper business plan even. I was convinced at that time he will go nowhere with that idea. However to be fair to him and the venture fund I should mention that  he probably spruced up his plan and took other actions in the intermediate period to be funded by them.The mother of all experiences which made me dumbfounded was when an interior designer friend told me this. He said he had known a family from his fathers times who are into hardware business in Bangalore for generations. Now one of the brothers who has absolutely no knowledge about the technology field, has decided to create a trust fund and it will primarily support a startup accelerator who will incubate IT companies. He asked me to suggest any suitable startups I know of.');
});
dispatcher.onGet("/page8", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('The show first screened on New Zealand television in 1996 on Sky Sport, however those without a Sky subscription could view Sports Cafe without a UHF Sky Decoder by tuning their TV to the Sky Sport UHF channel, as the signal was not scrambled during this show. In 2002, Sports Cafe moved to Sky 1 and in 2003 to TV2.It featured interviews with current sports stars and comical skits about sports. Each episode lasted 60 minutes, including commercials.The show was pulled at the end of 2005 after the "Celebrity Drug Scandal" but it is understood that this was not the reason for the show going off the air. The grand final screened November 23, 2005 and at the end of the show the presenters actually destroyed the set on the air, as The Exponents played their hit song "Why Does Love Do This To Me?".On Sunday June 22, 2008 it was announced in the Herald on Sunday newspaper that SportsCafe would return for a final season, to begin on July 9, 2008. The show featured most of the original cast, and aired on Wednesday nights at 9.30pm on TV2.');
});
dispatcher.onGet("/page9", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I had been to various meetings meant for aspiring entrepreneurs organised by various meet up groups and other professional bodies.  I have also bumped into a some of Venture Capital fund managers during these meetings, who come looking for suitable ventures to pick and for networking. Talking to them, I get a sense that they are flush with funds from overseas, hungry to invest and looking for the right fit.As an aspiring angel investor looking at opportunities to invest in a startup, I have set aside a risk capital. In this pursuit, I am constantly interacting with various people who are aspiring entrepreneurs, start up founders, startup aggregators (for lack of a better word to describe them) who bring in startup founders and angel investors on a platform and make a cut out of the funds raised if any deal goes through. ');
});
dispatcher.onGet("/page10", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Most of the young professionals working in the IT field I have met have an ambition, hope or a dream to become an successful entrepreneur and make it big one day. While quite a number of them have put their ideas into action and  are at various stages of success, failure, disgruntlement and disillusionment, many of them don't even have a plan of action to try to reach their goal.One of the early indications of the changing environment came to me almost three years ago when one of our family friends told us that their 25 year old son after completing his engineering degree and working for over two years in one of the top four Audit & Advisory firms in the world had decided to quit and join his friends in Bangalore and is living frugally working on a startup which they believe will go places one day.  Just around five to ten years ago, it was almost unthinkable for any person from a working class aka middle class family to quit a well paying job very early in his career and go for a venture of his own.");
});