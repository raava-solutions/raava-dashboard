# SSL Certificate Setup

This directory holds SSL certificates used by the nginx reverse proxy.

## Directory Structure

After setup, the `live/` subdirectory will contain:
- `fullchain.pem` - certificate chain
- `privkey.pem` - private key

## Option 1: Self-Signed Certificate (Development)

Generate a self-signed certificate for local/dev use:

```bash
./scripts/init-ssl.sh --self-signed
```

Or manually:

```bash
mkdir -p live
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout live/privkey.pem \
  -out live/fullchain.pem \
  -subj "/CN=localhost"
```

## Option 2: Let's Encrypt (Production)

Use the init script to obtain a real certificate:

```bash
./scripts/init-ssl.sh --letsencrypt --domain demo.raava.io --email admin@raava.io
```

This will:
1. Start nginx with a temporary self-signed cert
2. Run certbot to obtain the real certificate via HTTP-01 challenge
3. Reload nginx with the valid certificate

The certbot service in docker-compose will automatically renew certificates every 12 hours.

## Manual Let's Encrypt Setup

If you prefer to run certbot manually:

```bash
# Start the stack (nginx must be running for ACME challenge)
docker compose -f docker-compose.production.yml up -d nginx

# Request certificate
docker compose -f docker-compose.production.yml run --rm certbot \
  certonly --webroot --webroot-path=/var/www/certbot \
  --email admin@raava.io --agree-tos --no-eff-email \
  -d demo.raava.io

# Copy certs into the expected location.
# The certbot container mounts ./nginx/ssl as /etc/letsencrypt, so
# certs appear on the host at ./nginx/ssl/live/<domain>/. Copy them
# to the flat live/ directory that nginx reads from:
cp -L nginx/ssl/live/demo.raava.io/fullchain.pem nginx/ssl/live/fullchain.pem
cp -L nginx/ssl/live/demo.raava.io/privkey.pem nginx/ssl/live/privkey.pem

# Reload nginx
docker compose -f docker-compose.production.yml exec nginx nginx -s reload
```
