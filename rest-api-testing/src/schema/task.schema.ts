import { model, Schema } from 'mongoose';

type ITask = {
    title: string;
    description: string,
    completed: boolean
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: String,
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

export const Task = model<ITask>("Task", taskSchema);
