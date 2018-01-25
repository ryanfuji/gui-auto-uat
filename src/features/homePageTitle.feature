Feature: Home Page Title
	As a user of Teqopps.com
	I should be able to load the url correctly

Scenario: title positive check
	Given I open the url "https://www.teqopps.com"
	Then I expect that the title is "Teqopps.com | The No SPAM IT Job Site!!"

Scenario: title failing check
	Given I open the url "https://www.teqopps.com"
	Then I expect that the title is "some bad title"

