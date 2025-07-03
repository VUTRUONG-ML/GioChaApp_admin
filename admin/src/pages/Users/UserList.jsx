import { useState, useEffect, useContext } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { AuthContext } from '../../contexts/AuthContext';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const {token} = useContext(AuthContext);
    useEffect(() => {
        fetch("http://localhost:5000/api/auth",{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.users){
                    const formattedUsers = data.users.map((u, index) => ({
                        id: index + 1,
                        name: u.userName,
                        email: u.email,
                        role: u.isAdmin ? "admin" : "user"
                    }));
                    setUsers(formattedUsers);
                } else{
                    console.warn("Không tồn tại dữ liệu users!");
                }
            })
            .catch((err) => {
                console.error("Lỗi:", err);
            });
    }, []);
    return (
        <div>
            <h1>Danh sách người dùng</h1>
            <table border="1" cellPadding={10} style={{ marginTop: 16, width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{background: '#f0f0f0'}}>
                        <th style={{ border: '1px solid black', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Tên</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Vai trò</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{u.id}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{u.name}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{u.email}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{u.role}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>
                                <div style={{display: 'flex',justifyContent:"space-between"}}>
                                    <button ><FaUserEdit size={20} color="blue" /></button>
                                    <button ><TiUserDelete size={20} color="black"/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
  