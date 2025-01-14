const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const User = require('../models/User'); // Add User model import
const Appointment = require('../models/appointmentModel');
const { protect, isBarber } = require('../middleware/authMiddleware');

// Register a new shop (barbers only)
router.post('/shops', protect, isBarber, async (req, res) => {
    try {
        // First check if user already has a shop
        const existingShop = await Shop.findOne({ ownerId: req.user._id });
        if (existingShop) {
            return res.status(400).json({ message: 'Barber already has a registered shop' });
        }

        // Create new shop
        const shop = await Shop.create({
            ...req.body,
            ownerId: req.user._id
        });
        
        // Update user's shopName after shop is created
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { shopName: shop.name },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            // If user update fails, delete the shop to maintain consistency
            await Shop.findByIdAndDelete(shop._id);
            return res.status(400).json({ message: 'Failed to update user with shop information' });
        }
        
        res.status(201).json({
            shop,
            user: updatedUser,
            message: 'Shop registered successfully'
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Shop registration failed',
            error: error.message 
        });
    }
});

// Get shop's appointments
router.get('/appointments', protect, isBarber, async (req, res) => {
    try {
        const appointments = await Appointment.find({ shopName: req.user.shopName })
            .sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update appointment status (only for own shop)
router.patch('/appointments/:id', protect, isBarber, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Debug logs
        console.log('Update request from barber:', {
            barberId: req.user._id,
            barberShopName: req.user.shopName,
            appointmentId: id
        });

        // First find the appointment to verify shop
        const appointment = await Appointment.findById(id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Verify shop ownership
        if (appointment.shopName !== req.user.shopName) {
            console.log('Shop name mismatch:', {
                appointmentShop: appointment.shopName,
                barberShop: req.user.shopName
            });
            return res.status(403).json({ 
                message: 'Not authorized - This appointment belongs to a different shop'
            });
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        console.log('Appointment updated successfully:', updatedAppointment);
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update appointment status (only for own shop) - new route
router.patch('/appointments/:id/status', protect, isBarber, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.shopName !== req.user.shopName) {
      return res.status(403).json({ message: 'Not authorized - This appointment belongs to a different shop' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
