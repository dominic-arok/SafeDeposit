# SafeDeposit

Project Description

This web application lets users securely upload files, assign a password, and share a generated download links to others. After clicking on the link, user must enter the correct associated password to download the shared files.

This project was built using Node.js, Express.js, and MongoDB. It is deployed on Render.


Installation and Setup

1. Clone repository - 'git clone'

2. Install dependencies - 'npm install'

3. Set up environment variables - 'DATABASE_URL=<Your MongoDB Atlas connection string>' 'PORT=3000'

4. Run application - 'npm run devStart'

5. Visit link - http://localhost:3000


Usage

Upload A File:
    
1. Visit the link
2. Select a file to upload
3. Set a password for secure downloads or leave blank for no password
4. Click “Upload” 
5. You will receive a unique shareable link

Download A File:

1. Click on the shared link
2. Enter the correct password to initiate file download


Credit

Core backend functionality taught by Web Dev Simplified