import { SiweMessage } from 'siwe'

import dbConnect from '../../../lib/dbConnect'
import NFT from '../../../models/nftSchema'

import { ethers } from "ethers"

import axios from 'axios'

import abiJOJO from '../../../jojoABI.json'
import { formatEther } from 'ethers/lib/utils.js'

const provider = new ethers.providers.EtherscanProvider('mainnet', 'ICCA4QY6AN344KZC952E4AEAHEV59NJC8P');
// const provider = new ethers.providers.EtherscanProvider();

const JOJO = '0x9278d95B79297e728ecF6F59dc0a6074c2e6Bf5a';
const contractJOJO = new ethers.Contract(JOJO, abiJOJO, provider);

// @ts-ignore
export default async function handler(req, res) {
    const { method } = req
    console.time("response-timer")
    switch (method) {
        case 'POST':
            try {
                if (false) {
                    try {
                        console.log("Reveal action start");

                        // Signature to ensure user is making tx based on his wallet
                        const signature = req.body.data.signature;
                        const message = req.body.data.message;
                        const siweMessage = new SiweMessage(message);

                        await siweMessage.validate(signature)

                        // Valid signature yields below

                        const userAddress = siweMessage.address;
                        const statement = siweMessage.statement;

                        console.log("Valid")

                        console.log(userAddress, statement)

                        var ownedTokens: any[] = []

                        try {

                            await contractJOJO.functions.tokensOfOwner(userAddress).then((result) => {
                                // @ts-ignore
                                ownedTokens = result[0].map((bigNum) => formatEther(bigNum as number) * (10 ** 18))
                                console.log(ownedTokens)
                            });

                        } catch (e) {

                            console.log("Error fetching tokens!", e)
                            return res.status(400).json({ success: false, error: "Error fetching tokens!" });

                        }

                        await dbConnect()
                        const reveals = statement?.split(",").map((num) => parseInt(num))

                        await reveals?.forEach(async (index) => {
                            try {

                                if (ownedTokens.includes(index)) {
                                    const nftToken = await NFT.findOne({
                                        id: index
                                    });

                                    if (nftToken) {
                                        nftToken.revealed = true;
                                        nftToken.save();
                                        console.log(`Successfully revealed #${index}`)
                                        // return res.status(400).json({ success: true })
                                    } else {
                                        const newNFT = await NFT.create({
                                            id: index,
                                            revealed: true,
                                        })
                                        console.log(`Successfully revealed #${index}`)
                                        // res.status(201).json({ success: true, data: newNFT })
                                    }
                                } else {
                                    console.log(`Error: User does not own #${index}`)
                                }

                            } catch (e) {
                                console.log(`Could not reveal #${index}`)
                            }
                        })

                        return res.status(201).json({ success: true, data: reveals });
                    } catch (e) {
                        console.log(e)
                        return res.status(400).json({ success: false, error: "Signature failed, please verify you are using the correct wallet" });
                    }
                }
            } catch (error) {
                res.status(400).json({ success: false })
            }
    }
    console.timeEnd("response-timer")
}