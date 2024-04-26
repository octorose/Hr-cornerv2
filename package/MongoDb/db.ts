import mongoose, { ConnectOptions } from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        } as ConnectOptions
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error: ', error);
    }
    };

export const db = mongoose.createConnection(process.env.MONGODB_URI as string, {

});

export default connect;