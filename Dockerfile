FROM node:16.16.0

WORKDIR /src

COPY ./ /src

RUN npm install
RUN npm run postcss
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--host"]