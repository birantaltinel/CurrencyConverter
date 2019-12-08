FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 3100
CMD [ "npm", "run", "start" ]