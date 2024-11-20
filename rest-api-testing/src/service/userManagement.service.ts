import express from 'express';

const app = express();
app.use(express.json());

type IUser = {
    id: number;
    name: string;
    age: number;
}

const users: IUser[] = [];

app.get('/users', (req, res) => {
    res.status(200).json(users);
})

app.post('/users', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: 'Both name and message are required.' });
        const user = { id: users.length + 1, name, age };
        users.push(user);
        res.status(201).json(user);
    }
})

export default app;