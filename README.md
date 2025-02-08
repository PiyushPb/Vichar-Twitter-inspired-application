# Vichar - Twitter Inspired Application

## Overview
**Vichar** is a social media web application inspired by Twitter, developed as a final-year project during the academic year **2023 - 2024**. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js) along with **Redux for state management** and **Tailwind CSS for styling**, the platform offers a seamless and engaging user experience.

## Features
- **User Authentication**: Secure authentication using Firebase.
- **Freemium and Premium Memberships**: Users can opt for a **premium membership** with enhanced features.
- **Text-to-Image Generation**: Premium users can generate and post images from text inputs.
- **Payment Integration**: Stripe.js is used for processing premium membership payments securely.
- **Post Interactions**: Users can like, comment, and share posts similar to Twitter.
- **Profile Customization**: Users can update their profiles with a bio, profile picture, and other details.
- **Real-time Notifications**: Users receive updates on interactions such as likes, comments, and follows.
- **Search and Explore**: Users can discover trending posts, hashtags, and accounts.
- **Cloud Hosting**: 
  - Backend hosted on a cloud platform.
  - Frontend deployed using Firebase Hosting.

## Technologies Used
- **Frontend**:
  - React.js
  - Redux (State Management)
  - Tailwind CSS (Styling)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
- **Authentication & Payments**:
  - Firebase Authentication
  - Stripe.js (Payment Gateway)
- **Hosting & Deployment**:
  - Firebase Hosting (Frontend)
  - Cloud-hosted backend

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- Firebase account (for authentication setup)
- Stripe account (for payments setup)

### Clone the Repository
```sh
git clone https://github.com/PiyushPb/Vichar-Twitter-inspired-application.git
cd Vichar-Twitter-inspired-application
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and configure the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_API_KEY=your_firebase_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## Usage
- Sign up or log in using Firebase authentication.
- Access premium features by upgrading via Stripe payments.
- Premium users can generate images from text inputs and share posts.
- Engage with posts similar to Twitter’s interaction model, including likes, comments, and shares.
- Customize your profile with a bio and profile picture.
- Receive real-time notifications for interactions.
- Explore trending content and hashtags.

## Screenshots
![Vichar_img1](https://github.com/user-attachments/assets/b9403a00-5086-4cd5-85d6-efdbd3f23111)
![Vichar_img2](https://github.com/user-attachments/assets/119ae811-911d-4b03-acc7-ef268c0612fc)
![Vichar_img3](https://github.com/user-attachments/assets/da495877-2dfa-4ecf-b630-70144728bd24)
![Vichar_img4](https://github.com/user-attachments/assets/34af2a15-fff5-47a1-a5c3-b6b706d668aa)


## Team Members
- **Piyush Pb** ([GitHub Profile](https://github.com/PiyushPb)) (Frontend & Backend)
- **Namrata Gaikwad** ([GitHub Profile](https://github.com/NamrataPb)) (ML model, Data analysis, Data cleaning, model training)

## Future Enhancements
- Implement direct messaging and group chats.
- Introduce AI-powered content moderation.
- Improve scalability with microservices architecture.
- Enhance recommendation algorithms for personalized content.

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to contribute or provide feedback on **Vichar**! 🚀
