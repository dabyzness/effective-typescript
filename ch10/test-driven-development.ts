// Test-driven development
// 1. Write  test that fails
// 2. Run the test to ensure that it fails
// 3. Write code to make it pass
// 4. Run the test to see that it now passes
// 5. Run all tests to see the new code does not break other tests
// 6. Repeat

// Unit tests
// A unit test is awhite-box test where all of the external interfaces to a block of code are mocked or stubbed out. Objects under test should be desinged to interact with interfaces, so that those interfaces can be easily movked or stubbed in a unit test scenario

// Integration Tests
//  Tests that allow the objest under test to run in a n environment close to how it would look in a real deployment. These include blocks of code that call REST services and are reliant on that data. The test would need to actually call a REST service, get the data, and then test it. It's important to make sure the calls are being made correctly and the proper data is received

// Acceptance Tests
// Black-box tests that are generally scenario based. They may incorportae multiple user screens or user interaction sin order to pass. Having a full suite of automated acceptance tests also proves that the application works, and that new features have no inadvertently broken older ones.

// Unit testing frameworks
// Jasmine, QUnit, Mocha, etc.

// Jest is a simple-to-configure and powerful JS unit testing framwork that is built on top of the popular Jasmine framework.
