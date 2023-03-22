FROM denoland/deno:alpine-1.31.2

WORKDIR /app

COPY . .

ENTRYPOINT ["deno", "task", "start"]
