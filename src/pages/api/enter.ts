import dbConnect from '../../lib/dbConnect'
import User from '../../models/userSchema'

// @ts-ignore
export default async function handler(req, res) {
    const { method } = req
    await dbConnect()
    switch (method) {
        case 'POST':
            try {
              
                const authorisation = req.headers.authorization
                if (!authorisation) return res.status(401).json({ success: false, message: 'No authorisation' })

                if (authorisation !== process.env.NEXT_PUBLIC_API_KEY) return res.status(401).json({ success: false, message: 'Invalid authorisation' } )

                const user = await User.findOne({
                    wallet: req.query.wallet
                });
                
                

                if (user) { 
                    return res.status(400).json({ success: false })
                } else {
                    const newUser = await User.create({
                        wallet: req.query.wallet,
                        twitterUsername: req.query.twitter

                    })
                    res.status(201).json({ success: true, data: newUser })
                } 



            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
    }
}