import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, passWord: password }) 
      });
  
      const data = await res.json();
  
      if (res.ok) {
        login(data.user, data.token);
  
        if (data.user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          toast({
            title: "Bạn không phải Admin",
            status: "error",
            duration: 3000,
            isClosable: true
          });
        }
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra lại email và mật khẩu",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      toast({
        title: "Lỗi máy chủ",
        description: "Không thể kết nối tới server.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="100px"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb="6" textAlign="center">
        Đăng nhập Admin
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Đăng nhập
        </Button>
      </form>
    </Box>
  );
}
