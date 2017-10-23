var fs = require('fs');

function writeScreenShot(data,filename){
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data,'base64'));
    stream.end();
}

describe('Data is loaded',function(){
    it('It should show a bunch of datas', function(){
        browser.get('http://localhost:8080/RESTClient/angular/#!/');
        var births = element.all(by.repeater('birth in births'));
        expect(births.count()).toBeGreaterThan(2);
    });
})