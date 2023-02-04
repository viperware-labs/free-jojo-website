import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'
import axios from 'axios'
import mongoose from 'mongoose'
import express from 'express'
import rateLimit from 'express-rate-limit'

const getKey = (request: express.Request, response: express.Response) => {
    let key = request.headers['x-real-ip'];
  
    if (key === undefined) {
      key = 'unknown';
    }
  
    console.log(key)
    return key;
  };

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // min * sec * ms (60 seconds)
    max: 5, // Amount per period
    message: 'Too many requests, please try again later',
    keyGenerator: (request, response) => (getKey(request, response) as string)
});

// REVEALED
import RevealedMetadata from '../metadata/metadata_revealed.json'
// UNREVEALED
import UnrevealedMetadata from '../metadata/metadata_unrevealed.json'

// @ts-ignore
export default async function handler(req: express.Request, res: express.Response) {
    rateLimiter(req, res, async () => {
        const {
            query: { id },
            method
        } = req

        console.log(id)

        const id_parsed = parseInt(id as string)

        // Spam Prevention
        // console.log(req.headers)

        // const blockedIPs = ['35.203.254.106']

        // const userAgent = req.headers['user-agent']
        // const realIP = req.headers['x-real-ip']
        // const forwardIP = req.headers['x-forwarded-for']
        // const vercelProxyIP = req.headers['x-vercel-proxied-for']
        // const vercelForwardIP = req.headers['x-vercel-forwarded-for']

        // if (blockedIPs.includes(realIP) || blockedIPs.includes(forwardIP) || blockedIPs.includes(vercelProxyIP) || blockedIPs.includes(vercelForwardIP)) {
        //     console.log("blocked")
        //     return res.status(400).json({ success: false, error: "Invalid endpoint" })
        // }

        // if (userAgent.contains('python') || userAgent.contains('axios')) {
        //     return res.status(400).json({ success: false, error: "Invalid endpoint" })
        // }

        // API
        const MAX_ID = 10000

        // const db = await dbConnect()
        // .then((data)=>{
        // })
        // .catch((e)=>{
        //     console.log(e)
        // })

        await dbConnect()

        switch (method) {
            case 'GET':
                try {
                    if (!Number.isInteger(id_parsed)) {
                        res.status(400).json({ success: false, error: "Invalid index" })
                    } else if (id_parsed < 1 || id_parsed > MAX_ID) {
                        res.status(400).json({ success: false, error: "Out of bounds" })
                    } else {
                        console.log("findone", id_parsed);
                        const nftToken = await NFT.findOne({
                            id: id_parsed,
                        });
                        console.log("findone finished", id_parsed);

                        if (nftToken) {
                            if (nftToken.revealed == true) {
                                console.log("found", id_parsed);
                                //@ts-ignore
                                const response = RevealedMetadata[id_parsed - 1];
                                res.json(response)
                                console.log("revealed", id_parsed);
                            } else {
                                console.log("found", id_parsed);
                                //@ts-ignore
                                const response = UnrevealedMetadata[id_parsed - 1];
                                res.json(response)
                                console.log("unrevealed", id_parsed);
                            }
                        } else {
                            console.log("notfound", id_parsed);

                            const newNFT = await NFT.create({
                                id: id_parsed,
                                revealed: false,
                            })
                            console.log("created", id_parsed);

                            //@ts-ignore
                            const response = UnrevealedMetadata[id_parsed - 1];
                            // console.log(response)
                            res.json(response)
                            console.log("unrevealed", id_parsed);
                        }
                    }

                } catch (error) {
                    console.log(error)
                    res.status(400).json({ success: false })
                }
                break
        }
        console.log(id_parsed)
    });
}