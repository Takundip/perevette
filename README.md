# JP Logistics Website

A modern, responsive logistics company website cloned from http://jpeglogistics.cc/ with all design, fonts, and structure maintained. This website features shipping-related images to avoid copyright issues.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Color Gradient Theme**: Beautiful teal gradient color scheme throughout
- **Shipping Images**: Real shipping-related photos from Unsplash
- **Multiple Pages**: Home, Services, About, Contact
- **Interactive Elements**: Smooth scrolling, mobile menu, form handling

## Pages

1. **index.html** - Homepage with hero section, stats, services, testimonials
2. **services.html** - Detailed services information
3. **about.html** - Company information and values
4. **contact.html** - Contact form and map

## Files Structure

```
/
├── index.html          # Homepage
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page
├── admin.html          # Admin dashboard
├── tracking.html       # Tracking page
├── styles.css          # All CSS styling
├── script.js           # JavaScript functionality
├── server.js           # Backend API server (Node.js)
├── package.json        # Node.js dependencies
├── data/               # Data storage directory (created automatically)
│   └── shipments.json  # Shipment data file
└── README.md           # Documentation
```

## Design Features

- **Typography**: Inter font family (Google Fonts)
- **Colors**: Teal gradient theme (--teal-gradient)
- **Layout**: Modern, clean grid-based layout
- **Images**: All images are from Unsplash API, shipping-related
- **Icons**: Simple, text-based navigation

## Technologies Used

### Frontend
- HTML5
- CSS3 (with custom properties and animations)
- JavaScript (vanilla)
- Google Fonts (Inter)

### Backend (Optional)
- Node.js
- Express.js
- CORS middleware
- File system storage (JSON file)

## Getting Started

### Frontend Only (Local Storage - Single Device)
Simply open `index.html` in your web browser to view the website. No build process or dependencies required.

**Note:** By default, shipments are stored in browser localStorage, which means data is device-specific and not shared across devices.

### Full Setup (Backend API - Multi-Device Support)

To enable shipment data synchronization across multiple devices, you need to run a backend server:

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Verify installation: `node --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Backend Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open the Website**
   - Open `admin.html` or `tracking.html` in your browser
   - The frontend will automatically connect to the API at `http://localhost:3000/api`

5. **API Configuration** (Optional)
   - If your server runs on a different port or domain, set the API URL before loading the page:
   ```html
   <script>
       window.API_BASE_URL = 'http://your-server:3000/api';
   </script>
   <script src="script.js"></script>
   ```

### Backend API Endpoints

- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/track/:trackingNo` - Find shipment by tracking number
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/:id` - Update existing shipment
- `DELETE /api/shipments/:id` - Delete shipment
- `GET /api/health` - Health check endpoint

### Data Storage

Shipment data is stored in `data/shipments.json`. This file is automatically created when the server runs for the first time.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

The website uses CSS custom properties for easy customization. Main color variables can be found in the `:root` section of `styles.css`:

```css
:root {
    --teal-gradient: linear-gradient(135deg, #00c4cc 0%, #0078a6 100%);
    --primary-color: #667eea;
    --text-dark: #1a1a2e;
    --text-light: #6c757d;
}
```

## Notes

- All images are loaded from Unsplash API
- Contact form submission is currently handled by JavaScript (no backend)
- Map integration uses Google Maps embed
- No actual logo is used (replaced with text logo to avoid copyright issues)


