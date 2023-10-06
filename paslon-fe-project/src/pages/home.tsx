import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Heading, 
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  CardHeader,
  UnorderedList,
  ListItem,
  Input,
  RadioGroup,
  Radio,
  Grid,
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
 } from '@chakra-ui/react'

 import axios from 'axios';

 interface Parties {
  id: number;
  name: string;
 }

 interface Paslon {
  id: number;
  name: string;
  visi: string;
  party: Parties[];
 }

 interface Voters {
  id: number;
  voter_name: string;
  paslon: {
    id: number;
    name: string;
    visi: string;
  };
}

function Home() {
  const [data, setData] = useState([]);
  const [voters, setVoters] = React.useState<string>();
  const [voteCounts, setVoteCounts] = React.useState<{
    [paslonId: number]: number;
  }>({});
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/paslons';
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);  

  useEffect(() => {
    // Fetch data dari API menggunakan Axios
    axios
      .get('http://localhost:5000/api/v1/votes')
      .then((response) => {
        // Periksa status respons
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        // Set data ke dalam state votes
        setVoters(response.data.data);
      })
      .catch((error) => console.error('Error Fetching Data', error));
      }, []);

  const handlerRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaslon(parseInt(event.target.value))

    console.log(event.target.value)
  }

  const handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoters(event.target.value)
  }

  const handleAddCount = useMutation(async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        paslon_id: selectedPaslon,
        voter_name: voters,
      });

      const response = await axios.post('http://localhost:5000/api/v1/vote', {
        body,
        config,
      })

      console.log(response)

      setSelectedPaslon(null);
      setVoters("");
    } catch (error: unknown) {
    console.error(error);
  }
  })

  // React.useEffect(() => {
  //   const countVotes = () => {
  //     const counts: { [paslonId: number]: number } = {};
  //     const voter : any | {} = {}

  //     voter?.forEach((voter: Voters) => {
  //       const paslonId = voter?.paslon?.id;

  //       if (counts[paslonId]) {
  //         counts[paslonId] = counts[paslonId] + 1;
  //       } else {
  //         counts[paslonId] = 1;
  //       }
  //     });

  //     setVoteCounts(counts);
  //   };

  //   countVotes();
  // }, [voters, data, voteCounts]);


  

  return (
      <Box  maxW='full' display='flex' flexDirection='column' >
        <Box display='flex' m={4} justifyContent='center'>
          <Heading fontSize={25}>Paslon Dumbways</Heading>
          <Image
            src='./src/assets/vote_ballot_box_icon_154136.svg'
            w='40px'
          />
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

        <Box p={10}  maxW='100%' bg='blue.300'm='0, auto'>
          <SimpleGrid   templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}  spacing={8} mx='20px'>
            {data?.map((data: Paslon) => (
              <Card maxW='xs' m='0, auto' key={data?.id}>
              <CardBody>
                <Image
                  src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='30'>{data?.name}</Heading>
                  <Text fontSize={15}>
                    Visi: {data?.visi}
                  </Text>
                  <Text color='blue.600' fontSize={15}>Partai Pengusung :</Text>
                  {data?.party?.map((party: Parties) => (
                  <li key={party?.id}>{party?.name}</li>
                  ))}
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Button variant='ghost' colorScheme='blue'>
                    Edit Paslon
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Box p={4} justifyContent='center' maxW='full' display='flex' flexDirection='row' bg='blue.700'>
          <Grid templateColumns={{ base: "1fr", md: "350px 500px" }} gap={8}>
            <GridItem >
              <Card maxW='md' h='250px' m='0 auto' display={{sm: "column", base: "row" }} >
              <CardHeader >
                <Heading size='md'> Quick Count </Heading>
              </CardHeader>
              <CardBody>
              <UnorderedList>
                {data?.map((data: Paslon) => (
                  <ListItem key={data?.id}>{data?.name}: {voteCounts[data?.id]}</ListItem>
                ))}
                
              </UnorderedList>
              </CardBody>
            </Card>
            </GridItem>
            
            <GridItem>
              <Card maxW='md' h='250px' m='0 auto' >
                <CardHeader >
                  <Heading size='md'> Vote Here </Heading>
                </CardHeader>
                <CardBody >
                  <Stack spacing='4'>
                    <Input 
                    placeholder='Insert Your Name' 
                   
                    onChange={handleChangeCount}
                    />
                    <RadioGroup >
                      <Stack direction='row'>
                        {data?.map((data: Paslon) => (
                          <Radio 
                          className="radio radio-accent"
                          type="radio"
                          name="paslon"
                          key={data?.id}                         
                          id={data?.name}
                          value={data?.name}
                          onChange={handlerRadio}
                          >{data?.name}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    <Button
                    onClick={(e) => handleAddCount.mutate(e)}
                    >Submit</Button>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            
          </Grid>
        </Box>
      </Box>
      
      
  )
}

export default Home