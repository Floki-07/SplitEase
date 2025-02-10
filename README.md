# SplitEase

### 💡 **Overview**
SplitEase is a powerful and user-friendly **money expense tracker** and **bill-splitting web app** that helps you manage all your financial needs in one place. Whether you're splitting expenses with friends, tracking your daily expenses, or managing group bills, SplitEase has you covered.

---

## 🚀 **Features**
- **Expense Tracking**: Keep a detailed record of your expenses.
- **Saving Goals**:  Create and track your savings goals effortlessly. Add money to your goal, monitor progress, and visualize your savings.
- **Bill Splitting**: Seamlessly divide bills among friends or groups.
- **Dashboard**: Get a bird's-eye view of all your financial activities.
- **Analytics**: Visualize your spending patterns with charts and insights.
- **Groups**: Manage shared expenses within groups effortlessly.
- **Secure Authentication**: Uses Google OAuth for seamless login.
- **Multiple login/Signup Options**:  Google OAuth or email/password login and signup.
---

## 🔧 **Tech Stack**
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: Google OAuth, Passport.js
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

---

## 🛠️ **Installation**
### 1️⃣ Clone the repository:
```bash
git clone https://github.com/Floki-07/SplitEase.git
cd SplitEase
```

### 2️⃣ Setup MongoDB Atlas
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Set up a new **cluster** and create a **database**.
3. Obtain the **MongoDB connection URI** and update it in the `.env` file.

### 3️⃣ Setup Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new **OAuth 2.0 Client ID**.
3. Configure redirect URIs (e.g., `http://localhost:5000/auth/google/callback`).
4. Add the credentials to the `.env` file.

### 4️⃣ Install dependencies
#### For the client:
```bash
cd client
npm install
```

#### For the server:
```bash
cd ../server
npm install
```

### 5️⃣ Start the application
#### Run the client:
```bash
cd client
npm start
```

#### Run the server:
```bash
cd ../server
npm start
```

---

## 🌍 **Environment Variables**
Create a `.env` file in the `server` directory and add the following:
```env
DB_URI=your_mongodb_atlas_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_session_secret
JWT_TIMEOUT=''

```

---

## 📌 **Folder Structure**
```
SplitEase/
│── client/          # Frontend React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
│── server/          # Backend Express.js API
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   ├── middleware/  # Middleware functions
│   ├── config/      # Configurations (OAuth, DB)
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🎯 **Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes (`git commit -m 'Added new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


---

### 🎉 **Happy Splitting!** 🎉
**"Built to simplify expenses, made to bring people together!"** 🚀** 🎉
