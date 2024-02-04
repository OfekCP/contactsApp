const express=require("express")
const router=express.Router()
const contactController=require("../contactController/contactController")
router.route("/create").post(contactController.createContact)
router.route("/").get(contactController.getContacts)
router.route("/search").get(contactController.searchContacts);
router.route("/:id").get(contactController.getContactById)
router.route("/:id/update").post(contactController.updateContact)
router.route("/:id/delete").delete(contactController.deleteContact)
module.exports=router