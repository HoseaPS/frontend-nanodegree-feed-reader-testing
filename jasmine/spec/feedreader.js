/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Percorrendo por cada feed dentro de allFeeds
         * e verificando se há uma URL definida e que não esteja vazia
         */
        it('has defined URL in each feed ', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Percorrendo por cada feed dentro de allFeeds
         * e verificando se há um nome definido e que não esteja vazio
         */
        it('has defined name in each feed', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        // Verificando se o menu, por padrão, não esteja aparecendo         
        it('is hidden by default', function() {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

         /* Verificando se o menu, depois de clica-lo, esteja aparecendo
          * e desaparacendo depois do clica-lo novamente
          */
        it('change menu visibility on menu click ', function() {
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);

            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Verificando se há pelo menos um elemento '.entry' depois 
         * da função loadFeed ser chamada.
         * Usando done como callback pois a função loadFeed é assincrona
         */
        beforeEach(function(done) {
			loadFeed(0, done);
        });

        it('must have at least a single .entry element after loadFeed is called', function() {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);         
		});
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Verificando se o conteudo de '.feed' é atualizado 
         * depois de carregar um segundo feed pela função loadFeed
         */

        // variaveis globais 
        let firstFeed,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
    
        it('changes the content when new feed is loaded by the loadFeed', function() {
            expect(newFeed).not.toBe(firstFeed);
        });
    });
}());
