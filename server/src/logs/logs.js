import { UserLogs } from './logsModel/logsModel.js';

const Logs = async (req, res, next) => {
    const userId = req.user ? req.user._id : null;
    const body = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const method = req.method;
    const url = req.url;
    const query = req.query;
    const headers = req.headers;
    const cookies = req.cookies;
    const host = req.headers.host;
    const protocol = req.protocol;
    const userAgent = req.headers['user-agent'];
    // const referrer = req.headers.referer || req.headers.referrer;

    // console.log('IP Address:', clientIp);
    // console.log('HTTP Method:', method);
    // console.log('Request URL:', url);
    // console.log('Query Parameters:', query);
    // console.log('Headers:', headers);
    // console.log('Cookies:', cookies);
    // console.log('Host:', host);
    // console.log('Protocol:', protocol);
    // console.log('User-Agent:', userAgent);
    // console.log('Referrer:', referrer);

    // Create a new UserLogs object
    const newLog = new UserLogs({
        method,
        url,
        data: body,
        userId,
        IpAddress: clientIp,
        userAgent,
        protocol,
        host,
        headers,
        url,
        method,
        query
    });

    // Save the log to the database
    newLog.save()
        .then(() => {
            // console.log('Request logged successfully');
            next(); // Move to the next middleware or route handler
        })
        .catch(err => {
            console.error('Error logging request:', err);
            next(err); // Pass the error to the error handling middleware
        });

}

export default Logs;



