import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'
import axios from 'axios'

// JSON
// 1- bafybeih36yohcqmefjpt4wygpfdlsoft6snmz6kbyfabavv4jbzd62qp2u
// 2- bafybeihy7dtlboqxweqmicx73pciqfra3j4p4amwjeuqqeb2q3xjwszzq4

const revealHash = 'bafybeihy7dtlboqxweqmicx73pciqfra3j4p4amwjeuqqeb2q3xjwszzq4';

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
                        url: `https://${revealHash}.ipfs.nftstorage.link/${id}.json`,
                        responseType: 'arraybuffer'
                    });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(Buffer.from(response.data))
                    console.log("stop", id);
                } else {
                    const newNFT = await NFT.create({
                        id: id,
                        revealed: req.query.revealed,
                    })
                    
                    const response = await axios({
                        method: 'get',
                        url: `https://${revealHash}.ipfs.nftstorage.link/${id}.json`,
                        responseType: 'arraybuffer'
                    });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(Buffer.from(response.data))
                    console.log("stop", id);
                }

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {

                const nftToken = await NFT.findOne({
                    id: req.query.id
                });

                if (nftToken) {
                    return res.status(400).json({ success: false })
                } else {
                    const newNFT = await NFT.create({
                        id: req.query.wallet,
                        revealed: req.query.id,
                    })
                    res.status(201).json({ success: true, data: newNFT })
                }



            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
    }
}