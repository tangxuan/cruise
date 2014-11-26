describe('agent directive test suite', function() {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('cruise'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        $rootScope.someAgent = {
            id: 2,
            domain: 'xcvxljlsjdflsdjflsf04.thoughtworks.com',
            status: 'idle',
            ip: '192.168.0.3',
            path: '/var/lib/cruise-agent',
            resources: ['firefox3', 'core-duo']
        };
        var element = $compile("<c-agent model='someAgent'></c-agent>")($rootScope);
        $rootScope.$digest();
        expect(element.is('.building')).toBeFalsy();
        expect(element.find('.domain').text()).toBe($rootScope.someAgent.domain);
        expect(element.find('.ip').text()).toBe($rootScope.someAgent.ip);
        expect(element.find('.path').text()).toBe($rootScope.someAgent.path);
        expect(element.find('.ip').text()).toBe($rootScope.someAgent.ip);
        expect(element.find('li.resource').length).toBe(2);

    });

     it('Should add building class when agent is in building', function() {
        $rootScope.someAgent = {
            id: 2,
            domain: 'xcvxljlsjdflsdjflsf04.thoughtworks.com',
            status: 'building',
            ip: '192.168.0.3',
            path: '/var/lib/cruise-agent',
            resources: ['firefox3', 'core-duo']
        };
        var element = $compile("<c-agent model='someAgent'></c-agent>")($rootScope);
        $rootScope.$digest();
        expect(element.is('.building')).toBeTruthy();

    });

     it('Should delete resource 2-way-binding', function() {
        $rootScope.someAgent = {
            id: 2,
            domain: 'xcvxljlsjdflsdjflsf04.thoughtworks.com',
            status: 'building',
            ip: '192.168.0.3',
            path: '/var/lib/cruise-agent',
            resources: ['firefox3', 'core-duo']
        };
        var element = $compile("<c-agent model='someAgent'></c-agent>")($rootScope);
        $rootScope.$digest();

        var directiveScope = element.isolateScope();
        directiveScope.deleteRes(0);
        $rootScope.$digest();

        expect($rootScope.someAgent.resources).toEqual(['core-duo']);

    });
});
