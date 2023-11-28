
-------- To run the Custom Open AI chatbot application, follow these steps:----------

 
1. Extract the contents of the project ZIP file "CustomAIChatbot.rar" inside any directory of your choice (for example: C:\Projects\CustomAIChatbot)

2. Open the Node.js command prompt terminal and navigate to the directory C:\Projects\CustomAIChatbot\node-socket and run the following command 
    to install the required npm packages: npm install cors express openai multer socket.io
	
3. In order to upload a PDF file and generate the embedding data, run the following command: node embedding.js	

4. Open the internet browser (Google Chrome) and enter URL: http://localhost:8080/fileupload  
 
5. Browse PDF file of your choice and click on the Submit button in order to generate the embeddings of the selected PDF file.

6. The embedding data will be stored in a csv file format in the following folder (..\node-socket\embeddedData)

7. A copy of the uploaded PDF file is also stored in the following folder (..\node-socket\sourceData)

8. Now Open a new Node.js command prompt terminal window, navigate to directory directory C:\Projects\CustomAIChatbot\node-socket

9. Start the backend server by running the command: node index.js

10. Open a new Node.js command prompt terminal window, navigate to the frontend project directory C:\Projects\CustomAIChatbot\react-socket and run the following 
   command to install the necessary npm packages:  npm install react react-dom react-scripts web-vitals socket.io-client
	
11. Start the frontend server by running the command: npm start

12. A chatbot window will open in the internet browser window on server http://localhost:3000

13. Enter your query in the chatbox and click on SEND button. The query should be related to the data present inside the supplied PDF file.

14. The Chatbot will provide a reply based on the query.

15. If the AI agent does not find any relevant answer for the query given by user, it will answer: I don't know!!

16. Please refer the following link for the demo video. https://drive.google.com/file/d/1fbS0x-d74ascUhqF837ouRQXEOd_Vpgi/view?usp=drive_link


Additional NOTE: 
	  a) The Custom AI Chatbot runs on server http://localhost:3000
          b) The PDF file upload using a webpage and embedding of the file is performed on server http://localhost:8080/fileupload 
	  c) The OPEN AI Key is stored at this path (..CustomAIChatbot\node-socket\utils\helper.js
	  d) Embedding data is generated at following path (..CustomAIChatbot\node-socket\embeddedData)
	  e) DEMO VIDEO LINK: https://drive.google.com/file/d/1fbS0x-d74ascUhqF837ouRQXEOd_Vpgi/view?usp=drive_link
   