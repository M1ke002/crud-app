FROM node:20-alpine

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

#script to wait for mysql docker image to be started 
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.1/wait /wait
RUN chmod +x /wait

CMD ["sh", "-c", "/wait && npm run dev"]