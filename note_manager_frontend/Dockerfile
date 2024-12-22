FROM node:18-alpine
WORKDIR /note_manager_frontend/
COPY . /note_manager_frontend
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]