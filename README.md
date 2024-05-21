# Venkat-FoodSavr-App 🍽️

A React Native Expo application for managing and sharing food resources. 🍎🥦🥪

## Student Information 👨‍🎓

- Name: Nelluri Venkat
- Student ID: 25463
- Email: 25463@student.dorset-college.ie

## Prerequisites ⚙️

- Node.js (>=12.x)
- npm (>=6.x)
- Expo CLI (install globally via `npm install -g expo-cli`)

## Installation 🚀

1. Clone the repository or download the source code.
2. Extract the downloaded files if necessary.

### Install Dependencies 📦

Open the `Venkat-FoodSavr-App\API` folder in your terminal and run:

```bash
npm install
```

Open the `Venkat-FoodSavr-App\app` folder in your terminal and run:

```bash
npm install
```

## Running the Application ⚡

### Start the Backend Server 🖥️

Open the `Venkat-FoodSavr-App\API` folder in your terminal and run:

```bash
npm run dev
```

### Start the Expo Development Server 📱

Open the `Venkat-FoodSavr-App\app` folder in your terminal and run:

```bash
npm start
```

A QR code will be displayed in the terminal. You can scan this QR code using the Expo Go app on your mobile device to run the application.

### Expo Go App 📲

1. Install the Expo Go app on your Android or iOS mobile device.
2. Open the Expo Go app and scan the QR code displayed in the terminal.

## Backend Deployment 🌐

The backend for this application is deployed on [Render](https://render.com/). 🚀

## Database 💾

The application uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as the database. 📂

## API Endpoints 🔌

- `/profile/:id`
- `/profile`
- `/users`
- `/createPost`
- `/posts`
- `/posts/:id/post/:id`
- `/post/:id`
- `/sendMessage`
- `/getMessages/:userId/:otherUserId`
- `/createPost/:id`
- `/follow/:userId`
- `/unfollow/:userId`
