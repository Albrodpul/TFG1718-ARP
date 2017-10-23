describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('http://localhost:8080/RESTClient/angular/#!/');
        
        element.all(by.repeater('birth in births')).then(function(initialData){
            browser.driver.sleep(2000);
            
           
            element(by.model('newBirth.region')).sendKeys('Murcia');
            element(by.model('newBirth.year')).sendKeys('2015');
            element(by.model('newBirth.men')).sendKeys('32132');
            element(by.model('newBirth.women')).sendKeys('32132');
            element(by.model('newBirth.totalbirth')).sendKeys('321313');
            
            
        
            element(by.className('btn-floating btn-large waves-effect waves-light blue')).click().then(function(){
                element.all(by.repeater('birth in births')).then(function(births){
                    expect(births.length).toEqual(3);
                });
            });
        })
    })
});