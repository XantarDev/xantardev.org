FROM ruby:3.3-slim

WORKDIR /site
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential git nodejs \
  && rm -rf /var/lib/apt/lists/*

COPY Gemfile ./
RUN bundle install

EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload", "--force_polling"]
