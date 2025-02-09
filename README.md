# This project demonstrates the deployment of a microservice-based architecture using VirtualBox NAT Network for communication between two VMs:

VM1: Hosts a Node.js API microservice that handles API requests.  
VM2: Runs MongoDB in a Docker container to store and retrieve data.

## Project Architecture

- **VM1 (Node.js Microservice - API Server):** Handles HTTP requests and interacts with MongoDB.  
- **VM2 (MongoDB Database - Docker Container):** Stores messages and processes API queries.  
- **NAT Network in VirtualBox:** Ensures communication between VMs.  
- **Clients:** API requests can be made from VM1, VM2, or an external system.  

![image](https://github.com/user-attachments/assets/5565f626-4875-4f3f-9b6a-cdf6efc08e7e)

## Virtual Machine Setup (VirtualBox)

- Download VirtualBox  
- Download Ubuntu Server ISO file in the local machine  

### Create Two Ubuntu Server VMs:
- **VM1:** API Server  
- **VM2:** MongoDB Database Server  

### Configure VirtualBox Network:
- Set both **VM1** and **VM2** to use **NAT Network** (not NAT or Bridged Adapter).  
- **VM1 configuration:**  
  ![image](https://github.com/user-attachments/assets/ef9da27a-733f-4d4e-a64f-5f0c400d5541)  
- **VM2 configuration:** Same as VM1.  

## Check whether the VMs can connect to the internet:
```sh
ping google.com
```

## Check whether the two VMs can connect to each other:
```sh
ip a  # To know the IP addresses of respective VMs
ping <VM2_IP>  # From VM1
ping <VM1_IP>  # From VM2
```

## Deploy MongoDB on VM2 (Docker)

Run these commands on VM2 to install and run MongoDB inside a Docker container:
```sh
sudo apt update && sudo apt install -y docker.io
docker pull mongo
docker run -d --name mongodb_container -p 27017:27017 mongo
```

### Verify that MongoDB is running:
```sh
sudo docker ps
```

### Access MongoDB shell:
```sh
sudo docker exec -it mongodb_container mongo
```

## Deploy the Node.js Microservice on VM1 (assuming already having a microservice application uploaded on GitHub)

### Install Node.js & Clone Repository:
```sh
sudo apt update && sudo apt install -y nodejs npm git
git clone <your-github-repo-url>
cd <your-project-folder>
npm install
```

### Update MongoDB Connection in `server.js`
```js
const mongoURI = 'mongodb://<VM2-IP>:27017/testdb';
```

### Start the Microservice:
```sh
node XYZ.js  # Replace XYZ with your actual .js file name
```

## API Endpoints

### Step 1: Start Server and Check GET and POST
```sh
node server.js &  # To run Node.js server in background
curl http://localhost:5000/  # To check if API is running
curl -X POST http://localhost:5000/add -H "Content-Type: application/json" -d '{"text": "Type any message"}'  # POST request to add a message
curl http://localhost:5000/messages  # GET request to show messages
```

### Step 2: Check MongoDB to see if the new message is stored
```sh
use testdb  # To go inside testdb
db.messages.find().pretty()  # To show stored messages in MongoDB
```

### Step 3: To see if the API is accessible from any other client (apart from localhost)
```sh
curl http://<VM1-IP>:5000/messages
```











