import { Link, useLocation } from 'react-router-dom';
export default function Sidebar() {
    const location = useLocation();
    const menus = [
        {name: 'Dashboard', path: '/admin/Dashboard'},
        {name: 'Users', path: '/admin/users'},
        {name: 'Foods', path: '/admin/foods'},
        {name: 'Orders', path: '/admin/orders'},
        {name: 'Categories', path: '/admin/categories'},
    ];
    return( 
        <div style={{ width: 200, background: '#eee',  padding: '16px 0', height: '100vh' }}>
            <ul style={{listStyle: 'none', padding:0}}>
                {menus.map((item) =>(
                    <li key={item.path} style={{marginBottom: 10}}>
                        <Link 
                            to={item.path}
                            style={{
                                padding: '8px 16px',
                                display: 'block',
                                background: location.pathname === item.path ? '#ccc' : 'transparent',
                                textDecoration: 'none',
                                color: '#333',
                            }}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
  