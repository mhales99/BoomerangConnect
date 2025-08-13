describe('BoomerangConnect App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the home screen on app launch', async () => {
    await expect(element(by.text('BoomerangConnect'))).toBeVisible();
    await expect(element(by.text('Welcome back!'))).toBeVisible();
  });

  it('should navigate to Connect screen', async () => {
    await element(by.text('Connect')).tap();
    // Add expectations based on your actual Connect screen implementation
    // For example:
    // await expect(element(by.text('Find Connections'))).toBeVisible();
  });

  it('should navigate to Profile screen', async () => {
    await element(by.text('Profile')).tap();
    // Add expectations based on your actual Profile screen implementation
    // For example:
    // await expect(element(by.text('My Profile'))).toBeVisible();
  });

  it('should navigate to Settings screen', async () => {
    await element(by.text('Settings')).tap();
    // Add expectations based on your actual Settings screen implementation
    // For example:
    // await expect(element(by.text('App Settings'))).toBeVisible();
  });

  // Add more E2E tests for your app's main user flows
});
