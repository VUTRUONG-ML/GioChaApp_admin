import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Header.jsx
export default function Header() {
    const {logout} = useContext(AuthContext);
    const handleLogout = () => {
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmLogout) {
          logout();
        }
    };
    return (
        <div style={{
            height: 60,
            background: '#007bff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            fontWeight: 'bold',
        }}>
            <div>Admin Panel</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span>Admin</span>
                <button
                    style={{
                        padding: '6px 12px',
                        background: 'white',
                        color: '#007bff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                    }}
                    onClick={handleLogout}
                >
                Đăng xuất
                </button>
            </div>
        </div>
    );
}
  