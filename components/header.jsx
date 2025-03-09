import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import { FolderOpen, PenBox } from 'lucide-react'
import Usermenu from './ui/usermenu'

function header() {
    return (
        <header className="container mx-auto">
            <nav className='py-6 px-4 flex justify-between items-center'>
                <Link href="/">
                    <Image src={"/logo.png"} 
                    alt='logo' 
                    width={200} 
                    height={60}
                        className='h-10 w-auto object-contain'
                    />
                </Link>

                <div className="flex items-center gap-4">
                    <SignedIn>
                        <Link href="/dashboard#collection">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FolderOpen size={18} />
                            <span className="hidden md:inline">Collections</span>
                        </Button>
                        </Link>
                    </SignedIn>

                    <Link href="/journal/write">
                        <Button variant="journal" className="flex items-center gap-2">
                            <PenBox size={18} />
                            <span className="hidden md:inline">Write New</span>
                        </Button>
                    </Link>

                    <SignedOut>
                        <SignInButton forceRedirectUrl='/dashboard'>
                            <Button variant="outline">Login</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Usermenu/>
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default header