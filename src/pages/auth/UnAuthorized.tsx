import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading fontSize="2xl" mb={4}>
        Access Denied
      </Heading>
      <Text textAlign="center" mb={6}>
        Oops! It seems like you don't have the necessary permissions to access this page.
      </Text>
      <Button colorScheme="green" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default UnAuthorized;
