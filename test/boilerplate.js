describe('kr-toplink', function () {

    const expect       = chai.expect;

    // kr-toplink defaults
    // ***
    const defaultClass      = 'kr-toplink';
    const demoClass         = 'kr-demo-toplink';

    // Dot notation of css classes
    const dotDefaultClass = '.' + defaultClass;
    const dotDemoClass    = '.' + demoClass;

    // Container to attach kr-toplink to
    const $container   = $('<div>', { id : '#test'} );


    beforeEach(function() {
        $container.appendTo('body');
    });

    afterEach(function() {
        $container.remove();
    });


    // ---------------------------------------------------------- TEST CASES ---

    it('should spawn one toplink button', function () {
        $container.krTopLink();
        let button = $container.find(dotDefaultClass);
        expect(button.length).to.equal(1);
    });

    it('spawns hidden link button', function () {
        $container.krTopLink();
        let button = $(dotDefaultClass);
        expect(button.is(':visible')).to.be.false;
    });

    it('shows button if scrolled down', function (done) {
        $container.css('height', 5000).krTopLink();
        $(window).scrollTop(5000);

        let button = $(dotDefaultClass);

        // set a delay
        setTimeout(function () {
            expect(button.is(':visible')).to.be.true;
            done();
        }, 1)
    });

    it('should be very last element in the body', function () {
        $container.krTopLink();
        let button = $container.find('> :last-child');
        expect(button.hasClass(defaultClass)).to.be.true;
    });

    it('allow setting custom class-name', function () {
        $container.krTopLink({class: demoClass});
        let button = $container.find(dotDemoClass);

        expect(button.hasClass(demoClass)).to.be.true;
    });

    it('prevents multiple instances', function () {
        $container.krTopLink();
        $container.krTopLink();
        $container.krTopLink();
        let button = $container.find(dotDefaultClass);
        expect(button.length).to.equal(1);
    });

});

describe('kr-mailto', function () {

    const expect       = chai.expect;


    // Container to run DOM based tests in
    const $container   = $('<div>', { id : '#test'} );

    beforeEach(function() {
        $container.appendTo('body');
    });

    afterEach(function() {
        $container.remove();
    });

    it('converts [at], [minus] and [dot] to @, - and .', function (done) {
        $container
            .html('<span data-mailto="false">max[at]muster[minus]mann[dot]de</span>')
            .krMailto(function () {
                expect($container.html()).to.equal('max@muster-mann.de');
                done()
        });
    });

    it('convert obfuscated string to mailto link', function (done) {
        $container
            .html('<span data-mailto>max[at]muster[minus]mann[dot]de</span>')
            .krMailto(function () {
                expect($container.html()).to.equal('<a href="mailto:max@muster-mann.de">max@muster-mann.de</a>');
                done()
        });
    });

});


describe('kr-akkordeon', function () {

    const expect       = chai.expect;

    // Container to run DOM based tests in
    const $container   = $('<div>', { id : '#test'} );

    beforeEach(function() {
        $container
            .appendTo('body')
            .html('<article id="test-akkordeon">\n' +
                '  <section class="card">\n' +
                '    <h3 class="tab">\n' +
                '      Hinter den Wortbergen\n' +
                '    </h3>\n' +
                '    <div class="content">\n' +
                '      <p>\n' +
                '        Dies ist ein Typoblindtext.\n' +
                '      </p>\n' +
                '    </div>\n' +
                '  </section>\n' +
                '  <section class="card">\n' +
                '    <h3 class="tab">\n' +
                '      Hinter den Wortbergen\n' +
                '    </h3>\n' +
                '    <div class="content">\n' +
                '      <p>\n' +
                '        Dies ist ein Typoblindtext.\n' +
                '      </p>\n' +
                '    </div>\n' +
                '  </section>\n' +
                '  <section class="card">\n' +
                '    <h3 class="tab">\n' +
                '      Hinter den Wortbergen\n' +
                '    </h3>\n' +
                '    <div class="content">\n' +
                '      <p>\n' +
                '        Dies ist ein Typoblindtext.\n' +
                '      </p>\n' +
                '    </div>\n' +
                '  </section>\n' +
                '</article>');
    });

    afterEach(function() {
        $container.remove();
    });

    it('first card open, if "initfirstOpen: true"', function () {

        let $subject      = $('#test-akkordeon'),
            $card1Content = $subject.find('.card:first-of-type .content'),
            $card2Content = $subject.find('.card:nth-of-type(2) .content'),
            $card3Content = $subject.find('.card:nth-of-type(3) .content');

        $subject.krAkkordeon();

        expect($card1Content.is(':visible')).to.be.true;
        expect($card2Content.is(':visible')).to.be.false;
        expect($card3Content.is(':visible')).to.be.false;
    });

    it('all cards are closed, if "{ initClosed: true, initfirstOpen: false }"', function () {

        let $subject      = $('#test-akkordeon'),
            $card1Content = $subject.find('.card:first-of-type .content'),
            $card2Content = $subject.find('.card:nth-of-type(2) .content'),
            $card3Content = $subject.find('.card:nth-of-type(3) .content');

        $subject.krAkkordeon({initClosed: true, initfirstOpen: false});

        expect($card1Content.is(':visible')).to.be.false;
        expect($card2Content.is(':visible')).to.be.false;
        expect($card3Content.is(':visible')).to.be.false;
    });

    it('opens multiple cards, if "{ onlyOneCard: false }"', function () {

        let $subject      = $('#test-akkordeon'),
            $card1Tab     = $subject.find('.card:first-of-type .tab'),
            $card1Content = $subject.find('.card:first-of-type .content'),
            $card2Tab     = $subject.find('.card:nth-of-type(2) .tab'),
            $card2Content = $subject.find('.card:nth-of-type(2) .content'),
            $card3Tab     = $subject.find('.card:nth-of-type(3) .tab'),
            $card3Content = $subject.find('.card:nth-of-type(3) .content');

        $subject.krAkkordeon({onlyOneCard: false});

        $card2Tab.click();
        $card3Tab.click();

        expect($card1Content.is(':visible')).to.be.true;
        expect($card2Content.is(':visible')).to.be.true;
        expect($card3Content.is(':visible')).to.be.true;
    });

    it('opens only one card, if "{ onlyOneCard: true }"', function (done) {

        let $subject      = $('#test-akkordeon'),
            $card1Tab     = $subject.find('.card:first-of-type .tab'),
            $card1Content = $subject.find('.card:first-of-type .content'),
            $card2Tab     = $subject.find('.card:nth-of-type(2) .tab'),
            $card2Content = $subject.find('.card:nth-of-type(2) .content'),
            $card3Tab     = $subject.find('.card:nth-of-type(3) .tab'),
            $card3Content = $subject.find('.card:nth-of-type(3) .content');

        $subject.krAkkordeon({onlyOneCard: true});

        $card2Tab.click();

        setTimeout(function () {
            expect($card1Content.is(':visible')).to.be.false;
            expect($card2Content.is(':visible')).to.be.true;
            expect($card3Content.is(':visible')).to.be.false;
            done();
        }, 500)
    });
});

// initClosed    : true
// initfirstOpen : true
// speed         : 'fast'
// onlyOneCard   : true