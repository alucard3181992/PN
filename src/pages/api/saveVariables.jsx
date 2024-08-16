// pages/api/saveVariables.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { updatedVariables } = req.body;

        const filePath = path.join(process.cwd(), 'src', 'styles', 'variables.json');
        fs.writeFileSync(filePath, JSON.stringify(updatedVariables, null, 2));

        res.status(200).json({ message: 'Variables saved successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
