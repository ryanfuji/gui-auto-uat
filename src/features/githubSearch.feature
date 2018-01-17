Feature: Github test
    As a Developer in Test
    I want to search for webdriverio repository
    So that I can use it in my future tests

Scenario: open URL
    Given I open the url "https://www.teqopps.com/"
    Then  I expect that the url is "https://www.teqopps.com/"
    And   I expect that the title is "blah"

Scenario: another
    Given I open the url "https://www.teqopps.com/"
    Then  I expect that the url is "https://www.teqopps.com/"
