const express = require('express');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const ContactsModel = require('./../models/contacts');
const ContactTypesModel = require('./../models/contact_types');
const BarangaysModel = require('./../models/barangays');
const ContactPersonsModel = require('./../models/contact_persons');

const { checkRequiredFields } = require('./../utils/requiredFields');

// Get all barangays
router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const barangays = await BarangaysModel.find({
      date_deleted: { $exists: false },
    });

    return res.status(200).json({ data: { barangays }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Get single barangay

// Create new barangay
router.post('/', routeAuth, auth, async (req, res) => {
  const { id: userID } = req.user;
  const {
    district_number: districtNumber,
    district_code: districtCode,
    name,
    address_1: address1,
    address_2: address2,
    contact_person: contactPerson,
    phone_number: phoneNumber,
  } = req.body;

  const haveErrors = checkRequiredFields({
    district_number: districtNumber,
    district_code: districtCode,
    name,
    address_1: address1,
    contact_person_first_name: contactPerson.first_name,
    contact_person_last_name: contactPerson.last_name,
    phone_number: phoneNumber,
  });

  if (haveErrors.isError) {
    return res.status(haveErrors.statusCode).json({
      data: { message: haveErrors.message },
      status_code: haveErrors.statusCode,
    });
  }

  try {
    const existsBarangay = await BarangaysModel.findOne({
      name,
      date_deleted: { $exists: false },
    });

    if (existsBarangay) {
      return res.status(400).json({
        data: { message: `Barangay ${name} already created` },
        status_code: 400,
      });
    }

    const contactTypes = await ContactTypesModel.find();
    const contactTypeAddress = contactTypes.find(
      (data) => data.name === 'Address'
    );
    const contactTypePhoneNumber = contactTypes.find(
      (data) => data.name === 'Phone'
    );

    const newBarangay = new BarangaysModel({
      user_id: userID,
      district_code: districtCode,
      district_number: districtNumber,
      name,
      address_1: address1,
      address_2: address2,
    });

    const { _id: barangayID } = await newBarangay.save();

    const newContactAddress = new ContactsModel({
      user_id: userID,
      own_table_name: 'barangays',
      own_primary_key: barangayID,
      contact_type_id: contactTypeAddress._id,
      address_1: address1,
      address_2: address2,
      barangay_id: barangayID,
    });

    await newContactAddress.save();

    const newContactPhone = new ContactsModel({
      user_id: userID,
      own_table_name: 'barangays',
      own_primary_key: barangayID,
      contact_type_id: contactTypePhoneNumber._id,
      phone_number: phoneNumber,
    });

    await newContactPhone.save();

    const newContactPerson = new ContactPersonsModel({
      user_id: userID,
      own_table_name: 'barangays',
      own_primary_key: barangayID,
      first_name: contactPerson.first_name,
      middle_name: contactPerson.middle_name,
      last_name: contactPerson.last_name,
    });

    await newContactPerson.save();

    return res.status(200).json({
      data: { message: `You successfully created Barangay ${name}` },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Update barangay

// Delete barangay

module.exports = router;
