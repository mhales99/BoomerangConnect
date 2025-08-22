describe('Home Page', () => {
    before(() => {
        browser.url('/');
    });

    it('should have the correct title', () => {
        expect(browser).toHaveTitle('BoomerangConnect');
    });

    it('should display the welcome message', () => {
        const welcomeMessage = $('*=Welcome back!');
        expect(welcomeMessage).toBeDisplayed();
    });

    it('should display the recent connections card', () => {
        const connectionsCard = $('*=Recent Connections');
        expect(connectionsCard).toBeDisplayed();
    });

    it('should navigate to other pages via the navigation menu', () => {
        // Click on the Connect tab
        const connectTab = $('*=Connect');
        connectTab.click();
        
        // Verify we're on the Connect page
        // This will depend on your actual implementation
        // For example:
        // expect(browser).toHaveUrl('/connect');
        
        // Click on the Profile tab
        const profileTab = $('*=Profile');
        profileTab.click();
        
        // Verify we're on the Profile page
        // This will depend on your actual implementation
        // For example:
        // expect(browser).toHaveUrl('/profile');
        
        // Click on the Settings tab
        const settingsTab = $('*=Settings');
        settingsTab.click();
        
        // Verify we're on the Settings page
        // This will depend on your actual implementation
        // For example:
        // expect(browser).toHaveUrl('/settings');
    });
});


