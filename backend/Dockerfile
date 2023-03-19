
# node is the image we are starting from. 
# node is base on another image layer. Eg - Debian linux
FROM node:alpine

# Create app directory - directory to hold the application code inside the image
# Default location for all subsequent commands
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

# Installing the node.js dependency 
RUN npm  ci

# Bundle app source
#  COPY ["<src>", "<dest>"]
# COPY ["<src1>", "<src2>",..., "<dest>"].
COPY . .

# Makes sure port 8080 is available to the outside world (outside the container)
EXPOSE 5000

# Start application inside contatiner 

CMD [ "npm", "start" ]