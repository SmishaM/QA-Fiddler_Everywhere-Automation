var Application = require('spectron').Application
var assert = require('assert')
var mocha = require('mocha')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
chai.should()

describe('Application launch', function () {
    this.timeout(30000)
    
      before(function () {
        this.app = new Application({
          // Your electron path can be any binary
          // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
          // But for the sake of the example we fetch it from our node_modules.
          path:  'C:/Users/smisham.PROGRESS/AppData/Local/Programs/Progress Telerik Fiddler/Progress Telerik Fiddler.exe',
        })
        this.enableTimeouts(false)
        return this.app.start()
      })
   
    it('shows an second window',  function () {
        this.timeout(5000)
        return this.app.client.waitUntilWindowLoaded().getWindowCount().then(function (count) {
          console.log("=======",count)
          assert.equal(count, 1)
          
          // Please note that getWindowCount() will return 2 if `dev tools` are opened.
          
        })
      })
    
    function handleError(done, fn) {
        try { 
            fn();
            done();
        } catch (error) {
            done(error);
        }
    }
    it('shows an initial window', function (done) {
        // let c = await this.app.client.getWindowCount()
        this.timeout(45000)
        // console.log("window count",c)
        this.app.client
        .getWindowCount().should.eventually.equal(1).then(()=>{
            console.log("rrrrrrrr")
          setTimeout( () =>{
            // let title = await this.app.client.windowByIndex(0).getTitle()
            //console.log("stage1")
            //done()
            
                // console.log("*******",title)
                // this.app.client.click('capture-title').then((r)=>{
                  this.app.client.click("button").then(function(){
                    done()
                  })
                  
                //   console.log(r)
                //     this.app.client.$$('a').then((r)=>{
                //         this.app.client.getText('capture-title').then((text)=>{
                //             console.log("Get Text:",text)
                //             done()
                //         })
                //     })
                // })
            }, 35000);
            })
    })
//})
//})

// function x(){
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve()
//             done()
//         },15000)
//     })
// }
 })

