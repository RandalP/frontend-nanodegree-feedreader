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

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('have url', function() {
            for (var feed in allFeeds) {
                var url = allFeeds[feed].url;
                expect(url).toBeDefined();
                expect(url).toBeTruthy();
            }
        });

        /* Loop through each feed in the allFeeds object and
         * ensures it has a name defined that is not empty.
         */
        it('have name', function() {
            for (var feed in allFeeds) {
                var name = allFeeds[feed].name;
                expect(name).toBeDefined();
                expect(name).toBeTruthy();
            }
        });
    });


    describe('The menu', function() {

        /* Ensure the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($('.menu-hidden').length).toEqual(1);
        });

        /* Ensures the menu changes visibility when the menu icon is clicked.
         */
        it('toggles visibility', function() {
            // Clicking once makes the menu visible
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toEqual(0);

            // Clicking again hides the menu
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toEqual(1);
        });

        it('contains links for each feed', function() {
            // Check there is a link for each feed in allFeeds
            expect($('.feed-list').find('a').length).toEqual(allFeeds.length);
        })
    });

    describe('Initial Entries', function() {
        var value;

        /* Ensure that when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('do exist', function() {
            // Get entry elements within .feed container
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        describe('Clicking Link', function() {
            beforeEach(function() {
                spyOn(window, 'loadFeed');
            });

            // Clicking on a new feed triggers loadFeed with the correct parameter
            it('runs loadFeed with correct parameters', function() {
                var blogs = $('.feed-list').find('a')
                blogs.each(function(i) {
                    var blog = blogs[i];
                    blog.click();
                    expect(window.loadFeed).toHaveBeenCalledWith($(blog).data('id'));
                });
            });

            it('hides the menu', function() {
                expect($('.menu-hidden').length).toEqual(1);
            });
        });

        describe('Executing loadFeed', function() {
            // Ensure running loadFeed causes the content to change.

            var ordinal = allFeeds.length - 1;
            var currentTitle;
            beforeEach(function(done) {
                currentTitle = $('.header-title').text();
                loadFeed(ordinal, done);
            });

            it('updates content', function() {
                expect($('.header-title').text()).not.toEqual(currentTitle);
                expect($('.header-title').text()).toEqual(allFeeds[ordinal].name);
            });
        });
    });
}());
