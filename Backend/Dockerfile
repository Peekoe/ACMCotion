# docker run -d -p 8000:8000 cotion-api
# docker build -t cotion-api .

FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
