FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-angular

# Copy nginx configuration
COPY ./.github/default.conf /etc/nginx/conf.d/default.conf

# Copy docs
COPY ./dist/docs/browser /usr/share/nginx/html

USER root

# Add configuration for ngssc
RUN echo '{"variant":"global","environmentVariables":["LEGACY_VERSIONS"],"filePattern":"index.html"}' > /usr/share/nginx/html/ngssc.json

# Add write permission for random user for the index.html
RUN chmod a+w /usr/share/nginx/html/index.html

# Install ngssc binary
ADD https://github.com/kyubisation/angular-server-side-configuration/releases/download/v22.0.0/ngssc_64bit /usr/sbin/ngssc
RUN chmod +x /usr/sbin/ngssc

# Copy insert key script and assign execute permission
COPY ./scripts/ngssc.sh /docker-entrypoint.d/ngssc.sh
RUN chmod +x /docker-entrypoint.d/ngssc.sh

RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types

USER $UID
