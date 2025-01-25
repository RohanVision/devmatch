
const authetication = (req, res, next) => {
    console.log('Admin Auth is getting checked');
    const token = 'xxx';
    const isAdminAuthorize = token === 'xyz';
    if (!isAdminAuthorize) {
        res.status(401).send('Admin is not authorize')
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log('user auth checking');
    const token = 'xyx';
    const isUserAuthorize = token === 'xyz';
    if (!isUserAuthorize) {
        res.status(401).send('User is not authorize');
    } else {
        next();
    }
}

module.exports = {
    authetication,
    userAuth
}