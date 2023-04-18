# OLO Mobile App

OLO Listing App is a comprehensive solution for creating a listing application for iOS, Android, and web platforms, complete with a visually appealing design for both mobile and dashboard interfaces. Our app provides an all-in-one solution that makes it easy to implement for any application, ensuring a seamless user experience.

With OLO Listing App, you can create a fully functional listing app for various purposes, whether it's for classifieds, e-commerce, real estate, or any other type of listings. The app is designed with a user-friendly interface, making it easy for users to browse and search for items, create listings, manage inventory, and communicate with buyers or sellers.

The mobile app is built using cutting-edge technologies such as React Native with Expo, ensuring optimal performance and native-like experience on both iOS and Android devices. For the dashboard, web-based solution, React is utilized to provide a smooth and responsive interface for managing listings.

Our app also integrates GraphQL for efficient data querying and retrieval, along with Apollo Client for robust state management and seamless interaction with API endpoints. The backend API is developed using Node.js with MongoDB as the database, ensuring reliable data storage and retrieval.

Whether you need a listing app for a marketplace, e-commerce, or any other type of application, OLO Listing App provides a comprehensive solution with a sleek design, advanced features, and easy implementation for a seamless listing experience.

**Note: This is the full free source code of our solution, however the backend and API is proprietary and can be obtained via paid license.**

## What is included:

OLO app offers a comprehensive e-commerce solution with two distinct modules: the admin panel and the OLO app.

The admin panel lets you manage orders, track sales, and handle customer accounts efficiently. It's your command centre for complete control over your e-commerce business.

The OLO app provides a user-friendly platform for customers to customize and place their orders with ease. With a vast selection of products to choose from, customers can customize their orders to their liking, ensuring a hassle-free shopping experience.

## Features:

It has all the features that you will ever need to implement this application for any listing application. Some of the features that are included in it are:

- Push Notification for both Mobile and Web
- Email Integration -- Email is sent for some actions such as making Order
- Chat Integration
- Follow Integeration
- Google Authentication integration
- Mobile Responsive Dashboard
- Zones based ads shown
- Favourites Integration <br>
  We have made sure that the code is well structured and removed of unnecessary screens to make your development life easier. It is also integrated with the following features so you could have an even better development experience.
  <br>
- ESLint to provide you with linting capability in Javascript.
- Prettier for code formatting
- Jest for unit testing
- Husky to prevent bad commits.

## Setup

As we’ve mentioned above, the solution includes two separate modules. To setup these modules, follow the steps below:
To run the module, you need to have nodejs installed on your machine. Once nodejs is installed, go to the directory and enter the following commands: npm start
The required credentials and keys have been set already. You can setup your own keys and credentials
The version of nodejs should be between 16.0 to 18.0

## Screenshots

|                     Ecommero Menu                     |                 Ecommero Categories                  |                    Ecommero Items                     |
| :---------------------------------------------------: | :--------------------------------------------------: | :---------------------------------------------------: |
| ![](./contributingGuides/screenshots/customer11.jpeg) | ![](./contributingGuides/screenshots/Categories.png) | ![](./contributingGuides/screenshots/customer33.jpeg) |
|                Ecommero Items Details                 |                Ecommero User Account                 |                      Track Order                      |
|  :------------------------------------------------:   |  :------------------------------------------------:  |  :------------------------------------------------:   |
|  ![](./contributingGuides/screenshots/rider11.jpeg)   |  ![](./contributingGuides/screenshots/rider22.jpeg)  |  ![](./contributingGuides/screenshots/rider33.jpeg)   |
|                    Stats Overview                     |                      User Table                      |                   Products Editing                    |
|    :--------------------------------------------:     |    :--------------------------------------------:    |    :--------------------------------------------:     |
|    ![](./contributingGuides/screenshots/eco1.png)     |    ![](./contributingGuides/screenshots/eco2.png)    |    ![](./contributingGuides/screenshots/eco3.png)     |

## High Level Architecture

- User Mobile App communicates with only API Server
- Web dashboard communicates with only API Server

### Prerequisites:

**App Ids for Mobile App in app.json**

- iOS Client Id Google
- Android Id Google
- server url

**Set credentials in API in file helpers/config.js and helpers/credentials.js**

Mongo User
Mongo Password
Mongo DB Name
Reset Password Link
Admin User name
Admin Password
User Id
Name

**Set credentials in Admin Dashboard in file src/index.js**

Firebase Api Key
Auth Domain
Database Url
Project Id
Storage Buck
App Id

##Technologies
**Application program interface (API) server**

- NodeJS
- MongoDB
- ExpressJS
- Nodemailer
- Firebase(for push notification on web)
- Express GraphQL
- Mongoose(for mongodb)

**Web Dashboard**

- React
- GraphQL
- Bootstrap
- Firebase(for push notification on web)

**Mobile App**

- React Native
- Expo
- Graphql

## Documentation:

Find the link for the complete documentation of the Ecommero Solution [here](https://listing-nb.gitbook.io/olo-full-app/)
