import { readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { basename, relative, resolve } from 'path';
import { format } from 'prettier';

const prettierOptions = JSON.parse(readFileSync(resolve(__dirname, '../.prettierrc'), 'utf-8'));

const titleCase = (word: string): string => word[0].toUpperCase() + word.slice(1);

function generateEntities(): string {
  const schemaFiles = globSync('src/components/*/infrastructure/schemas/*.ts');

  const header: string[] = [`// Created by ${relative(process.cwd(), __filename)} - DO NOT EDIT`, ''];
  const schemas: string[] = [];

  schemaFiles.forEach((schemaFile) => {
    const name = basename(schemaFile, '.ts');
    const importPath = schemaFile.slice(schemaFile.indexOf('/') + 1, schemaFile.lastIndexOf('.'));
    const schemaName = `${titleCase(name)}Schema`;
    schemas.push(`${schemaName},`);
    header.push(`import { ${schemaName} } from '../../${importPath}';`);
  });

  const code = header
    .concat('')
    .concat('export const entities = [')
    .concat(schemas)
    .concat('];')
    .join('\n');

  return format(code, prettierOptions);
}

writeFileSync(resolve(__dirname, '../src/infrastructure/database/entities.ts'), generateEntities(), 'utf-8');
