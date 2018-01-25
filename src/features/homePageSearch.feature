Feature: Home Page Search
	As a user of Teqopps.com
	I should be able to search for jobs from the home page

Scenario: search results are displayed
	Given I open the url "https://www.teqopps.com"
	When I pause for 4000ms
	And I click on the button ".search-btn"
	Then I expect that element "app-home-search-results" becomes visible

