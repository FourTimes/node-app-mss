FROM node:10
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 9981
RUN npm test
CMD ["node","app.js"]
