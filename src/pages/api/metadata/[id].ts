import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'
import axios from 'axios'

// JSON

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
                    // return res.status(200).json({ success: false })
                    // return res.status(200).json({
                    //     name: `${namePrefix}${id}`,
                    //     description: `${desc}`,
                    // })

                    const hash = 'bafybeih36yohcqmefjpt4wygpfdlsoft6snmz6kbyfabavv4jbzd62qp2u';
                    const response = await axios({
                        method: 'get',
                        url: `https://${hash}.ipfs.nftstorage.link/${id}.json`,
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
                    
                    // res.status(201).json({ success: true, data: newNFT })
                    // return res.status(201).json({ 
                    //     name: `${namePrefix}${id}`,
                    //     description: `${desc}`,
                    //     image: `ipfs://bafybeicc7d5alxt3ggsyzl4dm6ir4rsk576s2ffefbtmwcuhfnhqvdghhm/25.png`
                    //  })

                    const hash = 'bafybeigwo7pld3klqxk2z3sx5ev4435ro4prbkrhsyzlnvc7ic2drcl24y';
                    const response = await axios({
                        method: 'get',
                        url: `https://${hash}.ipfs.nftstorage.link/${id}.json`,
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