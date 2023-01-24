# deezy-auto-earn

Automatically open channels to deezy, push sats through, and earn

## Table Of Contents

- [Packages](#packages)
- [Deezy Service docs](packages/deezy-service/README.md)
- [Linting/verifying your Source Code](#lintingverifying-your-source-code)

### Packages

Each package has it's own responsability.
By making them separate allow us to publish this service into tools like umbrel in which as a good practice, it's element is it's own container, and they all interact together via docker-compose.

```
└ packages/
      └ deezy-service # Deamon that auto earns
        deezy-api # Api to interact with the deamon
        deezy-ui # UI that interacts with the API
```

### Linting/verifying your Source Code

You can check that your code is properly formatted and adheres to coding style by running:

To format all files run

```
npm run lint -ws
```
