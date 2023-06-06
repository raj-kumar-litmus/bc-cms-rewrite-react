FROM node:16.16.0

WORKDIR /src

COPY ./ /src

RUN npm install
RUN npm run postcss

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]