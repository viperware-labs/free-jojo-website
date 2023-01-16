import axios from 'axios';
import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'

// PNG

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

                    const hash = 'bafybeigotb4xwnspat6mtvdw34enzi6calfbvwdp22fnle4mcdsehyeela';
                    const response = await axios({
                        method: 'get',
                        url: `https://${hash}.ipfs.nftstorage.link/${id}.png`,
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
                    
                    // res.status(201).json({ success: true, data: newNFT })
                    // return res.status(201).json({ 
                    //     name: `${namePrefix}${id}`,
                    //     description: `${desc}`,
                    //     image: `ipfs://bafybeicc7d5alxt3ggsyzl4dm6ir4rsk576s2ffefbtmwcuhfnhqvdghhm/25.png`
                    //  })

                    const hash = 'bafybeicc7d5alxt3ggsyzl4dm6ir4rsk576s2ffefbtmwcuhfnhqvdghhm';
                    const response = await axios({
                        method: 'get',
                        url: `https://${hash}.ipfs.nftstorage.link/${id}.png`,
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
}