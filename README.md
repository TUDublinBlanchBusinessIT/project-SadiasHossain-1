# **ShopSmart App Project** 
## **Overview**
ShopSmart is a mobile app designed to make shopping easier and more fun. It allows users to sign up, log in, and explore various features like saving deals, and marking favorite items. The app securely stores user information in Firebase, so users can have a personalized experience every time they log in. Whether you’re looking for the best discounts or managing your favorite products, ShopSmart helps you shop smarter.
## **Features**
#### User Authentication:
- Users can sign up or log in using a username and password.
- User information is securely stored in Firebase Firestore.

#### Trending Products:
- Displays a list of trending products with discounts.
- Allows users to mark products as favorites by clicking on a heart icon.

#### Deals Section:
- Offers users discounts and deals.
- Users can save or remove a coupon.

#### User Profile:
- Displays user account information (username and email).
- Allows users to view their subscription details.
- Log out functionality that redirects to the opening screen.

#### Data Persistence:
- Favorites and saved deals are stored in Firebase, ensuring continuity across sessions.

#### Navigation:
- Smooth navigation between Home, Deals, and Profile screens.
- Simple and user-friendly navigation bar.
## **Technologies Used**
- **React Native**: For building the app's user interface.
- **Firebase Firestore**: For data storage and retrieval.
- **Firebase Authentication**: For secure user authentication.
- **React Navigation**: For navigating between screens.

## **Setup Instructions**

- **NodeJS**: Make sure Node.js is downloaded and installed. You can download it from [Node.js official website](https://nodejs.org/).
- **Firebase Project**: Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/) and configure Firestore and Authentication.
- **Clone the Repository**: Clone this repository using `git clone <repository-link>`.
- **Install Dependencies**: Navigate to the project directory and run `npm install` to install the required dependencies.
- **Set Up Firebase Config**: Update the `firebaseConfig.js` file with your Firebase project credentials.
- **Start the Application**: Run `npx expo start` to start the development server and view the app.
- **Install Expo CLI (Optional)**: If not already installed, install Expo CLI globally by running `npm install -g expo-cli`.

## **Folder Structure**
- **Assets**: Images
- **Screens**: All the Screens
- **App.js**: Main app file with navigation setup
- **firebaseConfig.js**: Firebase setup and configuration
- **package.json**: App dependencies
  
## **Future Improvements**
- Add a search feature for products and deals.
- Implement push notifications for new deals.
- Add a dark mode option for user preferences.


