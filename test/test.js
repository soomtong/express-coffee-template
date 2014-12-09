var should = require('should');

describe('Test Example', function() {
    before(function() {
        console.log('before ');
    });

    after(function() {
        console.log('after ');
    });

    beforeEach(function() {
        console.log('before each ');
    });

    afterEach(function() {
        console.log('after each');
    });

    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            should([1,2,3].indexOf(5)).equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        })
    });
});