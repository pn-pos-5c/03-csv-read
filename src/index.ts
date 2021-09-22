import * as fs from 'fs';
import { Sale } from './models/Sale';

const path = process.argv[2];

let file: string;
try {
    file = fs.readFileSync(path, 'utf-8');
} catch (e) {
    console.error('Missing or invalid file path');
    process.exit(-1);
}

const lines = file.split('\n');

let revenues: Map<number, number> = new Map<number, number>();

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const saleEntry: Sale = {
        id: +line[0],
        customerId: +line[1],
        product: line[2],
        date: line[3],
        revenue: +line[4]
    };

    const prev = revenues.get(saleEntry.customerId) || 0;
    revenues.set(saleEntry.customerId, prev + saleEntry.revenue);
}

revenues = new Map([...revenues.entries()].sort((a, b) => a[0] - b[0]));

console.log('\n| customerid |    revenue |');
console.log('|------------|------------|');

for (const revenue of revenues) {
    console.log(`| ${revenue[0]}         |      ${revenue[1].toFixed(1)} |`);
}
