const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'shipments.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.dirname(DATA_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Read shipments from file
async function readShipments() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// Write shipments to file
async function writeShipments(shipments) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(shipments, null, 2), 'utf8');
}

// GET all shipments
app.get('/api/shipments', async (req, res) => {
    try {
        const shipments = await readShipments();
        res.json(shipments);
    } catch (error) {
        console.error('Error reading shipments:', error);
        res.status(500).json({ error: 'Failed to read shipments' });
    }
});

// GET single shipment by tracking number
app.get('/api/shipments/track/:trackingNo', async (req, res) => {
    try {
        const shipments = await readShipments();
        const trackingNo = req.params.trackingNo;
        const shipment = shipments.find(s => 
            (s.trackingNo || '').toLowerCase() === trackingNo.toLowerCase()
        );
        
        if (shipment) {
            res.json(shipment);
        } else {
            res.status(404).json({ error: 'Shipment not found' });
        }
    } catch (error) {
        console.error('Error finding shipment:', error);
        res.status(500).json({ error: 'Failed to find shipment' });
    }
});

// POST create new shipment
app.post('/api/shipments', async (req, res) => {
    try {
        const shipments = await readShipments();
        const shipment = req.body;
        
        // Validate required fields
        if (!shipment.trackingNo || !shipment.sender || !shipment.receiver) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Generate ID if not provided
        if (!shipment.id) {
            shipment.id = 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        }
        
        // Set timestamps
        const now = Date.now();
        if (!shipment.createdAt) {
            shipment.createdAt = now;
        }
        shipment.updatedAt = now;
        
        // Add to beginning of array (newest first)
        shipments.unshift(shipment);
        
        await writeShipments(shipments);
        res.status(201).json(shipment);
    } catch (error) {
        console.error('Error creating shipment:', error);
        res.status(500).json({ error: 'Failed to create shipment' });
    }
});

// PUT update existing shipment
app.put('/api/shipments/:id', async (req, res) => {
    try {
        const shipments = await readShipments();
        const id = req.params.id;
        const updatedShipment = req.body;
        
        const index = shipments.findIndex(s => s.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        
        // Update timestamp
        updatedShipment.updatedAt = Date.now();
        
        // Preserve ID and createdAt
        updatedShipment.id = shipments[index].id;
        if (shipments[index].createdAt) {
            updatedShipment.createdAt = shipments[index].createdAt;
        }
        
        shipments[index] = updatedShipment;
        await writeShipments(shipments);
        res.json(updatedShipment);
    } catch (error) {
        console.error('Error updating shipment:', error);
        res.status(500).json({ error: 'Failed to update shipment' });
    }
});

// DELETE shipment
app.delete('/api/shipments/:id', async (req, res) => {
    try {
        const shipments = await readShipments();
        const id = req.params.id;
        
        const filtered = shipments.filter(s => s.id !== id);
        if (filtered.length === shipments.length) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        
        await writeShipments(filtered);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting shipment:', error);
        res.status(500).json({ error: 'Failed to delete shipment' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
