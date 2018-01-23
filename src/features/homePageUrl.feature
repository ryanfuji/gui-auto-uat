Feature: The url should load correctly
	As a user of Teqopps.com
	I should be able to load the url correctly

Scenario: The url is as expected
	Given I open the url "https://www.teqopps.com"
	Then I expect that the url is "https://www.teqopps.com/"

