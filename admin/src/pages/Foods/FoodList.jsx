import { useContext, useEffect, useState } from 'react';
import {
  Box, Image, Text, Heading, SimpleGrid, Spinner,
  useToast, Flex, IconButton, Button, Stack
} from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function AdminFoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchFoods = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/foods', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải danh sách món ăn');
        return res.json();
      })
      .then((data) => {
        setFoods(data);
      })
      .catch((err) => {
        toast({
          title: 'Lỗi khi tải dữ liệu',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa món này không?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/foods/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: 'Xóa thành công',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
        fetchFoods(); // reload lại danh sách
      } else {
        toast({
          title: 'Xóa thất bại',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }
    } catch (err) {
      console.error('Lỗi xóa món ăn:', err);
      toast({
        title: 'Lỗi hệ thống',
        description: 'Không thể xóa món ăn.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxW="1200px" mx="auto" mt={8} px={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Quản lý món ăn</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/admin/foods/create')}>
          Thêm món mới
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      ) : foods.length === 0 ? (
        <Text>Không có món ăn nào.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {foods.map((food) => (
            <Box
              key={food._id}
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="md"
              position="relative"
            >
              <Image
                src={food.foodImage}
                alt={food.foodName}
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>{food.foodName}</Heading>
                <Text fontSize="sm" mb={2} color="gray.600">{food.foodDescription}</Text>
                <Text fontWeight="bold" color="teal.600">{food.foodPrice.toLocaleString()} đ</Text>
              </Box>

              <Flex position="absolute" top="8px" right="8px" gap={2}>
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Chỉnh sửa"
                  size="sm"
                  colorScheme="blue"
                  onClick={() => navigate(`/admin/foods/update/${food._id}`)}
                />
                <IconButton
                  icon={<MdDelete />}
                  aria-label="Xóa"
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(food._id)}
                />
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
