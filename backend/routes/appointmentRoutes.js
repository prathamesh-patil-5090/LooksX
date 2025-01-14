const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const { protect } = require('../middleware/authMiddleware');

// Create new appointment
router.post('/', protect, async (req, res) => {
    try {
        const { address, appointmentDate, service, name, shopName } = req.body;

        const appointment = await Appointment.create({
            userId: req.user._id,
            name,
            address,
            appointmentDate,
            service,
            shopName
        });
        
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user's appointments
router.get('/', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id })
            .sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get customer appointments
router.get('/customer/:customerId', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({ 
            customerId: req.params.customerId 
        }).sort({ date: -1 }); // Sort by date descending

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

// Universal update route with role-based permissions
router.patch('/:id/status', protect, async (req, res) => {
    // Set CORS headers specifically for this route
    res.header('Access-Control-Allow-Methods', 'PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try {
        const { id } = req.params;  // This will be 6783f0fe7276e77a23a30e30 in your case
        const { status } = req.body;
        
        console.log('Status update request:', {
            appointmentId: id,
            newStatus: status,
            userRole: req.user.role,
            userShopName: req.user.shopName
        });

        // Find the appointment first
        const appointment = await Appointment.findById(id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Authorization check
        if (req.user.role === 'barber') {
            // Barbers can only update appointments for their shop
            if (appointment.shopName !== req.user.shopName) {
                return res.status(403).json({ 
                    message: 'You can only update appointments for your shop' 
                });
            }
        } else if (req.user.role === 'customer') {
            // Customers can only update their own appointments
            if (appointment.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ 
                    message: 'You can only update your own appointments' 
                });
            }
            // Customers can only cancel appointments
            if (status !== 'cancelled') {
                return res.status(403).json({ 
                    message: 'Customers can only cancel appointments' 
                });
            }
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        console.log('Appointment updated:', updatedAppointment);
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Update error:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
