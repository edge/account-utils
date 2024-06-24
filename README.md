<img src="https://cdn.edge.network/assets/img/edge-logo-green.svg" width="200">

# account-utils

Utility library for Account API.

> :warning: This library is still in active development and testing, and `v0.*` releases may change in a backward-incompatible way.

## System Requirements

- Node.js v20

## Usage

Install the package:

```sh
npm i @edge/account-utils
```

You can now use the functions and types exported to build your Account API integration. For example:

```ts
import * as utils from '@edge/account-utils'

utils.err(utils.createServer('https://api.account.edge.network', 'my token', {
  account: 'my account number',
  region: 'my region ID',
  settings: {
    domain: 'my-domain-name.com',
    os: {
      id: 0
    },
    password: 'my password'
  },
  spec: {
    bandwidth: 100, // Mbps
    cpus: 2,
    disk: 20480, // MiB
    ram: 4096 // MiB
  }
}))
  .then(res => {
    console.log('OK', res)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
```

## Documentation

Documentation is presently limited - see [edge/account-utils#3](https://github.com/edge/account-utils/issues/3)

For now, you can read through scripts in [lib](./lib) for a complete overview of all package exports. You can also use your preferred autocomplete tool (such as Intellisense) to browse this package's code.

## Contributing

Interested in contributing to the project? Amazing! Before you do, please have a quick look at our [Contributor Guidelines](CONTRIBUTING.md) where we've got a few tips to help you get started.

## License

Edge is the infrastructure of Web3. A peer-to-peer network and blockchain providing high performance decentralised web services, powered by the spare capacity all around us.

Copyright notice
(C) 2024 Edge Network Technologies Limited <support@edge.network><br />
All rights reserved

This product is part of Edge.
Edge is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version ("the GPL").

**If you wish to use Edge outside the scope of the GPL, please contact us at licensing@edge.network for details of alternative license arrangements.**

**This product may be distributed alongside other components available under different licenses (which may not be GPL). See those components themselves, or the documentation accompanying them, to determine what licenses are applicable.**

Edge is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

The GNU General Public License (GPL) is available at: https://www.gnu.org/licenses/gpl-3.0.en.html<br />
A copy can be found in the file GPL.md distributed with
these files.

This copyright notice MUST APPEAR in all copies of the product!
