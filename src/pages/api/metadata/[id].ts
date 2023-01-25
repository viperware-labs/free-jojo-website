import axios from 'axios'
import fs from 'fs'
import * as path from 'path'

const revealHash = 'bafybeihy7dtlboqxweqmicx73pciqfra3j4p4amwjeuqqeb2q3xjwszzq4';

// @ts-ignore
export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
            try {
                // read the reveal.json file
                const revealData = fs.readFileSync(path.join(process.cwd(), 'api', 'reveal.json'))
                // check if the id key exists in the json file
                const jsonData = JSON.parse(revealData.toString());
                if (jsonData.hasOwnProperty(id)) {
                    // check if the value of id key is "true" or "false"
                    if (jsonData[id] === "true") {
                        const response = await axios({
                            method: 'get',
                            url: `https://${revealHash}.ipfs.nftstorage.link/${id}.json`,
                            responseType: 'arraybuffer'
                        });
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(Buffer.from(response.data))
                    } else {
                        res.status(400).json({ success: false, message: "Token is not revealed yet" })
                    }
                } else {
                    res.status(400).json({ success: false, message: "Invalid token id" })
                }
                // update the value of id key to "true"
                jsonData[id] = "true";
                // write the updated data to the reveal.json file
                fs.writeFileSync(path.join(process.cwd(), 'api', 'reveal.json'), JSON.stringify(jsonData));
                console.log("Saved")

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                // read the reveal.json file
                const revealData = fs.readFileSync(path.join(process.cwd(), 'api', 'reveal.json'));
                // check if the id key exists in the json file
                const jsonData = JSON.parse(revealData.toString());
                if (jsonData.hasOwnProperty(id)) {
                    // update the value of id key to "true"
                    jsonData[id] = "true";
                    // write the updated data to the reveal.json file
                    fs.writeFileSync(path.join(process.cwd(), 'api', 'reveal.json'), JSON.stringify(jsonData));
                    res.status(201).json({ success: true, message: "Token revealed successfully" })
                } else {
                    res.status(400).json({ success: false, message: "Invalid token id" })
                }

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
    }
}
