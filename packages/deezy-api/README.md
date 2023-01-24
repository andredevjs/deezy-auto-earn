# Deezy API

This API exposes the config file, so that external clients can do updates on the service

## Routes

### Get config file

Returns config file.
If there is no config file, it will create one based on the sample-config file

```
GET /api/config;
```

### Patch

Partially updates config file

```
PATCH /api/config;
```
