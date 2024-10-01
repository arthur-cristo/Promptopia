'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const TheirProfile = ({ params }) => {

    const router = useRouter();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({ username: '' });

    const fetchUser = async () => {
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) router.push('/404');
        const data = await response.json();
        setUser(data);
    }

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        if (!response.ok) router.push('/404');
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        if (params.id) {
            fetchPosts();
            fetchUser();
        }
    }, [params.id]);

    useEffect(() => {
        console.log(user.username);
        if (user.username) document.title = `${user.username}'s Profile - Promptopia`;
    }, [user.username]);

    return (
        <Profile
            name={`${user.username}'s`}
            desc={`Welcome to ${user.username}'s personalized profile page. Explore ${user.username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default TheirProfile