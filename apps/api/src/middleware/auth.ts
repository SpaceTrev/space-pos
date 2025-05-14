import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Replace with your AWS region and Cognito User Pool ID
const region = 'us-east-1';
const userPoolId = 'us-east-1_XXXXXXXXX'; // TODO: Replace with actual User Pool ID

const client = jwksClient({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, getKey, {
    issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    algorithms: ['RS256']
  }, (err, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}