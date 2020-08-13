FROM node:14

WORKDIR /usr/app

# copying package json file
COPY package*.json ./

# install node 
RUN npm install

COPY src/ ./src
EXPOSE 4999

CMD [ "node", "src/index.js" ]