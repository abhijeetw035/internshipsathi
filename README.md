# PM Internship Smart Allocator

## AI-Based Smart Allocation Engine for PM Internship Scheme

A comprehensive frontend prototype demonstrating an intelligent matching system for allocating students to internship opportunities based on skills, qualifications, location preferences, and policy requirements.

## 🚀 Features

### Core Functionality
- **AI Matchmaking Engine**: Intelligent algorithm for optimal student-internship matching
- **Data Upload Interface**: Support for CSV/Excel file uploads with validation
- **Parameter Configuration**: Flexible system for adjusting matching criteria and policy parameters
- **Real-time Processing**: Live simulation of the matching algorithm with progress tracking
- **Results Visualization**: Comprehensive results table with filtering and search capabilities

### Advanced Features
- **What-If Simulator**: Policy scenario testing tool for impact analysis
- **Match Justification**: Detailed explanations for each allocation decision
- **Analytics Dashboard**: Comprehensive insights with interactive charts and statistics
- **Responsive Design**: Modern, mobile-friendly interface

### Policy Implementation
- **Affirmative Action**: Support for rural/aspirational district quotas
- **Social Inclusion**: Representation for different social categories
- **Geographic Diversity**: Location-based allocation preferences
- **Quality Thresholds**: Minimum match score requirements

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **File Handling**: PapaParse for CSV processing
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   └── Sidebar.js         # Main navigation sidebar
├── pages/
│   ├── Dashboard.js       # Overview dashboard with KPIs
│   ├── DataUpload.js      # File upload interface
│   ├── Configuration.js   # Parameter configuration
│   ├── Matchmaking.js     # AI engine simulation
│   ├── Results.js         # Results table with justification
│   ├── Analytics.js       # Comprehensive analytics
│   └── WhatIfSimulator.js # Policy scenario testing
├── App.js                 # Main application component
├── index.js              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎯 Key Pages

### 1. Dashboard
- Real-time system overview with key metrics
- Match score distribution charts
- Recent allocation activity feed
- Quick access to all features

### 2. Data Upload
- Drag-and-drop file upload interface
- Support for student and internship data
- Data validation and preview
- Template download functionality

### 3. Configuration
- Matching weight adjustments
- Policy parameter settings
- Quality threshold configuration
- Advanced algorithm options

### 4. Matchmaking Engine
- Real-time algorithm simulation
- Progress tracking with phase indicators
- Performance metrics during processing
- Algorithm convergence visualization

### 5. Results
- Comprehensive results table
- Advanced filtering and search
- Match justification modals
- Export functionality

### 6. What-If Simulator
- Policy scenario testing
- Impact analysis and comparison
- Parameter adjustment interface
- Scenario saving and comparison

### 7. Analytics
- Multi-dimensional analytics dashboard
- Geographic and demographic insights
- Performance trend analysis
- Interactive data visualization

## 🔧 Configuration

### Matching Parameters
- **Skill Weight**: 35% (default)
- **Location Weight**: 20% (default)
- **Sector Weight**: 15% (default)
- **Qualification Weight**: 10% (default)

### Policy Parameters
- **Rural Quota**: 25% (default)
- **Social Inclusion Quota**: 30% (default)
- **Gender Diversity Weight**: 5% (default)
- **Minimum Match Score**: 60% (default)

## 📊 Data Format

### Student Data Template
```csv
student_id,name,email,university,degree,branch,year_of_study,cgpa,skills,location_preference,sector_preference,social_category,rural_urban,district,previous_internships,availability_start,availability_end
```

### Internship Data Template
```csv
internship_id,company_name,position_title,department,location,duration_weeks,skills_required,qualification_required,year_of_study,stipend,capacity,sector,contact_person,contact_email,application_deadline,start_date
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Charts**: Real-time data visualization with Recharts
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark/Light Theme**: Adaptive color schemes (future enhancement)

## 🔍 Algorithm Features

### Matching Criteria
1. **Skill Compatibility**: Technical and soft skill matching
2. **Location Preference**: Geographic proximity and preferences
3. **Sector Interest**: Industry alignment with student interests
4. **Academic Qualification**: Educational background matching
5. **Policy Compliance**: Affirmative action requirements

### Optimization Methods
- **Hungarian Algorithm**: Optimal assignment for maximum efficiency
- **Genetic Algorithm**: Alternative approach for complex scenarios
- **Hybrid Approach**: Combination of multiple algorithms
- **Learning Mode**: Continuous improvement based on feedback

## 📈 Analytics Features

### Overview Metrics
- Total allocations and success rates
- Average match scores and trends
- Rural representation statistics
- Social inclusion percentages

### Geographic Analysis
- State-wise distribution
- Rural vs urban allocation ratios
- Location preference satisfaction

### Demographic Insights
- Social category representation
- Gender distribution analysis
- University performance metrics

### Performance Tracking
- Company allocation efficiency
- Score trend analysis over time
- Quality improvement metrics

## 🚀 Future Enhancements

### Planned Features
- **Machine Learning Integration**: Advanced AI algorithms
- **Real-time Collaboration**: Multi-user support
- **API Integration**: Backend connectivity
- **Mobile App**: Native mobile application
- **Advanced Reporting**: Custom report generation
- **Notification System**: Real-time alerts and updates

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Testing Suite**: Comprehensive unit and integration tests
- **CI/CD Pipeline**: Automated deployment
- **Monitoring**: Application performance monitoring
- **Security**: Enhanced authentication and authorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

