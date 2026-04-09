const jwt = require('jsonwebtoken');


const verifyAccessToken = (req, res, next) => {
    // check token from header Authorization or cookie
    console.log('verifyAccessToken:::')
    let token;
    if (req.headers?.authorization?.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]
    else
        return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });

    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Your token has expired! Please log in again.' });
            } else {
                return res.status(401).json({ message: 'Invalid token. Please log in again!' });
            }
        }

        req.user = decoded;
        next();
    });
};

const isSuperAdmin = (req, res, next) => {
    if (!['superAdmin'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden' })
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (!['moderator', 'superAdmin'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden' })
    }
    next()
}

const isAssistant = (req, res, next) => {
    if (!['superAdmin', 'moderator', 'assistant'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden' })
    }
    next()
}

const isBroker = (req, res, next) => {
    if (!['superAdmin', 'moderator', 'assistant','broker'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden' })
    }
    next()
}

module.exports = {
    verifyAccessToken,
    isSuperAdmin,
    isAdmin,
    isAssistant,
    isBroker
}