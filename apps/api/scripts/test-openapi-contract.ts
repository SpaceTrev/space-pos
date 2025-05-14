/**
 * This script can be extended to validate your OpenAPI spec against real responses.
 * You can also use Dredd, Prism, or a Zod + OpenAPI bridge for contract tests.
 */

import fs from 'fs';

const openapi = fs.readFileSync('./openapi.yaml', 'utf-8');
console.log('✅ OpenAPI spec loaded. Add integration contract checks here.');