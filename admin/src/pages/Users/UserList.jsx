import { useState, useEffect } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fakeUsers = [
            { id: 1, name: 'Nam', email: 'nam@gmail.com', role: 'admin' },
            { id: 2, name: 'An', email: 'an@gmail.com', role: 'user' },
            { id: 3, name: 'Linh', email: 'linh@gmail.com', role: 'user' },
        ];
        setUsers(fakeUsers);
    }, []);
    return (
        <div>
            <h1>Danh sách người dùng</h1>
            <table border="1" cellPadding={10} style={{ marginTop: 16, width: '100%' }}>
                <thead>
                    <tr style={{background: '#f0f0f0'}}>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
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
  