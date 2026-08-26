FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-angular

# Copy nginx configuration
COPY ./.github/default.conf /etc/nginx/conf.d/default.conf

# Copy docs
COPY ./dist/docs/browser /usr/share/nginx/html

USER root

# Copy insert key script and assign execute permission
COPY ./scripts/ngssc.sh /docker-entrypoint.d/ngssc.sh

# ngssc requires write permission for html and ngsw.json files
# If your html file is not index.html, change it accordingly
RUN find /usr/share/nginx/html -name "index.html" -exec chmod a+w {} \; && \
    # Add configuration for ngssc
    echo '{"variant":"global","environmentVariables":["LEGACY_VERSIONS"],"filePattern":"index.html"}' > /usr/share/nginx/html/ngssc.json && \
    # Create the csp.js inline
    echo "export default { nonce: () => crypto.randomUUID() };" > /etc/nginx/csp.js && \
    sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types && \
    sed -i 's#events {#load_module modules/ngx_http_js_module.so;\nevents {#' /etc/nginx/nginx.conf && \
    # Validate the nginx configuration
    nginx -t

# Download ngssc binary
ADD --chmod=555 https://github.com/kyubisation/angular-server-side-configuration/releases/download/v22.0.2/ngssc_amd64 /usr/sbin/ngssc

USER $UID
