import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../Components/Navbar'
import AddTask from '../Components/AddTask'

export default function page() {
  return (
    <div>
     <Navbar/>
     <Box>
        <AddTask/>
     </Box>
    </div>
  )
}
