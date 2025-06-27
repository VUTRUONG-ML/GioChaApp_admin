import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

// Trang cần hiển thị
import DashboardPage from '../pages/Dashboard/DashboardPage';
import UserList from '../pages/Users/UserList';
import FoodList from '../pages/Foods/FoodList';
import OrderList from '../pages/Orders/OrderList';
import CategoryList from '../pages/Categories/CategoryList';

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="users" element={<UserList />} />
    <Route path="foods" element={<FoodList />} />
    <Route path="orders" element={<OrderList />} />
    <Route path="categories" element={<CategoryList />} />
  </Route>
);
