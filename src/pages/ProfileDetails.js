import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProfileDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.getUserById(userId);
                setUser(res.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div className="container">
            <h1>{user.name}</h1>
            <p><strong>Email:</strong> {user.email}</p>
            {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
            {user.location && <p><strong>Location:</strong> {user.location}</p>}
            {user.skills?.length > 0 && (
                <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
            )}
            {user.githubUrl && (
                <p>
                    <strong>GitHub:</strong>{' '}
                    <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                        {user.githubUrl}
                    </a>
                </p>
            )}
        </div>
    );
};

export default ProfileDetails;
