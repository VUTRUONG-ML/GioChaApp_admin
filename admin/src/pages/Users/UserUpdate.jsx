import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Box, Button, FormControl, FormLabel, Input, Select, Heading, useToast
} from "@chakra-ui/react";

export default function UserUpdate() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", isAdmin: false });
  const navigate = useNavigate();
  const toast = useToast();

  // Lấy thông tin user cần chỉnh sửa
  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            name: data.user.userName,
            email: data.user.email,
            isAdmin: data.user.isAdmin
          });
        } else {
          toast({
            title: "Không tìm thấy người dùng.",
            status: "error",
            duration: 3000,
            isClosable: true
          });
          navigate("/admin/users");
        }
      });
  }, [id]);

  // Gửi form cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/auth/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Cập nhật thành công!",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/admin/users");
    } else {
      toast({
        title: "Lỗi cập nhật",
        description: data.message || "Vui lòng kiểm tra lại dữ liệu.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="100px" p="6" borderWidth="1px" borderRadius="lg">
      <Heading mb="6" size="lg" textAlign="center">Chỉnh sửa người dùng</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Tên người dùng</FormLabel>
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </FormControl>
        <FormControl mb="6" isDisabled = {true}>
          <FormLabel>Vai trò</FormLabel>
          <Select
            value={user.isAdmin ? "admin" : "user"}
            onChange={(e) =>
              setUser({ ...user, isAdmin: e.target.value === "admin" })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">Cập nhật</Button>
      </form>
    </Box>
  );
}
