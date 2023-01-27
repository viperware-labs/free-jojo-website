import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'
import axios from 'axios'
import mongoose from 'mongoose'
import RevealedMetadata from './metadata_revealed.json'
import UnrevealedMetadata from './metadata_unrevealed.json'

// JSON
// 1- bafybeih36yohcqmefjpt4wygpfdlsoft6snmz6kbyfabavv4jbzd62qp2u
// 2- bafybeihy7dtlboqxweqmicx73pciqfra3j4p4amwjeuqqeb2q3xjwszzq4

// @ts-ignore
export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req
    const MAX_ID = 10
    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                if (!Number.isInteger(parseInt(id))) {
                    res.status(400).json({ success: false, error: "Invalid index" })
                } else if (id < 1 || id > MAX_ID) {
                    res.status(400).json({ success: false, error: "Out of bounds" })
                } else {
                    console.log("findone", id);
                    const nftToken = await NFT.findOne({
                        id: id,
                    });
                    console.log("findone finished", id);

                    if (nftToken) {
                        if (nftToken.revealed == true) {
                            console.log("found", id);
                            //@ts-ignore
                            const response = RevealedMetadata[id - 1];
                            res.json(response)
                            console.log("revealed", id);
                        } else {
                            console.log("found", id);
                            //@ts-ignore
                            const response = UnrevealedMetadata[id - 1];
                            res.json(response)
                            console.log("unrevealed", id);
                        }
                    } else {
                        console.log("notfound", id);

                        const newNFT = await NFT.create({
                            id: id,
                            revealed: false,
                        })
                        console.log("created", id);

                        //@ts-ignore
                        const response = UnrevealedMetadata[id - 1];
                        // console.log(response)
                        res.json(response)
                        console.log("unrevealed", id);
                    }
                }

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break
    }
    console.log(id)
}