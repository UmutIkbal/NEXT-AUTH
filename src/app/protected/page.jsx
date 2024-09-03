import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <div>
            <div>
                its protected
            </div>
            <div>
                <Link href="/protected/dashboard">dashboard</Link>
            </div>
        </div>

    )
}

export default page