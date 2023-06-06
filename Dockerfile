FROM node:16.16.0

WORKDIR /src

COPY ./ /src

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]