import admin from "firebase-admin";

async function decodeToken(req, res, next) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            console.log(decodeValue);
            if (decodeValue) {
                req.user = decodeValue;
                return next();
            }
            return res.json({ message: "Un authorized" })
        
        } catch (e) {
            return res.json({ message: "Invalid token" })
        }
}

    
export default { decodeToken };