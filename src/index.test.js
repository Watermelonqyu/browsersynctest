import {expect} from 'chai';
import fs from 'fs';

var jsdom;
try {
    jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
    jsdom = require("jsdom"); // jsdom <= 9.x
}
describe('Our first test', () => {
    it('should pass', () => {
        expect(true).to.equal(true);
    });
});

describe('index.html', () => {
    it('should have h1 says users', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8');
        jsdom.env(index, function(err, window) {
            const h1 = window.document.getElementById('h1');
            expect(h1.innerHTML).to.equal('Users');
            done();
            window.close();
        });
        // const options = {
        //     resources: 'usable',
        //     runScripts: 'dangerously'
        // };

        // jsdom.JSDOM.fromFile('./src/index.html', options).then(dom => {
        //     const h1 = dom.window.document.getElementById('h1')[0];
        //     expect(h1.innerHTML).to.equal('My First Heading?');
        //     done();
        // });
    });
});