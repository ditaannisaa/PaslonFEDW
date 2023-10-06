import React, { useState, useEffect} from 'react'
import axios from 'axios';
import {
    Card,
    Stack,
    Heading,
    Input,
    Select,
    CardBody,
    Button,
    CardFooter,
    Checkbox,
    CheckboxGroup,
    Text,
    Grid
} from '@chakra-ui/react' 

interface Paslon {
    name: string,
    visi: string,
    party: Party[]
}

interface Party {
    id: number,
    name: string,
}


function AddPaslon() {
  const [paslonName, setPaslonName] = useState('');
  const [selectedParty, setSelectedParty] = useState<string[]>([]);
  const [paslonVision, setPaslonVision] = useState('');
  const [parties, setParties] = useState<Party[]>([]); // State untuk menyimpan daftar partai

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/parties';
        const response = await axios.get(url);
        setParties(response.data.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };

    fetchParties();
  }, []);

  const handleCheckboxChange = (partyId: number) => {
    if (selectedParty.includes(partyId.toString())) {
      setSelectedParty(selectedParty.filter((id) => id !== partyId.toString()));
    } else {
      setSelectedParty([...selectedParty, partyId.toString()]);
    }
  };

  const handlePaslonSubmit = () => {
    // Membuat objek yang akan dikirim ke server
    const newPaslon: Paslon = {
      name: paslonName,
      party: selectedParty.map((partyId) => ({
        id: parseInt(partyId),
        name: parties.find((party) => party.id === parseInt(partyId))?.name || '',
      })),
      visi: paslonVision,
    };

    // Kirim permintaan POST ke server untuk menambahkan paslon baru
    axios
      .post('http://localhost:5000/api/v1/paslon', newPaslon)
      .then((response) => {
        // Setelah berhasil menambahkan paslon, Anda dapat melakukan sesuatu, misalnya, menampilkan pesan sukses
        console.log('Paslon berhasil ditambahkan:', response.data);

        // Mengosongkan input paslon
        setPaslonName('');
        setSelectedParty([]);
        setPaslonVision('');
      })
      .catch((error) => {
        // Jika terjadi kesalahan, Anda dapat menangani error di sini, misalnya menampilkan pesan error
        console.error('Gagal menambahkan paslon:', error);
      });
  };

  return (
    <Card maxW='md' m='0 auto' display={{sm: "column", base: "row" }} h='500px'>
        <CardBody>
        <Stack spacing={3}>
            <Heading fontSize={20}> Add Paslon </Heading>
            <Input 
                placeholder='Insert Name' 
                size='md'
                value={paslonName}
                onChange={(e) => setPaslonName(e.target.value)}
            />
            <Input 
                placeholder='Insert Your Vision' 
                size='md'
                value={paslonVision}
                onChange={(e) => setPaslonVision(e.target.value)}
            />
            <CheckboxGroup colorScheme='gray' >
                <Text>Partai Pengusung:</Text>
                <Grid templateColumns='repeat(autofill, 100px 100px)' >
                    {parties.map((party) => (
                    <Checkbox 
                        key={party.id}
                        value={party.id.toString()}
                        isChecked={selectedParty.includes(party.id.toString())}
                        onChange={() => handleCheckboxChange(party.id)}
                    >
                        {party.name}
                    </Checkbox>
                    ))}
                </Grid>
            </CheckboxGroup>
        </Stack> 
        </CardBody>
        <CardFooter>
            <Button onClick={handlePaslonSubmit}>Submit</Button>
        </CardFooter>
    </Card>
  )
}

export default AddPaslon