import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'
import axios from 'axios';
import mongoose from 'mongoose';

// PNG
// 1- bafybeigotb4xwnspat6mtvdw34enzi6calfbvwdp22fnle4mcdsehyeela
// 2- bafybeiekqvrbi2qxcac4mqnnps2q42f4wxzqvoqpkjislrr3tgakkfvgz4

const revealHash = 'bafybeiekqvrbi2qxcac4mqnnps2q42f4wxzqvoqpkjislrr3tgakkfvgz4';

// @ts-ignore
export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req

    await dbConnect()
    switch (method) {
        case 'GET':
            try {

                const nftToken = await NFT.findOne({
                    id: id,
                });

                if (nftToken) {
                    const response = await axios({
                        method: 'get',
                        url: `https://${revealHash}.ipfs.nftstorage.link/${id}.png`,
                        responseType: 'arraybuffer'
                    });
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(Buffer.from(response.data))
                    console.log("stop", id);
                } else {
                    const newNFT = await NFT.create({
                        id: id,
                        revealed: req.query.revealed,
                    })

                    const response = await axios({
                        method: 'get',
                        url: `https://${revealHash}.ipfs.nftstorage.link/${id}.png`,
                        responseType: 'arraybuffer'
                    });
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(Buffer.from(response.data))
                    console.log("stop", id);
                }
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
    }
    // Close the connection after the response is sent
    mongoose.connection.close();
}