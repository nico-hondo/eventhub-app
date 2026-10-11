# Stage 1: Build aplikasi React/Vite
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve menggunakan Nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# Stage 1: Build aplikasi
# FROM node:20-alpine AS builder

# WORKDIR /app

# # Copy dependency manifest
# COPY package*.json ./

# # Install dependencies 
# RUN npm ci

# # Copy source code dan build
# COPY . .
# RUN npm run build

# # Stage 2: Serve dengan Nginx
# FROM nginx:alpine

# # Copy hasil build ke root html bawaan Nginx
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Copy konfigurasi Nginx agar React Router tidak 404 saat di-refresh
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# LABEL org.opencontainers.image.source="https://github.com/habibmrizki/Koda-b9-EventHub"

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]