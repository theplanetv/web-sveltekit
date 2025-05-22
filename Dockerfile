FROM node:24-alpine

WORKDIR /web-sveltekit

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
