#**This project demonstrates the deployment of a microservice-based architecture using VirtualBox NAT Network for communication between two VMs:**

VM1: Hosts a Node.js API microservice that handles API requests.
VM2: Runs MongoDB in a Docker container to store and retrieve data.

##Project Architecture
VM1 (Node.js Microservice - API Server): Handles HTTP requests and interacts with MongoDB.
VM2 (MongoDB Database - Docker Container): Stores messages and processes API queries.
NAT Network in VirtualBox: Ensures communication between VMs.
Clients: API requests can be made from VM1, VM2, or an external system.

![image](https://github.com/user-attachments/assets/5565f626-4875-4f3f-9b6a-cdf6efc08e7e)


##Virtual Machine Setup (VirtualBox)
Download Virtualbox
Doenload UbuntuServer iso file in local machine
Create Two Ubuntu Server VMs:
VM1 (API Server)
VM2 (MongoDB Database Server)
Configure VirtualBox Network:
Set both VM1 and VM2 to use NAT Network (not NAT or Bridged Adapter).
VM1 configuration:
![image](https://github.com/user-attachments/assets/ef9da27a-733f-4d4e-a64f-5f0c400d5541)
VM2 configuration: same as VM1

##check whether the VMs can connect to the internet:
ping google.com

##check whether the two VMs can connect to each other:
1. ip a //to know the ip addresses of respective VMs
2. ping <VM2_IP> //from vm1
3. ping <VM1_IP> //from vm2

## Deploy MongoDB on VM2 (Docker)

Run these commands on VM2 to install and run MongoDB inside a Docker container:
1. sudo apt update && sudo apt install -y docker.io
2. docker pull mongo
3. docker run -d --name mongodb_container -p 27017:27017 mongo

Verify that MongoDB is running:
1. sudo docker ps

Access MongoDB shell:
1. sudo docker exec -it mongodb_container mongo

##Deploy the Node.js Microservice on VM1(assuming already having a microservice application uploaded on github)

Install Node.js & Clone Repository:
1. sudo apt update && sudo apt install -y nodejs npm git
2. git clone <your-github-repo-url>
3. cd <your-project-folder>
4. npm install

Update MongoDB Connection in server.js
1. const mongoURI = 'mongodb://<VM2-IP>:27017/testdb';

Start the Microservice:
node XYZ.js //replace XYZ with your actual .js file name

## API Endpoints

step-1:Start server and check GET and POST
1. node server.js &    //to run nodejs server in background
2. curl http://localhost:5000/    //to check if API is running
3. curl POST http://localhost:5000/add -H "Content-Type: application/json" -d '{"text": "Type any message"}'      //POST request of adding a messge
4. curl http://localhost:5000/messages  //GET request to show messages

step-2:Check MongoDB to see if the new message is stored
1. use testdb     // to go inside testdb
2. db.messages,find().pretty       //to show stored messages in mongo

step-3:To see if the API is accessible from any other cient(apart from local host)
1)curl http://ip of VM1:5000/messages











