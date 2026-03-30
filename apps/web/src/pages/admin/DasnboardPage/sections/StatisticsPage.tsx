import StatisticsCard from '@/components/adminLayout/StatisticsCard'
import { Box } from '@mui/material'
import React from 'react'

function StatisticsPage() {
  return (
    <Box sx={{width:1, display:"flex", gap:"10px"}}>
        <StatisticsCard/>
        
    </Box>
  )
}

export default StatisticsPage
