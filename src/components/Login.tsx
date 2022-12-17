import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <button className="mt-4 min-h-[40px] h-auto w-full border-black border-[3px] bg-[#1DA1F2] text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                    onClick={() => signOut()} type="button">
                        <>
                            <div className="align-middle">
                                Connected: {session.user?.name}
                            </div>
                        </>
                    </button>
            </>
        )
    }
    return (
        <>            
            <button className="mt-4 h-10 w-full border-black border-[3px] bg-[#1DA1F2] text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                onClick={() => signIn()} type="button">
                    <>
                        <div className="align-middle">
                            Connect Twitter
                        </div>
                    </>
                </button>
        </>
    )
}