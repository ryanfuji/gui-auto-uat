# GUI Auto UAT

GUI Auto UAT is a webapp for creating and running automated User Acceptance Tests (Behavior Tests) easily through a web interface. It is built on top of WebdriverIO and utilized the Cucumber Gherkin syntax for human readable browser automation test.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Some things you will need...

1) A MongoDB v3+ instance running see [MongoDB Installing](https://docs.mongodb.com/manual/installation/) for details
2) NodeJS v8+ and NPM v5.6+ see [NodeJS](https://nodejs.org/en/) for downloading and installing
3) Must also have GIT installed see [Installing GIT](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git)

### Installing

Clone the gui-auto-uat repository

```
git clone https://github.com/rpfujiw/gui-auto-uat.git
```

cd into the gui-auto-uat directory then run

```
npm install
```

cd into the gui-auto-uat/angular-src then run

```
npm install
```

create a mongodb database called 'gui-auto-uat-db'

then initialize the steps collection by running

```
mongoimport -d gui-auto-uat-db -c steps --file <path to repo>/gui-auto-uat/db_setup.json
```

start the node backend, from the gui-auto-uat dir, run

```
npm run start
```

start the Angular 5 front end application, from the gui-auto-uat/angular-src dir run

```
ng serve
```

in your browser of choice open the url 'localhost:4200'

## Built With

* [Angular 5](https://github.com/angular/angular/)
* [WebdriverIO](https://github.com/webdriverio/webdriverio)

## Contributing

details on how to contribute to this project is coming soon

## Authors

* **Ryan Fujiwara** - *Initial work* - [Ryan Fujiwara](https://github.com/rpfujiw)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
