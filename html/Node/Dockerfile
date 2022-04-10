FROM node:17.8

WORKDIR /serveur/src/

COPY /Node/package*.json /serveur/

RUN npm install

COPY /Node /serveur/

ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]
