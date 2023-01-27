// const { NFTStorage, File, Blob } = require('nft.storage');

// const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczOTZCYzI5QTJjNmQ4NDA3MjIyYzEzNGE0NDI5NmVFZTFEQmQyMjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDYyOTI3MTQ0OCwibmFtZSI6Ikpvc2ggTWV0YWRhdGEgVXBsb2FkZXIifQ.HN6xqxhsARlLpS4Ny4_br0isa5HZuGyKl_oUGz35aHI'
// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

// const image = new Blob('./test.jpg');

// // const file = new File(image, './test.jpg');
// const imageFile = new File([ someBinaryImageData ], 'nft.png', { type: 'image/png' })


// client.storeBlob(file)
//     .then(cid => {
//         console.log(cid);
//     })
//     .catch(error => {
//         console.log(error);
//     });


// const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczOTZCYzI5QTJjNmQ4NDA3MjIyYzEzNGE0NDI5NmVFZTFEQmQyMjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDYyOTI3MTQ0OCwibmFtZSI6Ikpvc2ggTWV0YWRhdGEgVXBsb2FkZXIifQ.HN6xqxhsARlLpS4Ny4_br0isa5HZuGyKl_oUGz35aHI'
const MORALIS_KEY = 'Ek50gwOZTTqBZc8lSuQnZYjAnLQ6R6YJGcFXdLR8V1glK0VovSmxKJ3UGdG3fTgj'

const Moralis = require("moralis").default;
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var output = []

async function uploadSingleFolder(file, filePath) {
    let uploadArray = []

    let fileData = fs.readFileSync(filePath, { encoding: 'base64' })
    uploadArray.push({ path: file, content: fileData })

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    })

    console.log(response.result[0].path)
    return response.result[0].path
}

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: MORALIS_KEY,
    })

    const folderPath = './images/'
    const files = fs.readdirSync(folderPath)

    // for (const file of files) {
    //     let filePath = folderPath + file
    //     console.log(filePath)
    //     let _path = await uploadSingleFolder(file, filePath)

    //     console.log("Uploaded:", file)
    //     console.log("Path:", _path)

    //     output.push(_path)
    // }

    for (let i = 8171; i <= 10000; i++) {
        let filePath = `${folderPath}${i}.png`
        let file = `${i}.png`
        console.log(filePath)
        let _path = await uploadSingleFolder(file, filePath)

        console.log("Uploaded:", file)
        console.log("Path:", _path)

        output.push(_path)

        if (i % 10 == 0) {
            console.log("Saving file at spot ", i)
            const csvWriter = createCsvWriter({
                path: 'output.csv',
                header: [
                    { id: 'path', title: 'Path' },
                ]
            });

            const records = output.map(path => {
                return { path }
            });

            csvWriter.writeRecords(records)
                .then(() => {
                    console.log('File saved successfully');
                });

            console.log();
        }
    }
}

async function main() {
    await uploadToIpfs()

    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: [
            { id: 'path', title: 'Path' },
        ]
    });

    const records = output.map(path => {
        return { path }
    });

    csvWriter.writeRecords(records)
        .then(() => {
            console.log('File saved successfully');
        });
}

main()