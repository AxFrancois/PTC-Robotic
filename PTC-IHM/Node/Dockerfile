FROM node:17.8

WORKDIR /serveur/src 

#COPY /Node/package*.json /serveur/src/

COPY /Node /serveur/

RUN npm install

WORKDIR /serveur/src 

ENV PORT=8080

EXPOSE 8080

CMD ["node", "websocket.js"]
