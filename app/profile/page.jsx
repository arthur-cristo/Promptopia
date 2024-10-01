'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile';

const MyProfile = () => {

    const router = useRouter();

    const [posts, setPosts] = useState([])
    const { data: session } = useSession();

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        if (session?.user.id) {
            fetchPosts();
            document.title = `My Profile - Promptopia`;
        };
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
        const hasConfirm = confirm('Are you sure you want to delete this prompt?');

        if (hasConfirm) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter(p => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name='My'
            desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile