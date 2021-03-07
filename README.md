# [pgwait](https://github.com/sbmelvin/pgwait/)
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]

Pauses execution of a Node.js application until a PostgreSQL connection becomes available.

## Installing
```bash
npm i pgwait
```

## Usage
```TypeScript
import pgwait from 'pgwait'

await pgwait({
    host: 'localhost',      // PostgreSQL hostname or IP address.
    port: 5432,             // PostgreSQL port number.
    database: 'pgwait',     // PostgreSQL database. If omitted, PostgreSQL defaults to the username.
    user: 'postgres',       // PostgreSQL username.
    password: 'postgres',   // PostgreSQL password if the server requires authentication.
    retry: 2                // The retry interval in seconds.
})
```
Note: `pgwait` uses `node-postgres` under the hood. PostgreSQL environment variables will be used for undefined connection options.  

## License

Copyright (c) 2021 Stephen B. Melvin Jr (<stephenbmelvin@gmail.com>)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/pgwait
[npm-version-image]: https://img.shields.io/npm/v/pgwait.svg?style=flat

[npm-downloads-image]: https://img.shields.io/npm/dm/pgwait.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/pgwait?minimal=true
