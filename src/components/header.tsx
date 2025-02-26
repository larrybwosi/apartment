import { FileDown, Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="w-[280px] pl-8 bg-white" />
      </div>
      <Button variant="outline" className="bg-white hover:bg-gray-50">
        <FileDown className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
      <Button variant="outline" className="bg-white hover:bg-gray-50">
        <FileDown className="w-4 h-4 mr-2" />
        Export Excel
      </Button>
    </div>
  )
}

export default Header