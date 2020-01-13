var Application = require('spectron').Application
var assert = require('assert')
// var mocha = require('mocha')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
chai.should()
var menuAdd = require('spectron-menu-addon')
console.log(menuAdd, typeof(menuAdd))
menuAddon = new menuAdd.SpectronMenuAddon()

var app = new Application({
  path: '/Applications/Progress Telerik Fiddler.app/Contents/MacOS/Progress Telerik Fiddler'
})

describe('Application launch', function () {
  this.timeout(30000)
  
    before(function () {
      this.app = new Application({
        // Your electron path can be any binary
        // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
        // But for the sake of the example we fetch it from our node_modules.
        path: '/Applications/Progress Telerik Fiddler.app/Contents/MacOS/Progress Telerik Fiddler',
      })
      return this.app.start()
    })

    it('shows an second window',  function () {
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
      this.timeout(35000)
      this.app.client
      .getWindowCount().should.eventually.equal(1).then(()=>{
        setTimeout( () =>{
          this.app.client.windowByIndex(0)
          
          .getTitle().then((title)=>{
            console.log("*******",title)
            this.app.client.click('button').then((r)=>{
              console.log(r)
              this.app.client.$$('a').then((r)=>{
                this.app.client.getText('button').then((text)=>{
                  console.log("Get Text:",text)
                  done()

                })
              })
            })
          }).catch((e)=>{
            console.log(e)
          })
        }, 10000);
        
      })
    })
//This will click on capture button.
    it('next Click for capture button', function(done){
      this.timeout(15000)
        //console.log("Capture Button",title)
        this.app.client.click('.capture-title').then((r)=>{
          console.log(r)
          setTimeout( async() =>{
            //await Sleep(5000)
            await this.app.client.click('button')
            done()
          },7000)
        })
    })
    //This will click on Stream button.
    it('This is for stream Button', function(done){
      this.timeout(17000)
        //console.log("Stream Button",title)
        this.app.client.click('.content=Stream').then((r)=>{
          console.log(r)
          setTimeout( async() =>{
            //await Sleep(5000)
            await this.app.client.click('button')
            done()
          },9000)

          
   })
        })
         it('For Decode Button', function(done){
          this.timeout(19000)
           this.app.client.click('.content=Decode').then((r)=>{
              console.log(r)
             setTimeout( async() =>{
              //await Sleep(5000)
               await this.app.client.click('button')
                done()
              },11000)

            })        
          })

          it('For Capture button', function(done){
            this.timeout(21000)

            menuAddon.createApplication({ args: ['/Applications/Progress Telerik Fiddler.app/Contents/MacOS/Progress Telerik Fiddler'], path: electronPath.toString() })
 
            menuAddon.clickMenu('File'); // 'Config' Menu click
            // menuAddon.clickMenu('File', 'Save'); // File->Save MenuItem click
            // await menuAddon.isItemEnabled('File', 'Reset') // Verify if MenuItem File->Reset is enabled

            //  this.app.client.click('.button-wrapper').then((r)=>{
            //        console.log(r)
            //      setTimeout( async() =>{
            //        await this.app.client.click('button')
            //        done()
            //      },13000)
  
            //    }).catch((e)=>{
            //      console.log(">>>>>>>>>>",e)
            //    })        
            
          })



})
