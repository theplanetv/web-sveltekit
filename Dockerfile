FROM denoland/deno:alpine

WORKDIR /web-sveltekit

COPY . .

RUN deno install
RUN deno task build

CMD ["deno", "run", "preview", "--host", "0.0.0.0"]