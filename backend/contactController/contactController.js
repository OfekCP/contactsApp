const Contact=require("../models/contactModel")
exports.createContact=(req,res)=>{
    Contact.create(req.body)
    res.send("contact created")
}
exports.getContacts= async (req,res)=>{
const Contacts= await Contact.find({})
res.send(Contacts)
}
exports.getContactById=async (req,res)=>{
    try{
        const getContact= await Contact.findById(req.params.id)
        if(!getContact){
            return res.status(500).json({error:"contact not found"})
        }
        res.json(getContact)
    }catch(error){
        console.error(error)
        res.status(500).json({error:"internet fail"})
    }
}
exports.searchContacts = async (req, res) => {
    const searchTerm = req.query.search;
    const filteredContacts = await Contact.find({
       $or: [
          { contactName: { $regex: searchTerm, $options: 'i' } },
          { phoneNum: { $regex: searchTerm } }
       ]
    });
    res.json(filteredContacts);
 };
exports.updateContact=async (req,res)=>{
    try{
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body)
    if(!updatedContact){
        return res.status(500).json({error:"contact not found"})

    }
    res.json(updatedContact)
}catch(error){
    console.error(error)
    res.status(500).json({error:"internet fail"})
}
}
exports.deleteContact=async (req,res)=>{
    try{
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.send(deletedContact)
}catch(error){
    console.error(error)
    res.status(500).json({error:"internet fail"})
}
}