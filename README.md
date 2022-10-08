# Online Vehicle Shop
## _Angular_ _and_ _Spring_ _version of OVS_
[![N|Solid](https://appian.com/content/appian-aem/it_it/resources/partners/all-partners/crystal-system-group-ltd-/_jcr_content/root/container/container_1705898074/image.coreimg.png/1626920403797/crystal-system-logo.png)](https://www.crystal-system.eu/)
[![N|Solid](https://humansinlearning.ro/wp-content/uploads/2020/02/logo-humans-in-learning.png)](https://humansinlearning.ro/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/humansinlearning/OVS-WEB)

Online vehicle shop is a dealership website template in which a dealership can put their cars for sale online.

## Features

- Guest mode (the user can only see the cars list on the website and he can login/signup)
- Client mode: 
-- can see the cars list 
-- can open a post and purchase a vehicle 
-- can configure a new vehicle
-- can visualize purchase history
- Admin mode: 
-- can access the database 
-- can modify/add/delete new entries in some of the tables of the database 
-- can create new admin users


## Tech

OVS uses a number of open source projects to work properly:

- [Java](https://www.java.com/en/) - programming language based on the OOP concept 
- [MySQL](https://www.mysql.com/downloads/) - SQL type databse provided by Microsoft
- [Spring](https://spring.io/projects/spring-boot) - Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
- [Angular](https://angular.io/) - single page WEB framework based on Typescript




## Installation

OVS requires the use of a MySQL Server to run the included database on it.

Install MySQL 8.0.28+ and run the scripts for the database provided by the project (OVS/database/ovswebdb.sql).

You need to change the username/password in the [databaseCredentials.properties](https://github.com/humansinlearning/OVS-WEB/blob/main/server/src/main/resources/application.properties) to the local ones that you use for the server connection.

Run the main class in the Spring project.

Server side documentation:
```
http://localhost:8085/swagger-ui/index.html
```

OVS requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd OVS-WEB/client
npm install typescript --save-dev
npm install -g @angular/cli
npm i
ng serve
```

## Development
[Documentation that will be added](http://conf.crystal-system.eu/display/DE/OnlineVehicleShop)


