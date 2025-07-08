import { useState, useEffect, useContext } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Text,
  Flex
} from '@chakra-ui/react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          toast({
            title: "Lỗi khi tải người dùng",
            description: data.message || "Lỗi server",
            status: "error",
            duration: 3000,
            isClosable: true
          });
          return;
        }
        const data = await res.json();

        if (data.users) {
          const formattedUsers = data.users.map((u, index) => ({
            id: index + 1,
            _id: u._id,
            name: u.userName,
            email: u.email,
            role: u.isAdmin ? "admin" : "user"
          }));
          setUsers(formattedUsers);
        } else {
          toast({
            title: "Không có dữ liệu người dùng",
            status: "info",
            duration: 3000,
            isClosable: true
          });
        }
      })
      .catch((err) => {
        console.error("Lỗi:", err);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Xóa người dùng thành công!",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Đã xảy ra lỗi khi xóa.");
    }
  }

  return (
    <Box maxW="1000px" mx="auto" mt={5} p={4}>
      {users.length === 0 ? (
        <Text fontSize="xl" fontWeight="bold" textAlign="center">Không có người dùng nào khác để hiển thị.</Text>
      ) : (
        <>
          <Heading size="lg" mb={4}>Danh sách người dùng</Heading>
          <Table variant="striped" colorScheme="gray" size="md">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Tên</Th>
                <Th>Email</Th>
                <Th>Vai trò</Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u) => (
                <Tr key={u.id}>
                  <Td>{u.id}</Td>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td textTransform="capitalize">{u.role}</Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        icon={<FaUserEdit />}
                        colorScheme="blue"
                        aria-label="Sửa"
                        onClick={() => navigate(`/admin/users/update/${u._id}`)}
                      />
                      <IconButton
                        icon={<TiUserDelete />}
                        colorScheme="red"
                        aria-label="Xóa"
                        onClick={() => handleDeleteUser(u._id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
}
