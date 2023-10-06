import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
    Box,
    Stack,
    Select,
    Heading,
    Card,
    Input,
    Button,
    Text,
    Grid,
    GridItem,
    CardHeader,
    CardBody,
    CardFooter,
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbItem 
  } from '@chakra-ui/react'
import AddPaslon from './paslon-add'

interface Party {
  id: number,
  name: string
}

function Paslon() {
  const [partyName, setPartyName] = useState(''); // State untuk menyimpan nama partai

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/party';
        const response = await axios.get(url);
        setPartyName(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParty();
  }, []); 


  const handlePartySubmit = () => {
    // Membuat objek yang akan dikirim ke server
    const newParty = {
      name: partyName,
    };

    // Kirim permintaan POST ke server untuk menambahkan partai baru
    axios
      .post('http://localhost:5000/api/v1/party', newParty)
      .then((response) => {
        // Setelah berhasil menambahkan partai, Anda dapat melakukan sesuatu, misalnya, menampilkan pesan sukses
        console.log('Partai berhasil ditambahkan:', response.data);

        // Mengosongkan input nama partai
        setPartyName('');
      })
      .catch((error) => {
        // Jika terjadi kesalahan, Anda dapat menangani error di sini, misalnya menampilkan pesan error
        console.error('Gagal menambahkan partai:', error);
      });
  };

  return (
    <Box bg='blue.300'>
        <Box display='flex' justifyContent='center' alignItems='center' p={6} bg='white'>
            <Heading fontSize={30}> Add your paslon</Heading>
        </Box>
        <Box maxW='full' bg='blue.700' display='flex' justifyContent='center'>
          <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href='/' color='blue.100'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/add-paslon' color='blue.100'>Add New Paslon</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          </Box>
        </Box>
        <Grid templateColumns={{ base: "1fr", md: "350px" }} gap={8} bg='blue.300' mx='450px' p={4}>
            <GridItem >
              <Card maxW='md' display={{sm: "column", base: "row" }} h='300px' >
                <CardBody>
                    <Stack spacing={3}>
                        <Heading fontSize={20}> Add Party </Heading>
                        <Input 
                        placeholder='Insert Party' 
                        size='md'
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        />
                    </Stack> 
                </CardBody>
                <CardFooter>
                    <Button 
                    onClick={handlePartySubmit}
                    >Submit</Button>
                </CardFooter>
              </Card>
            </GridItem>
            
            <GridItem >
              <AddPaslon/>
            </GridItem>
            
          </Grid>

            <Box maxW='full' bg='blue.700' maxH='300px' display='flex' justifyContent='center' p={8}>
                <Text color='white'>Paslon Dumbways</Text>
            </Box>

        
        
    </Box>
    
  )
}

export default Paslon