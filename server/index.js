import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { connectToMongoDB } from './src/connections/mongodbconnection.js'
import userRouter from './src/modules/users/routes/userRoutes.js';
import themeRouter from './src/modules/theme/routes/themeRoutes.js';
import blogRouter from './src/modules/blogs/routes/blogRoutes.js';
import adminRouter from './src/modules/admin/routes/adminRoutes.js';
import notificationRouter from './src/modules/notification/routes/notificationRoutes.js';
import mailRouter from './src/modules/mails/routes/mailsRoutes.js';
import { authMiddleware } from './src/GlobalMiddlewares/tokenVerification.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const app = express();
const corsOptions = {
    origin: 'https://blogs-160e.onrender.com/',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
dotenv.config();
let PORT = process.env.PORT;

// Create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client_dirname = path.resolve();

app.use('/data', express.static(path.join(__dirname, 'data')));

// Create directories if they don't exist
const imagesDir = path.join(__dirname, 'data/images');
const videosDir = path.join(__dirname, 'data/videos');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}

// Save file function
function saveFile(buffer, mimeType) {
    const fileExtension = mimeType.split('/')[1];
    const fileName = `${uuidv4()}.${fileExtension}`;
    let filePath;

    if (mimeType.startsWith('image/')) {
        filePath = path.join(imagesDir, fileName);
    } else if (mimeType.startsWith('video/')) {
        filePath = path.join(videosDir, fileName);
    } else {
        throw new Error('Unsupported file type');
    }

    fs.writeFileSync(filePath, buffer);
    return `/data/${mimeType.startsWith('image/') ? 'images' : 'videos'}/${fileName}`;
}

app.post('/upload', (req, res) => {
    let data = [];
    req.on('data', chunk => {
        data.push(chunk);
    }).on('end', () => {
        const buffer = Buffer.concat(data);
        const mimeType = req.headers['content-type'];

        try {
            const fileUrl = saveFile(buffer, mimeType);
            res.json({ fileUrl });
        } catch (error) {
            res.status(400).send('Error saving file: ' + error.message);
        }
    });
});

app.use('/users', userRouter);
app.use('/blogs', authMiddleware, blogRouter);
app.use('/theme', authMiddleware, themeRouter);
app.use('/mail', authMiddleware, mailRouter);
app.use('/notification', authMiddleware, notificationRouter);
app.use('/admin', authMiddleware, adminRouter);

// app.get('/', (req, res) => {
//     res.status(200).send('MERN BLOG SERVER START');
// });

app.use(express.static(path.join(client_dirname,"/client/dist")))

app.get('*',(_,res)=>{
    res.sendFile(path.resolve(client_dirname,"client","dist","index.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Server is running https://blogs-160e.onrender.com/`);
    connectToMongoDB();
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});



