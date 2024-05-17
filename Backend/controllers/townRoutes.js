import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getTowns = async (req, res) => {
    
    const raites = await prisma.TownToGdl.findMany()
    if (raites.length == 0)
      res.status(500).json({ msg: "No towns found" });
  
    res.json(raites)
}

export{
    getTowns
}